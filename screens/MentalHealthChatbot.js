import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {HfInference} from '@huggingface/inference';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';
const API_KEY_TWO = Constants.expoConfig.extra.EXPO_PUBLIC_API_KEY_TWO; // Replace with your actual Hugging Face API key
const inference = new HfInference(API_KEY_TWO);

const mental_health_keywords = [
  // General Mental Health Terms
  'die',
  'deal',
  'cope',
  'cop',
  'yell',
  'mental health',
  'anxiety',
  'passed away',
  'mood',
  'depression',
  'stress',
  'panic',
  'burnout',
  'trauma',
  'grief',
  'sadness',
  'loneliness',
  'mood swings',
  'fear',
  'negative thoughts',
  'anger',
  'emotional distress',
  'mindfulness',
  'hopelessness',
  'overwhelmed',
  'worthlessness',
  'helplessness',
  'self-harm',
  'suicide',
  'kill myself',
  'jump from building',
  'cut myself',
  'hang myself',
  'end my life',
  'take pills',
  'overdose',
  'no reason to live',
  'life is meaningless',
  'nobody loves me',
  'mom call',
  'nobody needs me',
  "i'm invisible",
  'why am i alive',
  'beat ',
  'beat me',
  'hit',
  'toxic',
  'cry',
  'nervous breakdown',
  'crying every day',
  'giving up',
  'empty inside',
  'child abuse',

  // Disorders and Conditions
  'PTSD',
  'post-traumatic stress disorder',
  'bipolar',
  'schizophrenia',
  'OCD',
  'obsessive-compulsive disorder',
  'eating disorder',
  'anorexia',
  'bulimia',
  'panic attacks',
  'social anxiety',
  'generalized anxiety disorder',
  'clinical depression',
  'major depressive disorder',
  'manic depression',
  'dissociation',
  'ADHD',
  'autism',
  'personality disorder',
  'fat',
  'thin',
  'insecure',
  'bodyshape',
  'mood swings',
  'borderline personality disorder',
  'psychosis',
  'hallucinations',

  // Abuse and Trauma
  'harassment',
  'threatened',
  'abuse',
  'emotional abuse',
  'physical abuse',
  'sexual abuse',
  'domestic violence',
  'beaten',
  'yelled at',
  'threatened my life',
  'abandoned',
  'neglected',
  'violence at home',
  'childhood trauma',
  'parental abuse',
  'family issues',
  'toxic family',
  'toxic parents',
  'abusive parents',
  'parental neglect',
  'family fights',
  'family arguments',
  'beaten by parents',
  'hit by mom',
  'hit by dad',
  'mom yells at me',
  'dad yells at me',
  'parents hate me',
  "parents don't understand",
  'abused by family',
  'siblings abuse',
  'violent home',
  'forced marriage',
  'cultural pressure',
  'pressure from parents',
  'strict parents',
  'emotional manipulation',
  'gaslighting by parents',
  'verbal abuse by family',
  'unrealistic expectations',
  'family rejection',
  'feeling unloved at home',
  'confidence',

  // Self-Care and Counseling Terms
  'therapy',
  'counseling',
  'cognitive behavioral therapy',
  'CBT',
  'mental health resources',
  'psychotherapy',
  'psychological support',
  'counselor',
  'therapist',
  'psychologist',
  'psychiatrist',
  'wellness',
  'self-care',
  'healing',
  'mind-body connection',
  'stress relief',
  'relaxation techniques',
  'coping mechanisms',
  'emotional resilience',
  'mental strength',
  'support groups',
  'grief counseling',
  'self-esteem',
  'mom hitting',
  'child abuse',
  'sexual',
  'harrasing',
  'molesting',
  'perverted',
  'die',
  'feel',
  'like',
  'touched',
  'groped',
  'rubbed',

  // Situational Contexts
  'relationship issues',
  'friendship problems',
  'family problems',
  'toxicity',
  'divorce',
  'breakup',
  'cheating',
  'loss of a loved one',
  'workplace stress',
  'job loss',
  'financial stress',
  'academic pressure',
  'exam stress',
  'failure',
  'rejection',
  'peer pressure',
  'loneliness',
  'betrayal',
  'addiction',
  'alcohol abuse',
  'drug abuse',
  'smoking',
  'substance abuse',
  'gambling addiction',
  'internet addiction',
  'porn addiction',
  'sexual',
  'harrased',
  'molesting',
  'creepy',

  // Feelings and Emotions
  'sad',
  'happy',
  'worried',
  'relieved',
  'stressed',
  'calm',
  'hopeful',
  'frustrated',
  'angry',
  'anxious',
  'excited',
  'guilty',
  'ashamed',
  'confused',
  'lost',
  'isolated',
  'scared',
  'broken',
  'defeated',
  'disheartened',
  'trapped',
  'ashamed',
  'disconnected',
  'rejected',
  'hurt',
  'betrayed',
  'insecure',
  'apathetic',
  'vulnerable',
  'misunderstood',
];

const emotional_expressions = [
  'i feel',
  'i am feeling',
  'i am',
  'i feel so',
  'i have been feeling',
  'i want',
  "i've decided",
  'i feel like giving up',
  'i am going through',
  'i think about',
  "i can't handle",
  "i don't want to",
  'i wish i could',
  'i feel hopeless',
  'i feel worthless',
  'i feel like a burden',
  'i feel overwhelmed',
  'i feel trapped',
  'i feel empty',
  "i don't see a way out",
  'i feel unloved',
  "i can't take it anymore",
  "i'm scared",
  "i'm anxious",
  "i'm stressed",
  "i can't sleep",
  'i feel broken',
  "i can't do this",
  'i feel abandoned',
  "i can't stop thinking about",
  'i feel ashamed',
  'i feel guilty',
  'i feel useless',
  'i feel lost',
  "i don't belong",
  'i feel hated',
  'nobody cares about me',
  'i feel helpless',
  'i feel like dying',
  'nobody listens to me',
  'nobody understands me',
  'i feel defeated',
  'i feel like crying all the time',
  "i can't stop crying",
  'i feel anxious all day',
  'why does nobody care',
  'why does this happen to me',
  'i feel stuck',
  'i am losing control',
  'i feel like ending it all',
  'why am i like this',
  "i don't know what to do anymore",
];
const SYSTEM_PROMPT = ` You are a compassionate mental health assistant, and a user is going through a tough time.  Reply -Please ask questions related to mental health only. I'm here to help with mental health concerns to If the query is not related to mental health or is just one word irrelevant query."
            "The user may be feeling betrayed, confused, or hurt, and needs understanding and emotional support. "
            "Offer an empathetic and understanding response. Avoid clinical or diagnostic language. "
            "Encourage the user to take care of themselves and seek appropriate help if needed. "
            "Emphasize healing, self-care, and that it’s okay to feel upset and ask for help. Be specific in your response, "
            "acknowledge the emotions, and suggest ways to cope or seek support.Don't every say you are unable to address the issue, understand the query and answer accordingly \n\n"
  `;
const checkKeywords = query => {
  const queryLower = query.toLowerCase();
  const matchedKeywords = mental_health_keywords.some(keyword =>
    queryLower.includes(keyword),
  );
  const matchedEmotions = emotional_expressions.some(expression =>
    queryLower.includes(expression),
  );
  return matchedKeywords || matchedEmotions;
};

const MentalHealthChatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);
    setAiResponse('');
    if (!checkKeywords(userInput)) {
      setAiResponse(
        "Please ask questions related to mental health only. I'm here to support your well-being.Could you Elaborate? Make No spelling mistakes h",
      );
      setIsLoading(false);
      setUserInput('');
      return;
    }

    try {
      const out = await inference.chatCompletion({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          {role: 'system', content: SYSTEM_PROMPT},
          {role: 'user', content: userInput},
        ],
        max_tokens: 512,
      });

      setAiResponse(out.choices[0].message.content);
    } catch (error) {
      setAiResponse('Error fetching response. Please try again.');
    }

    setIsLoading(false);
    setUserInput('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.mainContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setUserInput('');
              setAiResponse('');
            }}
            style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (aiResponse) Clipboard.setString(aiResponse);
              Alert.alert('Copied to clipboard!');
            }}
            style={[styles.copyButton, !aiResponse && styles.buttonDisabled]}
            disabled={!aiResponse}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Chat Display */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          {aiResponse ? (
            <Text style={styles.response}>{aiResponse}</Text>
          ) : isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0077b6" />
              <Text style={styles.loadingText}>Generating response...</Text>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                How can I support your mental well-being today?
              </Text>
              <LottieView
                source={require('../assets/mentalhealth.json')} // Ensure this file exists in your assets folder
                autoPlay
                loop
                style={styles.lottie}
                speed={1}
              />
            </View>
          )}
        </ScrollView>

        {/* Input Section (Slimmer Footer) */}
        <View style={styles.footer}>
          <TextInput
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type your prompt..."
            placeholderTextColor="#555"
            style={styles.input}
            multiline={false}
            returnKeyType="send"
            onSubmitEditing={
              !isLoading && userInput.trim() ? getAIResponse : null
            }
          />
          <TouchableOpacity
            onPress={getAIResponse}
            style={[
              styles.button,
              (!userInput.trim() || isLoading) && styles.buttonDisabled,
            ]}
            disabled={!userInput.trim() || isLoading}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#E3F2FD'}, // Light blue background
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#0077b6', // Deep blue
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#ff5252',
    borderRadius: 30, // More rounded
    alignItems: 'center',
  },
  clearButtonText: {color: '#fff', fontWeight: 'bold'},
  copyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#00b4d8',
    borderRadius: 30, // More rounded
    alignItems: 'center',
  },
  copyButtonText: {color: '#fff', fontWeight: 'bold'},
  scrollView: {flex: 1},
  scrollViewContent: {padding: 20},
  response: {
    fontSize: 16,
    color: '#004466',
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
  },
  loadingContainer: {alignItems: 'center', marginTop: 20},
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0077b6',
    fontWeight: 'bold',
  },
  placeholderContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  placeholderText: {
    fontSize: 20,
    color: '#0077b6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Space above Lottie
  },
  lottie: {
    width: 300, // Bigger animation
    height: 300,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8, // Reduced thickness
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 30, // More rounded input
    borderColor: '#0077b6',
    fontSize: 16,
    color: '#004466',
  },
  button: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#0077b6',
    borderRadius: 30, // More rounded button
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  buttonDisabled: {opacity: 0.5},
});

export default MentalHealthChatbot;
