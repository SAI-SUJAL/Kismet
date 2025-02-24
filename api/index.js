const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
const { resolve } = require("path");


dotenv.config({ path: resolve("../.env") });
// Get MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("❌ MONGODB_URI is missing! Check your .env file.");
  process.exit(1);
}

console.log("🔍 Connecting to MongoDB:", mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));
app.listen(port, () => {
  console.log('server running on 3000');
});

const User = require('./models/user');
// const Chat=require('./models/message')
app.post('/register', async (req, res) => {
  try {
    // Destructure the user data from the request body
    const {rollNumber, password, firstName, lookingFor} = req.body;

    // Check for missing required fields
    if (!rollNumber || !password || !firstName ||!lookingFor ) {
      return res.status(400).json({error: 'Missing required fields,Go Back and fill!'});
    }

    // Check if user already exists
    const existingUser = await User.findOne({rollNumber});
    if (existingUser) {
      return res.status(400).json({error: 'User already exists'});
    }

    // Create new user
    const newUser = new User(req.body); // Assuming you're sending all necessary fields in req.body
    await newUser.save();

    // Generate token
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({userId: newUser._id}, secretKey);

    // Send response with the token
    res.status(200).json({token});
  } catch (error) {
    console.log('Error creating user', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

app.post('/login', async (req, res) => {
  try {
    const {rollNumber, password} = req.body;

    // Check for missing fields
    if (!rollNumber || !password) {
      return res.status(400).json({error: 'Missing roll number or password'});
    }

    // Find user by roll number
    const user = await User.findOne({rollNumber});
    if (!user) {
      return res.status(400).json({error: 'User not found'});
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({error: 'Invalid password'});
    }

    // Generate token
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({userId: user._id}, secretKey);

    // Respond with the token
    res.status(200).json({token});
  } catch (error) {
    console.log('Error logging in', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//fetch user data
app.get('/users/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({message: 'User not found'});
    }

    return res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: 'Error fetching the user details'});
  }
});

// app.get('/matches', async (req, res) => {
//   try {
//     const { userId } = req.query;

//     // Fetch user details, including blockedUsers
//     const user = await User.findById(userId).populate("blockedUsers");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let filter = {}; // Initialize filter as an empty object

//     if (user.gender === "Men") {
//       filter.gender = "Women"; // Men see Women
//     } else if (user.gender === "Women") {
//       filter.gender = "Men"; // Women see Men
//     } else if (user.gender === "Non Binary") {
//       filter.gender = { $in: ["Men", "Women"] }; // Non-Binary sees both Men & Women
//     }
    

//     // Fetch current user with matches, likedProfiles, and blockedUsers
//     const currentUser = await User.findById(userId)
//       .populate("matches", "_id")
//       .populate("likedProfiles", "_id")
//       .populate("blockedUsers", "_id");

//     // Extract IDs of matches, liked profiles, and blocked users
//     const friendIds = currentUser.matches.map(friend => friend._id);
//     const crushIds = currentUser.likedProfiles.map(crush => crush._id);
//     const blockedUserIds = currentUser.blockedUsers.map(blocked => blocked._id);

//     console.log("filter", filter);

//     // Fetch matches, excluding matches, likedProfiles, and blockedUsers
//     const matches = await User.find(filter)
//       .where("_id")
//       .nin([userId, ...friendIds, ...crushIds, ...blockedUserIds]);

//     return res.status(200).json({ matches });
//   } catch (error) {
//     console.error("Error fetching matches:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
app.get('/matches', async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch user details
    const user = await User.findById(userId).populate("blockedUsers");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the user has a "Looking For" preference
    if (!user.lookingFor) {
      return res.status(400).json({ message: "User's 'Looking For' preference is missing." });
    }

    // Initialize filter
    let filter = { _id: { $ne: userId } }; // Exclude the current user

    // Fetch user's matches, liked profiles, and blocked users
    const currentUser = await User.findById(userId)
      .populate("matches", "_id")
      .populate("likedProfiles", "_id")
      .populate("blockedUsers", "_id");

    // Extract IDs of matches, liked profiles, and blocked users
    const friendIds = currentUser.matches.map(friend => friend._id);
    const crushIds = currentUser.likedProfiles.map(crush => crush._id);
    const blockedUserIds = currentUser.blockedUsers.map(blocked => blocked._id);

    // Define gender filter for "Relationship"
    let genderFilter = {};
    if (user.gender === "Men") {
      genderFilter.gender = "Women";
    } else if (user.gender === "Women") {
      genderFilter.gender = "Men";
    } else if (user.gender === "Non Binary") {
      genderFilter.gender = { $in: ["Men", "Women"] };
    }

    // Apply filtering based on the user's "Looking For" selection
    if (user.lookingFor === "Friends") {
      filter.$or = [
        { lookingFor: "Friends" }, // Show users looking for Friends (both genders)
        { lookingFor: "Friends and Relationship" } // Show users open to both (both genders)
      ];
    } else if (user.lookingFor === "Relationship") {
      filter.$or = [
        { ...genderFilter, lookingFor: "Relationship" }, // Show opposite gender looking for Relationship
    { ...genderFilter, lookingFor: "Friends and Relationship" } // Show opposite gender open to both
  // Show opposite gender open to both
      ];
    } else if (user.lookingFor === "Friends and Relationship") {
      filter.$or = [
        { lookingFor: "Friends" }, // Show all users looking for Friends (both genders)
        { lookingFor: "Friends and Relationship" }, // Show all open to both (both genders)
        { ...genderFilter, lookingFor: "Relationship" }, // Show opposite gender looking for Relationship
        { ...genderFilter, lookingFor: "Friends and Relationship" } // Show opposite gender open to both // Show opposite gender looking for Relationship
      ];
    }

    // Fetch matches while excluding already matched, liked, and blocked users
    const matches = await User.find(filter)
      .where("_id")
      // .nin([...friendIds, ...blockedUserIds])
      .nin([...friendIds, ...crushIds, ...blockedUserIds]);;

    return res.status(200).json({ matches });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const ImageSchema = new mongoose.Schema({
  imageUrls: [String], // Array of Cloudinary URLs
});

const ImageModel = mongoose.model('Images', ImageSchema);

app.post("/api/images", async (req, res) => {
  try {
    console.log("📩 Received Data:", req.body); // Log the incoming request

    const { imageUrls } = req.body;
    if (!imageUrls || imageUrls.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }

    const newImages = new ImageModel({ imageUrls });
    await newImages.save();

    console.log("✅ Images saved:", newImages);
    res.status(201).json({ message: "Images saved successfully", data: newImages });
  } catch (error) {
    console.error("❌ Error saving images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//endpoint for liking a profile
app.post("/like-profile",async(req,res)=>{
  try{
    const{userId,likedUserId,image,comment}=req.body;
    await User.findByIdAndUpdate(likedUserId,{$push:{
      receivedLikes:{
        userId:userId,
        image:image,
        comment:comment,
      }}
    })
    await User.findByIdAndUpdate(userId,{$push:{likedProfiles:likedUserId}})
    res.status(200).json({message:"Profile liked successfully"})
  }catch(error)
  {
    res.status(500).json({message:"Internal server error"})
  }
})
app.get('/received-likes/:userId', async (req, res) => {
  try {
    const {userId} = req.params;

    const likes = await User.findById(userId)
      .populate('receivedLikes.userId')
      .select('receivedLikes');

    res.status(200).json({receivedLikes: likes.receivedLikes});
  } catch (error) {
    console.error('Error fetching received likes:', error);
    res.status(500).json({message: 'Internal server error'});
  }
});
// app.post('/reset-likes', async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // Find the user to get their matched profiles
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Move matched profiles to blockedUsers
//     await User.findByIdAndUpdate(userId, {
//       $set: { likedProfiles: [], receivedLikes: [] },  // Reset likes
//       $addToSet: { blockedUsers: { $each: user.matches } },  // Move matches to blockedUsers
//       $set: { matches: [] }  // Clear matches after moving
//     });

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });
app.post('/reset-likes', async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user to get their matched profiles
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only move confirmed matches to blockedUsers, reset everything else
    await User.findByIdAndUpdate(userId, {
      $set: { 
        likedProfiles: [], // Reset likes
        receivedLikes: [], // Reset received likes
        matches: [] // Clear matches
      }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//endpoint to create match between 2 users
// CREATE MATCH (Now stores in blockedUsers)
app.post("/create-match", async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    // Update the selected user's crushes array and the matches array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { matches: currentUserId },
      $pull: { likedProfiles: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { matches: selectedUserId },
    });

    // Remove from receivedLikes
    const updatedUser = await User.findByIdAndUpdate(
      currentUserId,
      {
        $pull: { receivedLikes: { userId: selectedUserId } },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Store match in `blockedUsers` instead of `matches`
    await User.findByIdAndUpdate(currentUserId, {
      $push: { blockedUsers: selectedUserId },
    });

    await User.findByIdAndUpdate(selectedUserId, {
      $push: { blockedUsers: currentUserId },
    });

    res.status(200).json({ message: "Match created and stored in blockedUsers" });
  } catch (error) {
    res.status(500).json({ message: "Error creating a match", error });
  }
});

// GET MATCHES (Now retrieves blockedUsers instead of matches)
app.get("/get-matches/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and populate `blockedUsers` instead of `matches`
    const user = await User.findById(userId).populate("blockedUsers");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const blockedUsers = user.blockedUsers;
    const matchData = [];

    for (let match of blockedUsers) {
      const latestMessage = await Chat.find({
        $or: [
          { senderId: userId, receiverId: match._id },
          { senderId: match._id, receiverId: userId },
        ],
      })
        .sort({ timestamp: -1 }) // Sort by timestamp in descending order
        .limit(1); // Get the latest message

      if (latestMessage.length > 0) {
        matchData.push({
          ...match.toObject(),
          lastMessage: latestMessage[0].message,
        });
      } else {
        matchData.push({
          ...match.toObject(),
          lastMessage: null, // or simply omit it
        });
      }
    }

    res.status(200).json({ matches: matchData });
  } catch (error) {
    console.error("Error getting matches:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/remove-received-like', async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    const user = await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { receivedLikes: { userId: selectedUserId } } },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: 'User removed from received likes' });
    } else {
      res.status(400).json({ message: 'User not found or invalid data' });
    }
  } catch (error) {
    console.error('Error removing user from received likes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Server-side code
const users = {}; // Store userId -> socketId mappings
const Chat = require('./models/message');

io.on('connection', socket => {
  console.log('A user connected:', socket.id);
  
  // Step 1: User joins and gets undelivered messages
  socket.on('join', async userId => {
    users[userId] = socket.id;
    console.log(`User ${userId} is connected with socket ${socket.id}`);
    
    // Fetch undelivered messages
    const undeliveredMessages = await Chat.find({ receiverId: userId, delivered: false });
    
    // Send all undelivered messages
    if (undeliveredMessages.length > 0) {
      socket.emit('receiveMissedMessages', undeliveredMessages);
      
      // Mark messages as delivered
      await Chat.updateMany({ receiverId: userId, delivered: false }, { delivered: true });
    }
  });
  
  // Step 2: Handle sending messages
  socket.on('sendMessage', async data => {
    try {
      const { senderId, receiverId, message } = data;
      
      // Create message timestamp if not provided
      const timestamp = data.timestamp || new Date();
      
      // Save message with `delivered: false`
      const newMessage = new Chat({ 
        senderId, 
        receiverId, 
        message, 
        timestamp,
        delivered: false 
      });
      await newMessage.save();
      
      // Get the receiver's socketId
      const receiverSocketId = users[receiverId];
      
      // Also send the message back to the sender for confirmation
      io.to(socket.id).emit('receiveMessage', newMessage);
      
      if (receiverSocketId) {
        // Send message in real-time
        io.to(receiverSocketId).emit('receiveMessage', newMessage);
        
        // Mark as delivered
        await Chat.updateOne({ _id: newMessage._id }, { delivered: true });
      } else {
        console.log(`User ${receiverId} is offline, message saved`);
      }
    } catch (error) {
      console.log("Error handling messages", error);
    }
  });
  
  // Step 3: Handle user disconnect
  socket.on('disconnect', () => {
    const disconnectedUser = Object.keys(users).find(userId => users[userId] === socket.id);
    if (disconnectedUser) {
      delete users[disconnectedUser];
      console.log(`User ${disconnectedUser} disconnected`);
    }
  });
});

http.listen(8000, () => {
  console.log('Socket.IO server running on port 8000');
});

app.get('/messages', async (req, res) => {
  try {
    const {senderId, receiverId} = req.query;
    
    console.log('Fetching messages for:', senderId, receiverId);
    
    const messages = await Chat.find({
      $or: [
        {senderId: senderId, receiverId: receiverId},
        {senderId: receiverId, receiverId: senderId},
      ],
    }).sort({ timestamp: 1 });
    
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error in getting messages:', error);
    res.status(500).json({message: 'Error in getting messages', error: error.message});
  }
});
// Add these routes to your Express server

// Get user profile
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user profile data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      bio: user.bio,
      // Add other fields as needed
    });
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.post('/update-rating', async (req, res) => {
  try {
    const { userId, rating } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the total sum and count
    user.ratingCount += 1;
    user.totalRatingSum += rating;

    // Calculate new average rating
    const newAverageRating = user.totalRatingSum / (user.ratingCount + 1); // +1 because we include the default rating
    
    // Round to one decimal place
    user.rating = Math.round(newAverageRating * 10) / 10;

    await user.save();

    res.json({ 
      success: true, 
      message: 'Rating updated successfully',
      newRating: user.rating 
    });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ message: 'Error updating rating' });
  }
});