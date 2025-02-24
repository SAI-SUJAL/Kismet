import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {getRegistrationProgress} from '../RegistrationUtils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const ShowPromptScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [prompts, setPrompts] = useState([]);
  const [count, setCount] = useState(0);
  const options = ['College Life', 'Personal Growth', 'Campus Activities'];
  const [option, setOption] = useState(options[0]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const promptss = [
    {
      id: '0',
      name: 'College Life',
      questions: [
        {id: '10', question: 'Favorite spot to bunk and chill on campus'},
        {id: '11', question: 'Best food I’ve had at the college canteen'},
      
        {id: '12', question: 'The worst subject I’ve ever had to study?'},
        {id: '13', question: 'My Highest Cgpa/Lowest Cgpa so far..'},
        {id: '14', question: 'One campus secret I’ve discovered'},
      ],
    },
    {
      id: '2',
      name: 'Personal Growth',
      questions: [
        {id: '10', question: 'A boundary of mine is'},
        
        {id: '11', question: 'I feel most productive when'},
        {
          id: '12',
          question: 'One personal challenge I’ve overcome in college is',
        },
        {id: '13', question: 'My career goal after graduation is'},
        {id: '14', question: 'A hobby I want to explore during college is'},
        {id: '15', question: 'My dream company is'},
      ],
    },
    {
      id: '3',
      name: 'Campus Activities',
      questions: [
        {
          id: '10',
          question:
            "The most mischievous thing I've done during college event?",
        },
        {
          id: '11',
          question: "The craziest thing I've seen happen at college event?",
        },
        {
          id: '12',
          question:
            "The most unforgettable moment from college fest I've attended?",
        },
        {
          id: '13',
          question:
            'The college event I always look forward to the most (and why?)',
        },
        {id: '14', question: 'The Worst Club is (and why?)'},
      ],
    },
  ];

  useEffect(() => {
    if (route.params?.existingPrompts) {
      setPrompts(route.params.existingPrompts);
      setCount(route.params.existingPrompts.length);
    }
  }, [route.params?.existingPrompts]);

  const openModal = item => {
    setModalVisible(true);
    setQuestion(item?.question);
  };

  const addPrompt = () => {
    if (!question || !answer) {
      // Add validation feedback
      return;
    }

    const newPrompt = {question, answer};
    const updatedPrompts = [...prompts, newPrompt];
    setPrompts(updatedPrompts);
    setCount(updatedPrompts.length);

    // Reset form
    setQuestion('');
    setAnswer('');
    setModalVisible(false);

    // Navigate after adding prompt
    if (updatedPrompts.length === 4) {
      navigation.navigate('Prompts', {prompts: updatedPrompts});
    } else {
      setOption(prevOption => {
        const currentIndex = options.indexOf(prevOption);
        const nextIndex = (currentIndex + 1) % options.length; // Moves to next, loops back if at the end
        return options[nextIndex];
      });
    }
  };
  // const navigation = useNavigation();

  // const [prompts, setPrompts] = useState([]);
  // const [count, setCount] = useState(0);
  // const promptss = [
  //   {
  //     id: '0',
  //     name: 'College Life',
  //     questions: [
  //       { id: '10', question: 'Favorite spot to bunk and chill on campus' },
  //       { id: '11', question: 'Best food I’ve had at the college canteen' },
  //       { id: '12', question: 'The class I skip most often (and why)' },
  //       { id: '13', question: 'The worst subject I’ve ever had to study?' },
  //       { id: '14', question: 'The lecture I look forward to the most' },
  //       {
  //         id: '15',
  //         question:
  //           'The one time I copied in an exam (and how I got away with it, or didn’t)',
  //       },
  //       { id: '16', question: 'One campus secret I’ve discovered' },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     name: 'Personal Growth',
  //     questions: [
  //       { id: '10', question: 'A boundary of mine is' },
  //       {
  //         id: '11',
  //         question: 'If I could eat one meal for the rest of my life…',
  //       },
  //       { id: '12', question: 'I feel most productive when' },
  //       {
  //         id: '13',
  //         question: 'One personal challenge I’ve overcome in college is',
  //       },
  //       { id: '14', question: 'My career goal after graduation is' },
  //       { id: '15', question: 'A hobby I want to explore during college is' },
  //       { id: '16', question: 'I will never judge you about…' },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     name: 'Campus Activities',
  //     questions: [
  //       {
  //         id: '10',
  //         question:
  //           "The most mischievous thing I've done during college event?",
  //       },
  //       {
  //         id: '11',
  //         question: "The craziest thing I've seen happen at college event?",
  //       },
  //       {
  //         id: '12',
  //         question:
  //           "The most unforgettable moment from college fest I've attended?",
  //       },
  //       {
  //         id: '13',
  //         question: 'The college event I always look forward to the most (and why?)',
  //       },
  //       { id: '14', question: 'The Worst Club is (and why?)' },
  //     ],
  //   },
  // ];
  // const [option, setOption] = useState('College Life');
  // const [question, setQuestion] = useState('');
  // const [answer, setAnswer] = useState('');
  // const [isModalVisible, setModalVisible] = useState(false);

  // const openModal = (item) => {
  //   setModalVisible(!isModalVisible);
  //   setQuestion(item?.question);
  // };

  // const addPrompt = () => {
  //   const newPrompt = { question, answer };
  //   const updatedPrompts = [...prompts, newPrompt]; // Create the updated array
  //   setPrompts(updatedPrompts); // Update the state with the new array

  //   setQuestion('');
  //   setAnswer('');
  //   setModalVisible(false); // Close the modal regardless of the condition

  //   // Navigate when 4 prompts are added
  //   if (updatedPrompts.length === 1) {
  //     console.log(prompts)
  //     console.log(updatedPrompts)
  //     navigation.navigate('Prompts', { prompts: updatedPrompts });
  //   }
  // };

  // useEffect(() => {
  //   setCount(prompts.length); // Update count when prompts array changes
  // }, [prompts]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#581845'}}>
            Choose Prompts
          </Text>
          <Text style={{fontSize: 16, fontWeight: '500', color: '#581845'}}>
            {`Written: ${count}/4`}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            flexDirection: 'row',
            gap: 10,
          }}>
          {promptss?.map((item, index) => (
            <View key={index}>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: option === item?.name ? '#581845' : 'white',
                }}
                onPress={() => setOption(item?.name)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: option === item?.name ? 'white' : 'black',
                  }}>
                  {item?.name}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={{marginTop: 20, marginHorizontal: 12}}>
          {promptss?.map((item, index) => (
            <View key={index}>
              {option === item?.name && (
                <View>
                  {item?.questions?.map((question, questionIndex) => (
                    <Pressable
                      onPress={() => openModal(question)}
                      style={{marginVertical: 12}}
                      key={questionIndex}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        {question.question}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Answer your question</Text>
                <Text style={styles.questionText}>{question}</Text>
                <TextInput
                  style={styles.textInput}
                  value={answer}
                  onChangeText={text => setAnswer(text)}
                  placeholder="Enter Your Answer"
                />
                <Button onPress={addPrompt} title="Add" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#202020',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});

export default ShowPromptScreen;
