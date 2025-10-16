import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Trophy, Flame, CheckCircle2, Settings, 
  LogOut, Award, X, Eye, EyeOff, Shield, Activity, 
  Zap, Target, Crown, ChevronRight, Star
} from 'lucide-react';

// Initialize 100 lifetime codes
const initializeLifetimeCodes = () => {
  const codes = {};
  for (let i = 1; i <= 100; i++) {
    const codeNum = String(i).padStart(4, '0');
    codes[`VV-LIFE-2024-${codeNum}`] = {
      status: 'available',
      activatedBy: null,
      activatedDate: null,
      email: null,
      lastLogin: null,
      exercisesCompleted: 0,
      loginCount: 0
    };
  }
  return codes;
};

// Exercise data with 95 total activities
const exerciseData = {
  'fill-blank': {
    questions: [
      // BEGINNER (12)
      { verse: "For God so _____ the world", answer: "loved", reference: "John 3:16", difficulty: "beginner" },
      { verse: "I can do all things through _____", answer: "Christ", reference: "Philippians 4:13", difficulty: "beginner" },
      { verse: "The Lord is my _____", answer: "shepherd", reference: "Psalm 23:1", difficulty: "beginner" },
      { verse: "Trust in the Lord with all your _____", answer: "heart", reference: "Proverbs 3:5", difficulty: "beginner" },
      { verse: "Be still, and know that I am _____", answer: "God", reference: "Psalm 46:10", difficulty: "beginner" },
      { verse: "The Lord is my light and my _____", answer: "salvation", reference: "Psalm 27:1", difficulty: "beginner" },
      { verse: "Love the Lord your God with all your _____", answer: "heart", reference: "Matthew 22:37", difficulty: "beginner" },
      { verse: "In the beginning was the _____", answer: "Word", reference: "John 1:1", difficulty: "beginner" },
      { verse: "Come to me, all you who are _____", answer: "weary", reference: "Matthew 11:28", difficulty: "beginner" },
      { verse: "For I know the _____ I have for you", answer: "plans", reference: "Jeremiah 29:11", difficulty: "beginner" },
      { verse: "The _____ shall inherit the earth", answer: "meek", reference: "Matthew 5:5", difficulty: "beginner" },
      { verse: "Ask and it will be given to you; _____", answer: "seek", reference: "Matthew 7:7", difficulty: "beginner" },
      
      // INTERMEDIATE (12)
      { verse: "Cast all your _____ on him", answer: "anxiety", reference: "1 Peter 5:7", difficulty: "intermediate" },
      { verse: "For where two or three gather in my _____", answer: "name", reference: "Matthew 18:20", difficulty: "intermediate" },
      { verse: "The _____ of the Lord is the beginning of wisdom", answer: "fear", reference: "Proverbs 9:10", difficulty: "intermediate" },
      { verse: "Your word is a _____ for my feet", answer: "lamp", reference: "Psalm 119:105", difficulty: "intermediate" },
      { verse: "Greater love has no one than this: to lay down one's _____", answer: "life", reference: "John 15:13", difficulty: "intermediate" },
      { verse: "Do not be anxious about anything, but by _____", answer: "prayer", reference: "Philippians 4:6", difficulty: "intermediate" },
      { verse: "The _____ goes before you", answer: "Lord", reference: "Deuteronomy 31:8", difficulty: "intermediate" },
      { verse: "Rejoice always, _____ continually", answer: "pray", reference: "1 Thessalonians 5:16", difficulty: "intermediate" },
      { verse: "But the fruit of the Spirit is love, joy, _____", answer: "peace", reference: "Galatians 5:22", difficulty: "intermediate" },
      { verse: "For we walk by _____, not by sight", answer: "faith", reference: "2 Corinthians 5:7", difficulty: "intermediate" },
      { verse: "If God is for us, who can be _____ us", answer: "against", reference: "Romans 8:31", difficulty: "intermediate" },
      { verse: "And we know that in all things God works for the _____", answer: "good", reference: "Romans 8:28", difficulty: "intermediate" },
      
      // EXPERT (11)
      { verse: "The _____ of man are in his heart", answer: "plans", reference: "Proverbs 16:9", difficulty: "expert" },
      { verse: "If anyone is in Christ, the new creation has come: The old has gone, the new is _____", answer: "here", reference: "2 Corinthians 5:17", difficulty: "expert" },
      { verse: "Do not conform to the pattern of this world, but be _____", answer: "transformed", reference: "Romans 12:2", difficulty: "expert" },
      { verse: "For the Spirit God gave us does not make us timid, but gives us power, love and _____", answer: "self-discipline", reference: "2 Timothy 1:7", difficulty: "expert" },
      { verse: "But those who hope in the Lord will renew their _____", answer: "strength", reference: "Isaiah 40:31", difficulty: "expert" },
      { verse: "The Lord is close to the _____", answer: "brokenhearted", reference: "Psalm 34:18", difficulty: "expert" },
      { verse: "Commit to the Lord whatever you do, and he will establish your _____", answer: "plans", reference: "Proverbs 16:3", difficulty: "expert" },
      { verse: "Be kind and _____ to one another", answer: "compassionate", reference: "Ephesians 4:32", difficulty: "expert" },
      { verse: "But seek first his kingdom and his _____", answer: "righteousness", reference: "Matthew 6:33", difficulty: "expert" },
      { verse: "The Lord your God is with you, the Mighty Warrior who _____", answer: "saves", reference: "Zephaniah 3:17", difficulty: "expert" },
      { verse: "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is _____", answer: "right", reference: "Philippians 4:8", difficulty: "expert" }
    ]
  },
  'story-sequence': {
    stories: [
      // BEGINNER (9)
      { title: "Noah's Ark", events: ["God sees wickedness", "God tells Noah to build ark", "Noah builds ark", "Animals enter", "Flood comes", "Waters recede", "Noah sends dove", "God makes covenant"], difficulty: "beginner" },
      { title: "David and Goliath", events: ["Philistines challenge", "Goliath taunts", "David arrives", "David volunteers", "Saul offers armor", "David chooses stones", "David defeats Goliath", "Israelites chase"], difficulty: "beginner" },
      { title: "Good Samaritan", events: ["Man travels to Jericho", "Robbers attack", "Priest passes by", "Levite passes by", "Samaritan stops", "Bandages wounds", "Takes to inn", "Pays for care"], difficulty: "beginner" },
      { title: "Birth of Jesus", events: ["Angel visits Mary", "Travel to Bethlehem", "No room at inn", "Jesus born in stable", "Angels appear", "Shepherds visit", "Wise men see star", "Wise men bring gifts"], difficulty: "beginner" },
      { title: "Jesus Calms Storm", events: ["Jesus gets in boat", "Jesus falls asleep", "Storm arises", "Waves sweep", "Disciples wake Jesus", "Jesus rebukes wind", "Storm calms", "Disciples marvel"], difficulty: "beginner" },
      { title: "Jonah and Whale", events: ["God tells Jonah go", "Jonah runs away", "Storm threatens", "Sailors throw overboard", "Fish swallows", "Jonah prays", "Fish vomits out", "Jonah preaches"], difficulty: "beginner" },
      { title: "Feeding 5000", events: ["Crowd follows", "Evening comes", "Disciples suggest send away", "Boy has food", "Jesus gives thanks", "Disciples distribute", "Everyone satisfied", "Twelve baskets left"], difficulty: "beginner" },
      { title: "Zacchaeus", events: ["Jesus enters Jericho", "Zacchaeus wants see", "Too short", "Climbs tree", "Jesus stops", "Jesus invites himself", "People grumble", "Zacchaeus repents"], difficulty: "beginner" },
      { title: "Walk on Water", events: ["Jesus sends ahead", "Goes to pray", "Disciples struggle", "Jesus walks", "Think ghost", "Jesus speaks", "Peter asks", "Peter walks then sinks"], difficulty: "beginner" },
      
      // INTERMEDIATE (8)
      { title: "Prodigal Son", events: ["Son asks inheritance", "Travels away", "Wastes wealth", "Famine strikes", "Feeds pigs", "Decides return", "Father sees and runs", "Throws feast"], difficulty: "intermediate" },
      { title: "Burning Bush", events: ["Moses tends flock", "Sees burning bush", "God calls", "Moses removes sandals", "God reveals name", "Tells free Israelites", "Moses asks sign", "God gives signs"], difficulty: "intermediate" },
      { title: "Lions Den", events: ["Darius makes official", "Officials plot", "King signs decree", "Daniel prays", "Daniel arrested", "Thrown in den", "Angel protects", "King frees"], difficulty: "intermediate" },
      { title: "Resurrection", events: ["Jesus crucified", "Stone seals", "Mary visits", "Stone rolled", "Angels announce", "Mary sees Jesus", "Appears to disciples", "Thomas touches"], difficulty: "intermediate" },
      { title: "Exodus", events: ["Enslaved in Egypt", "Ten plagues", "Pharaoh lets go", "Leave in haste", "Pharaoh pursues", "Reach Red Sea", "Moses parts", "Egyptians defeated"], difficulty: "intermediate" },
      { title: "Gideon", events: ["Angel appears", "God calls", "Gathers 32000", "Too large", "Reduces to 300", "Gives torches", "Surround camp", "Flee in confusion"], difficulty: "intermediate" },
      { title: "Pentecost", events: ["Believers gather", "Rushing wind", "Tongues of fire", "Filled with Spirit", "Speak languages", "Crowd amazed", "Peter preaches", "3000 baptized"], difficulty: "intermediate" },
      { title: "Paul Conversion", events: ["Saul persecutes", "Travels Damascus", "Bright light", "Falls down", "Jesus speaks", "Blinded three days", "Ananias visits", "Sight returns"], difficulty: "intermediate" },
      
      // EXPERT (8)
      { title: "Tower Babel", events: ["One language", "Settle Shinar", "Build city", "Build tower", "God comes down", "Confuses language", "Can't understand", "Scatter earth"], difficulty: "expert" },
      { title: "Joseph Brothers", events: ["Jacob gives coat", "Brothers jealous", "Sell to slavery", "Taken to Egypt", "Interprets dreams", "Becomes commander", "Famine brings", "Reveals and forgives"], difficulty: "expert" },
      { title: "Esther", events: ["Becomes queen", "Haman plots", "Mordecai asks", "Risks life", "King extends", "Invites banquet", "Reveals plot", "King saves Jews"], difficulty: "expert" },
      { title: "Fall Jericho", events: ["Camp near", "Sends spies", "Rahab hides", "God gives instructions", "March once daily", "Seventh day seven", "Trumpets and shout", "Walls collapse"], difficulty: "expert" },
      { title: "Elijah Baal", events: ["Israel worships Baal", "Challenges prophets", "Two altars", "Prophets call", "No fire", "Elijah prays", "Fire falls", "People declare Lord"], difficulty: "expert" },
      { title: "Road Emmaus", events: ["Walk to Emmaus", "Discuss crucifixion", "Jesus joins", "Don't recognize", "Arrive village", "Invite stay", "Breaks bread", "Eyes opened"], difficulty: "expert" },
      { title: "Peter Prison", events: ["Herod arrests", "Bound chains", "Church prays", "Angel appears", "Chains fall", "Past guards", "Gate opens", "Peter realizes"], difficulty: "expert" },
      { title: "Great Commission", events: ["Appears to eleven", "Some doubt", "Jesus approaches", "Claims authority", "Make disciples", "Baptize believers", "Teach commands", "Promises presence"], difficulty: "expert" }
    ]
  },
  'number-memory': {
    questions: [
      // BEGINNER (12)
      { question: "How many days did Jesus fast?", answer: "40", reference: "Matthew 4:2", difficulty: "beginner" },
      { question: "How many disciples did Jesus choose?", answer: "12", reference: "Matthew 10:1", difficulty: "beginner" },
      { question: "How many plagues on Egypt?", answer: "10", reference: "Exodus 7-12", difficulty: "beginner" },
      { question: "How many days was Lazarus in tomb?", answer: "4", reference: "John 11:17", difficulty: "beginner" },
      { question: "How many sons did Jacob have?", answer: "12", reference: "Genesis 35:22", difficulty: "beginner" },
      { question: "How old was Jesus when He began ministry?", answer: "30", reference: "Luke 3:23", difficulty: "beginner" },
      { question: "How many times did Peter deny Jesus?", answer: "3", reference: "Matthew 26:34", difficulty: "beginner" },
      { question: "How many days and nights did it rain?", answer: "40", reference: "Genesis 7:12", difficulty: "beginner" },
      { question: "How many pieces of silver for Judas?", answer: "30", reference: "Matthew 26:15", difficulty: "beginner" },
      { question: "How many days was Jonah in whale?", answer: "3", reference: "Jonah 1:17", difficulty: "beginner" },
      { question: "How many saved in ark?", answer: "8", reference: "1 Peter 3:20", difficulty: "beginner" },
      { question: "How many commandments?", answer: "10", reference: "Exodus 20", difficulty: "beginner" },
      
      // INTERMEDIATE (12)
      { question: "How many books in New Testament?", answer: "27", reference: "Bible", difficulty: "intermediate" },
      { question: "How many chapters in Psalms?", answer: "150", reference: "Psalms", difficulty: "intermediate" },
      { question: "How many lepers healed?", answer: "10", reference: "Luke 17:12", difficulty: "intermediate" },
      { question: "How many years wandering desert?", answer: "40", reference: "Numbers 14:33", difficulty: "intermediate" },
      { question: "How many fish caught after resurrection?", answer: "153", reference: "John 21:11", difficulty: "intermediate" },
      { question: "How many righteous to spare Sodom?", answer: "10", reference: "Genesis 18:32", difficulty: "intermediate" },
      { question: "How many brothers did Joseph have?", answer: "11", reference: "Genesis 37:2", difficulty: "intermediate" },
      { question: "How many baskets after feeding 5000?", answer: "12", reference: "Matthew 14:20", difficulty: "intermediate" },
      { question: "How many books in Old Testament?", answer: "39", reference: "Bible", difficulty: "intermediate" },
      { question: "How many days after resurrection to ascension?", answer: "40", reference: "Acts 1:3", difficulty: "intermediate" },
      { question: "How many years to build temple?", answer: "7", reference: "1 Kings 6:38", difficulty: "intermediate" },
      { question: "How many loaves for 5000?", answer: "5", reference: "John 6:9", difficulty: "intermediate" },
      
      // EXPERT (11)
      { question: "Generations Abraham to David?", answer: "14", reference: "Matthew 1:17", difficulty: "expert" },
      { question: "Years Abraham waited for Isaac?", answer: "25", reference: "Genesis 12:4, 21:5", difficulty: "expert" },
      { question: "Years in Egypt before Exodus?", answer: "430", reference: "Exodus 12:40", difficulty: "expert" },
      { question: "Silver shekels Jeremiah paid?", answer: "17", reference: "Jeremiah 32:9", difficulty: "expert" },
      { question: "Elders before God's throne?", answer: "24", reference: "Revelation 4:4", difficulty: "expert" },
      { question: "Times Naaman wash in Jordan?", answer: "7", reference: "2 Kings 5:10", difficulty: "expert" },
      { question: "Years Jacob served for Rachel?", answer: "14", reference: "Genesis 29:20-30", difficulty: "expert" },
      { question: "Men with Ezra to Jerusalem?", answer: "1754", reference: "Ezra 8:1-14", difficulty: "expert" },
      { question: "Chapters in Isaiah?", answer: "66", reference: "Isaiah", difficulty: "expert" },
      { question: "Persons in Paul's shipwreck?", answer: "276", reference: "Acts 27:37", difficulty: "expert" },
      { question: "Solomon's concubines?", answer: "300", reference: "1 Kings 11:3", difficulty: "expert" }
    ]
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [currentUser, setCurrentUser] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [lifetimeCodes, setLifetimeCodes] = useState(() => {
    const saved = localStorage.getItem('vv-lifetime-codes');
    return saved ? JSON.parse(saved) : initializeLifetimeCodes();
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('vv-users');
    return saved ? JSON.parse(saved) : {};
  });
  const [userProgress, setUserProgress] = useState({
    points: 0,
    streak: 0,
    exercisesCompleted: 0
  });
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exerciseState, setExerciseState] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    localStorage.setItem('vv-lifetime-codes', JSON.stringify(lifetimeCodes));
  }, [lifetimeCodes]);

  useEffect(() => {
    localStorage.setItem('vv-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      const progress = users[currentUser.email]?.progress || userProgress;
      setUserProgress(progress);
    }
  }, [currentUser, users]);

  const handleAdminLogin = () => {
    if (adminPassword === 'ADMIN2024') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setCurrentScreen('admin-dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogin = (email, password, loginType = 'regular') => {
    if (loginType === 'lifetime') {
      const code = email.toUpperCase();
      const codeData = lifetimeCodes[code];
      
      if (!codeData) {
        alert('Invalid lifetime code');
        return;
      }

      if (codeData.status === 'active' && codeData.email !== password) {
        alert('This code is already activated');
        return;
      }

      if (codeData.status === 'available') {
        const updatedCodes = {
          ...lifetimeCodes,
          [code]: {
            ...codeData,
            status: 'active',
            activatedBy: password,
            activatedDate: new Date().toISOString(),
            email: password,
            lastLogin: new Date().toISOString(),
            loginCount: 1
          }
        };
        setLifetimeCodes(updatedCodes);

        const newUser = {
          email: password,
          accountType: 'lifetime',
          lifetimeCode: code,
          createdDate: new Date().toISOString(),
          progress: { points: 0, streak: 0, exercisesCompleted: 0 }
        };
        
        setUsers({ ...users, [password]: newUser });
        setCurrentUser(newUser);
        setCurrentScreen('dashboard');
      } else {
        setCurrentUser(users[password]);
        setCurrentScreen('dashboard');
      }
      return;
    }

    if (loginType === 'create') {
      if (users[email]) {
        alert('Account already exists');
        return;
      }
      
      const newUser = {
        email,
        password,
        accountType: 'free',
        createdDate: new Date().toISOString(),
        progress: { points: 0, streak: 0, exercisesCompleted: 0 }
      };
      
      setUsers({ ...users, [email]: newUser });
      setCurrentUser(newUser);
      setCurrentScreen('dashboard');
      return;
    }

    const user = users[email];
    if (user && user.password === password) {
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setCurrentScreen('splash');
    setUserProgress({ points: 0, streak: 0, exercisesCompleted: 0 });
  };

  const startExercise = (type) => {
    setCurrentExercise(type);
    setCurrentScreen('difficulty-select');
  };

  const startExerciseWithDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    
    if (currentExercise === 'fill-blank') {
      setExerciseState({ currentQ: 0, score: 0, userAnswer: '', showResult: false, isCorrect: false });
    } else if (currentExercise === 'story-sequence') {
      const stories = exerciseData['story-sequence'].stories.filter(s => s.difficulty === difficulty);
      setExerciseState({
        currentStory: 0,
        score: 0,
        shuffledEvents: [...stories[0].events].sort(() => Math.random() - 0.5),
        selectedOrder: [],
        showResult: false,
        isCorrect: false
      });
    } else if (currentExercise === 'number-memory') {
      setExerciseState({ currentQ: 0, score: 0, userAnswer: '', showResult: false, isCorrect: false });
    }
    
    setCurrentScreen('exercise');
  };

  const completeExercise = (finalScore) => {
    const newProgress = {
      ...userProgress,
      points: userProgress.points + finalScore,
      exercisesCompleted: userProgress.exercisesCompleted + 1
    };

    setUserProgress(newProgress);

    const updatedUsers = {
      ...users,
      [currentUser.email]: {
        ...users[currentUser.email],
        progress: newProgress
      }
    };
    setUsers(updatedUsers);

    setCurrentExercise(null);
    setExerciseState(null);
    setSelectedDifficulty(null);
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'splash') {
    return (
      <SplashScreen 
        onLogin={handleLogin} 
        darkMode={darkMode}
        showAdminLogin={showAdminLogin}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        handleAdminLogin={handleAdminLogin}
        setShowAdminLogin={setShowAdminLogin}
      />
    );
  }

  if (currentScreen === 'admin-dashboard' && isAdmin) {
    return <AdminDashboard lifetimeCodes={lifetimeCodes} darkMode={darkMode} onLogout={handleLogout} />;
  }

  if (currentScreen === 'difficulty-select') {
    return (
      <DifficultySelect
        darkMode={darkMode}
        exerciseType={currentExercise}
        onSelectDifficulty={startExerciseWithDifficulty}
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <Dashboard
        currentUser={currentUser}
        userProgress={userProgress}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        onStartExercise={startExercise}
        showHelp={showHelp}
        setShowHelp={setShowHelp}
      />
    );
  }

  if (currentScreen === 'exercise' && currentExercise) {
    return (
      <ExerciseScreen
        exerciseType={currentExercise}
        exerciseState={exerciseState}
        setExerciseState={setExerciseState}
        darkMode={darkMode}
        difficulty={selectedDifficulty}
        onComplete={completeExercise}
        onExit={() => {
          setCurrentExercise(null);
          setExerciseState(null);
          setSelectedDifficulty(null);
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  return null;
}

function SplashScreen({ onLogin, darkMode, showAdminLogin, adminPassword, setAdminPassword, handleAdminLogin, setShowAdminLogin }) {
  const [loginType, setLoginType] = useState('regular');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} flex items-center justify-center p-4`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8 max-w-md w-full`}>
        <div className="text-center mb-8">
          <BookOpen className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>VerseVault</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hide God's Word in Your Heart</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setLoginType('regular')} className={`flex-1 py-2 px-4 rounded-lg font-medium ${loginType === 'regular' ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            Sign In
          </button>
          <button onClick={() => setLoginType('create')} className={`flex-1 py-2 px-4 rounded-lg font-medium ${loginType === 'create' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            Create
          </button>
          <button onClick={() => setLoginType('lifetime')} className={`flex-1 py-2 px-4 rounded-lg font-medium ${loginType === 'lifetime' ? 'bg-amber-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            Lifetime
          </button>
        </div>

        <div className="space-y-4">
          {loginType === 'lifetime' ? (
            <>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value.toUpperCase())} placeholder="VV-LIFE-2024-0001" className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <input type="email" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="your@email.com" className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
            </>
          ) : (
            <>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </>
          )}

          <button onClick={() => onLogin(email, password, loginType)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold">
            {loginType === 'create' ? 'Create Account' : loginType === 'lifetime' ? 'Activate Code' : 'Sign In'}
          </button>
        </div>

        <button onClick={() => setShowAdminLogin(true)} className={`w-full mt-4 py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Admin Access
        </button>

        {showAdminLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-sm w-full`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Login</h3>
              <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Password" className={`w-full px-4 py-3 rounded-lg border mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
              <div className="flex gap-3">
                <button onClick={handleAdminLogin} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-bold">Login</button>
                <button onClick={() => setShowAdminLogin(false)} className={`flex-1 py-2 rounded-lg font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ currentUser, userProgress, darkMode, setDarkMode, onLogout, onStartExercise, showHelp, setShowHelp }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} pb-20`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BookOpen className={`w-12 h-12 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>VerseVault</h1>
                <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentUser.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowHelp(true)} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Award className="w-6 h-6" />
              </button>
              <button onClick={() => setShowSettings(true)} className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border-4 border-amber-400 shadow-xl">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">Welcome Back!</h2>
          <p className="text-xl text-amber-800">Let's strengthen your faith and memory today</p>
          {currentUser.accountType === 'lifetime' && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">Lifetime Member</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-4 border-yellow-400`}>
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-12 h-12 text-amber-500" />
              <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{userProgress.points}</span>
            </div>
            <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Points</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-4 border-yellow-400`}>
            <div className="flex items-center justify-between mb-4">
              <Flame className="w-12 h-12 text-orange-500" />
              <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{userProgress.streak}</span>
            </div>
            <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Day Streak</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-4 border-yellow-400`}>
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{userProgress.exercisesCompleted}</span>
            </div>
            <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Exercises Done</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button onClick={() => onStartExercise('fill-blank')} className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-2xl p-8 shadow-xl text-left transition-all border-4 border-yellow-400`}>
            <BookOpen className={`w-12 h-12 mb-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Fill in Blank</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>35 activities</p>
          </button>

          <button onClick={() => onStartExercise('story-sequence')} className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-2xl p-8 shadow-xl text-left transition-all border-4 border-yellow-400`}>
            <BookOpen className={`w-12 h-12 mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Story Sequencing</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>25 stories</p>
          </button>

          <button onClick={() => onStartExercise('number-memory')} className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-2xl p-8 shadow-xl text-left transition-all border-4 border-yellow-400`}>
            <Activity className={`w-12 h-12 mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Number Memory</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>35 questions</p>
          </button>
        </div>

        {currentUser.accountType === 'free' && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white border-4 border-yellow-400 shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Unlock All Features</h3>
            <p className="text-lg mb-4">Get Premium for only $4.99/month!</p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold">Start Free Trial</button>
          </div>
        )}
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-md w-full`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h2>
              <button onClick={() => setShowSettings(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dark Mode</span>
                <button onClick={() => setDarkMode(!darkMode)} className={`w-14 h-8 rounded-full ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full transition-all ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentUser.email}</p>
                <p className={`text-sm capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentUser.accountType} Account</p>
                {currentUser.lifetimeCode && (
                  <p className={`text-sm ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>Code: {currentUser.lifetimeCode}</p>
                )}
              </div>

              <button onClick={onLogout} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>How to Use VerseVault</h2>
              <button onClick={() => setShowHelp(false)}>
                <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>📱 Getting Started</h3>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>Dashboard:</strong> View your points, streak, and exercises completed</li>
                  <li>• <strong>Choose Exercise:</strong> Click any of the 3 exercise cards</li>
                  <li>• <strong>Select Difficulty:</strong> Pick Beginner, Intermediate, or Expert</li>
                  <li>• <strong>Play & Earn Points:</strong> Complete activities to earn points!</li>
                </ul>
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-cyan-50'} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-cyan-400' : 'text-cyan-800'}`}>📝 Fill in the Blank</h3>
                <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><strong>35 Bible verses with missing words</strong></p>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• Read the verse carefully</li>
                  <li>• Type the missing word in the box</li>
                  <li>• Click "Submit" to check your answer</li>
                  <li>• <strong>Earn 75 points</strong> for each correct answer</li>
                  <li>• Beginner: 12 questions • Intermediate: 12 • Expert: 11</li>
                </ul>
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-amber-50'} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-amber-400' : 'text-amber-800'}`}>📖 Story Sequencing</h3>
                <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><strong>25 Bible stories to put in order</strong></p>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• Read the story title</li>
                  <li>• Click events from "Available" list in the correct order</li>
                  <li>• Remove wrong items by clicking the X button</li>
                  <li>• Submit when all events are in order</li>
                  <li>• <strong>Earn 100 points</strong> for correct sequence</li>
                  <li>• Beginner: 9 stories • Intermediate: 8 • Expert: 8</li>
                </ul>
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>🔢 Number Memory</h3>
                <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><strong>35 questions about Biblical numbers</strong></p>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• Read the question carefully</li>
                  <li>• Type the number answer</li>
                  <li>• Just numbers - no words (e.g., "12" not "twelve")</li>
                  <li>• Click "Submit" to check</li>
                  <li>• <strong>Earn 85 points</strong> for each correct answer</li>
                  <li>• Beginner: 12 questions • Intermediate: 12 • Expert: 11</li>
                </ul>
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-green-400' : 'text-green-800'}`}>💡 Tips for Success</h3>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>Start with Beginner</strong> to learn the exercises</li>
                  <li>• <strong>Play daily</strong> to build your streak</li>
                  <li>• <strong>Take your time</strong> - there's no time limit</li>
                  <li>• <strong>Use Dark Mode</strong> if easier on your eyes (Settings)</li>
                  <li>• <strong>Exit anytime</strong> - your progress is saved</li>
                </ul>
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>🏆 Points & Progress</h3>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• Fill in Blank: <strong>75 points</strong> per correct answer</li>
                  <li>• Story Sequencing: <strong>100 points</strong> per correct story</li>
                  <li>• Number Memory: <strong>85 points</strong> per correct answer</li>
                  <li>• Maximum possible: <strong>8,500+ points total!</strong></li>
                  <li>• Your progress saves automatically</li>
                </ul>
              </div>
            </div>

            <button onClick={() => setShowHelp(false)} className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700">
              Got It! Let's Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DifficultySelect({ darkMode, exerciseType, onSelectDifficulty, onBack }) {
  const difficulties = [
    { level: 'beginner', name: 'Beginner', icon: Target, description: 'Perfect for starting out', color: 'green' },
    { level: 'intermediate', name: 'Intermediate', icon: Zap, description: 'Ready for a challenge', color: 'blue' },
    { level: 'expert', name: 'Expert', icon: Crown, description: 'Master level difficulty', color: 'purple' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}>
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Choose Difficulty</h2>
          </div>

          <div className="space-y-4 mb-6">
            {difficulties.map((diff) => {
              const DiffIcon = diff.icon;
              return (
                <button key={diff.level} onClick={() => onSelectDifficulty(diff.level)} className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl p-6 transition-all border-4 border-transparent hover:border-yellow-400`}>
                  <div className="flex items-center gap-4">
                    <DiffIcon className={`w-8 h-8 text-${diff.color}-600`} />
                    <div className="flex-1 text-left">
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{diff.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{diff.description}</p>
                    </div>
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </button>
              );
            })}
          </div>

          <button onClick={onBack} className={`w-full py-3 rounded-lg font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ lifetimeCodes, darkMode, onLogout }) {
  const codeList = Object.entries(lifetimeCodes).map(([code, data]) => ({ code, ...data }));
  const stats = {
    total: codeList.length,
    available: codeList.filter(c => c.status === 'available').length,
    active: codeList.filter(c => c.status === 'active').length
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className={`w-10 h-10 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Admin Dashboard</h1>
            </div>
            <button onClick={onLogout} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.total}</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available</p>
            <p className="text-3xl font-bold text-green-600">{stats.available}</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</p>
            <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} uppercase`}>Code</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} uppercase`}>Status</th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} uppercase`}>Email</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {codeList.slice(0, 20).map((code) => (
                <tr key={code.code}>
                  <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{code.code}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${code.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {code.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{code.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExerciseScreen({ exerciseType, exerciseState, setExerciseState, darkMode, difficulty, onComplete, onExit }) {
  if (exerciseType === 'fill-blank') {
    return <FillBlankExercise state={exerciseState} setState={setExerciseState} darkMode={darkMode} difficulty={difficulty} onComplete={onComplete} onExit={onExit} />;
  } else if (exerciseType === 'story-sequence') {
    return <StorySequenceExercise state={exerciseState} setState={setExerciseState} darkMode={darkMode} difficulty={difficulty} onComplete={onComplete} onExit={onExit} />;
  } else if (exerciseType === 'number-memory') {
    return <NumberMemoryExercise state={exerciseState} setState={setExerciseState} darkMode={darkMode} difficulty={difficulty} onComplete={onComplete} onExit={onExit} />;
  }
  return null;
}

function FillBlankExercise({ state, setState, darkMode, difficulty, onComplete, onExit }) {
  const questions = exerciseData['fill-blank'].questions.filter(q => q.difficulty === difficulty);
  const currentQuestion = questions[state.currentQ];

  const handleSubmit = () => {
    const isCorrect = state.userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase();
    setState({ ...state, showResult: true, isCorrect, score: state.score + (isCorrect ? 75 : 0) });
  };

  const handleNext = () => {
    if (state.currentQ < questions.length - 1) {
      setState({ currentQ: state.currentQ + 1, score: state.score, userAnswer: '', showResult: false, isCorrect: false });
    } else {
      onComplete(state.score);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-cyan-50 to-blue-50'} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}>
          <div className="flex justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Fill in Blank</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{difficulty} • Q{state.currentQ + 1}/{questions.length}</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{state.score}</p>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-700' : 'bg-cyan-50'} rounded-xl p-6 mb-6`}>
            <p className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentQuestion.verse}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentQuestion.reference}</p>
          </div>

          {!state.showResult ? (
            <>
              <input type="text" value={state.userAnswer} onChange={(e) => setState({ ...state, userAnswer: e.target.value })} placeholder="Your answer..." className={`w-full px-4 py-3 rounded-lg border mb-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
              <div className="flex gap-3">
                <button onClick={handleSubmit} className="flex-1 bg-cyan-600 text-white py-3 rounded-lg font-bold">Submit</button>
                <button onClick={onExit} className={`px-6 py-3 rounded-lg font-bold ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Exit</button>
              </div>
            </>
          ) : (
            <>
              <div className={`rounded-xl p-6 mb-4 ${state.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`text-xl font-bold ${state.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {state.isCorrect ? '✓ Correct! +75 pts' : '✗ Incorrect'}
                </p>
                <p className={state.isCorrect ? 'text-green-700' : 'text-red-700'}>Answer: <strong>{currentQuestion.answer}</strong></p>
              </div>
              <button onClick={handleNext} className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold">
                {state.currentQ < questions.length - 1 ? 'Next' : 'Finish'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StorySequenceExercise({ state, setState, darkMode, difficulty, onComplete, onExit }) {
  const stories = exerciseData['story-sequence'].stories.filter(s => s.difficulty === difficulty);
  const currentStory = stories[state.currentStory];

  const handleNext = () => {
    if (state.currentStory < stories.length - 1) {
      const nextStory = stories[state.currentStory + 1];
      setState({
        currentStory: state.currentStory + 1,
        score: state.score,
        shuffledEvents: [...nextStory.events].sort(() => Math.random() - 0.5),
        selectedOrder: [],
        showResult: false,
        isCorrect: false
      });
    } else {
      onComplete(state.score);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-orange-50'} p-4`}>
      <div className="max-w-3xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}>
          <div className="flex justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Story Sequencing</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{difficulty} • Story {state.currentStory + 1}/{stories.length}</p>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>{state.score}</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-700' : 'bg-amber-50'} rounded-xl p-6 mb-6`}>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentStory.title}</h3>
          </div>

          {!state.showResult ? (
            <>
              {state.selectedOrder.length > 0 && (
                <div className="mb-4">
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Order:</p>
                  <div className="space-y-2">
                    {state.selectedOrder.map((event, i) => (
                      <div key={i} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-amber-100'}`}>
                        <span className="font-bold text-amber-600">{i + 1}.</span> {event}
                        <button onClick={() => {
                          const newOrder = [...state.selectedOrder];
                          newOrder.splice(i, 1);
                          setState({ ...state, selectedOrder: newOrder });
                        }} className="float-right text-red-600"><X className="w-5 h-5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Available:</p>
                <div className="space-y-2">
                  {state.shuffledEvents.filter(e => !state.selectedOrder.includes(e)).map((event, i) => (
                    <button key={i} onClick={() => setState({ ...state, selectedOrder: [...state.selectedOrder, event] })} className={`w-full text-left p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {event}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => {
                  const isCorrect = JSON.stringify(state.selectedOrder) === JSON.stringify(currentStory.events);
                  setState({ ...state, showResult: true, isCorrect, score: state.score + (isCorrect ? 100 : 0) });
                }} disabled={state.selectedOrder.length !== currentStory.events.length} className={`flex-1 py-3 rounded-lg font-bold ${state.selectedOrder.length === currentStory.events.length ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                  Submit
                </button>
                <button onClick={onExit} className={`px-6 py-3 rounded-lg font-bold ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Exit</button>
              </div>
            </>
          ) : (
            <>
              <div className={`rounded-xl p-6 mb-4 ${state.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`text-xl font-bold ${state.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {state.isCorrect ? '✓ Correct! +100 pts' : '✗ Incorrect'}
                </p>
              </div>
              <button onClick={handleNext} className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold">
                {state.currentStory < stories.length - 1 ? 'Next Story' : 'Finish'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NumberMemoryExercise({ state, setState, darkMode, difficulty, onComplete, onExit }) {
  const questions = exerciseData['number-memory'].questions.filter(q => q.difficulty === difficulty);
  const currentQuestion = questions[state.currentQ];

  const handleNext = () => {
    if (state.currentQ < questions.length - 1) {
      setState({ currentQ: state.currentQ + 1, score: state.score, userAnswer: '', showResult: false, isCorrect: false });
    } else {
      onComplete(state.score);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-violet-50'} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}>
          <div className="flex justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Number Memory</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{difficulty} • Q{state.currentQ + 1}/{questions.length}</p>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{state.score}</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-xl p-6 mb-6`}>
            <p className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentQuestion.question}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentQuestion.reference}</p>
          </div>

          {!state.showResult ? (
            <>
              <input type="text" value={state.userAnswer} onChange={(e) => setState({ ...state, userAnswer: e.target.value })} placeholder="Number..." className={`w-full px-4 py-3 rounded-lg border mb-4 text-center text-2xl font-bold ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
              <div className="flex gap-3">
                <button onClick={() => {
                  const isCorrect = state.userAnswer.trim() === currentQuestion.answer;
                  setState({ ...state, showResult: true, isCorrect, score: state.score + (isCorrect ? 85 : 0) });
                }} className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-bold">Submit</button>
                <button onClick={onExit} className={`px-6 py-3 rounded-lg font-bold ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>Exit</button>
              </div>
            </>
          ) : (
            <>
              <div className={`rounded-xl p-6 mb-4 ${state.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`text-xl font-bold ${state.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {state.isCorrect ? '✓ Correct! +85 pts' : '✗ Incorrect'}
                </p>
                <p className={state.isCorrect ? 'text-green-700' : 'text-red-700'}>Answer: <strong>{currentQuestion.answer}</strong></p>
              </div>
              <button onClick={handleNext} className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold">
                {state.currentQ < questions.length - 1 ? 'Next' : 'Finish'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
