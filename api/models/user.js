const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  rollNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  // yearSectionBranch: {
  //   type: String,
  //   required: true,
  
  // },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  hometown: {
    type: String,
    required: true,
  },
  datingPreferences: [
    {
      type: String,
    },
  ],
  lookingFor: {
    type: String,
    required: true,
  },
  imageUrls: [
    {
      type: String, // Store URLs of profile pictures
    },
  ],
  prompts: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  likedProfiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  receivedLikes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        image: String,
      comment: String,
      },
      image: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  blockedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
 
  rating: {
    type: Number,
    default: 10,
    min: 1,
    max: 10
  },
  ratingCount: {
    type: Number, // Supports very large numbers
    default: 0
  },
  totalRatingSum: {
    type:Number, // Ensures precision even with huge sums
    default: 10
  }
  
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
