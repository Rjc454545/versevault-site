🎉 PERFECT! NOW THE BIG ONE - YOUR COMPLETE APP!

FILE 8: src/App.jsx (THE ENTIRE VERSEVAULT APP!)
⚠️ THIS IS A LARGE FILE - About 2000 lines of code!
Don't worry - just copy and paste it all!

Click: "Add file" → "Create new file"
File name: src/App.jsx
Paste ALL of this code:
jsximport React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  BookOpen, Trophy, Flame, CheckCircle2, Settings, 
  LogOut, Home, Award, Menu, X, Sun, Moon, 
  HelpCircle, Info, ChevronRight, Star, Lock,
  User, Mail, Key, Eye, EyeOff, Search, Download
} from 'lucide-react';

// App Context
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Initialize lifetime codes
const initializeLifetimeCodes = () => {
  const codes = {};
  for (let i = 1; i <= 100; i++) {
    const codeNum = String(i).padStart(4, '0');
    codes[`VV-LIFE-2024-${codeNum}`] = {
      status: 'available',
      activatedBy: null,
      activatedDate: null,
      userId: null,
      email: null,
      deviceIds: [],
      ipAddresses: [],
      lastLogin: null,
      exercisesCompleted: 0,
      loginCount: 0,
      flags: [],
      notes: '',
      createdDate: '2024-10-14'
    };
  }
  return codes;
};

// Exercise data with complete content
const exerciseData = {
  'fill-blank': {
    questions: [
      { verse: "For God so _____ the world that he gave his one and only Son", answer: "loved", reference: "John 3:16" },
      { verse: "I can do all things through _____ who strengthens me", answer: "Christ", reference: "Philippians 4:13" },
      { verse: "The Lord is my _____, I shall not want", answer: "shepherd", reference: "Psalm 23:1" },
      { verse: "Trust in the Lord with all your _____ and lean not on your own understanding", answer: "heart", reference: "Proverbs 3:5" },
      { verse: "Be strong and _____, do not be afraid", answer: "courageous", reference: "Joshua 1:9" },
      { verse: "The _____ of the Lord is the beginning of wisdom", answer: "fear", reference: "Proverbs 9:10" },
      { verse: "And we know that in all things God works for the _____ of those who love him", answer: "good", reference: "Romans 8:28" },
      { verse: "Blessed are the pure in _____, for they will see God", answer: "heart", reference: "Matthew 5:8" },
      { verse: "The Lord is my light and my _____", answer: "salvation", reference: "Psalm 27:1" },
      { verse: "For where two or three gather in my _____, there am I with them", answer: "name", reference: "Matthew 18:20" },
      { verse: "In the beginning, God created the heavens and the _____", answer: "earth", reference: "Genesis 1:1" },
      { verse: "The Lord bless you and _____ you", answer: "keep", reference: "Numbers 6:24" },
      { verse: "Ask and it will be _____ to you", answer: "given", reference: "Matthew 7:7" },
      { verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with _____, present your requests to God", answer: "thanksgiving", reference: "Philippians 4:6" },
      { verse: "I am the way and the truth and the _____", answer: "life", reference: "John 14:6" },
      { verse: "Jesus said, 'Let the little _____ come to me'", answer: "children", reference: "Matthew 19:14" },
      { verse: "Cast all your _____ on him because he cares for you", answer: "anxiety", reference: "1 Peter 5:7" },
      { verse: "For by grace you have been _____", answer: "saved", reference: "Ephesians 2:8" },
      { verse: "The fruit of the Spirit is love, joy, _____", answer: "peace", reference: "Galatians 5:22" },
      { verse: "Seek first his _____ and his righteousness", answer: "kingdom", reference: "Matthew 6:33" },
      { verse: "Come to me, all you who are weary and _____", answer: "burdened", reference: "Matthew 11:28" },
      { verse: "Therefore do not worry about tomorrow, for tomorrow will worry about _____", answer: "itself", reference: "Matthew 6:34" },
      { verse: "If we confess our sins, he is _____ and just", answer: "faithful", reference: "1 John 1:9" },
      { verse: "Love your _____ as yourself", answer: "neighbor", reference: "Mark 12:31" },
      { verse: "The _____ of man shall not live by bread alone", answer: "son", reference: "Matthew 4:4" }
    ]
  },
  'story-sequencing': {
    stories: [
      {
        title: "David and Goliath",
        steps: [
          "The Philistines and Israelites prepare for battle",
          "Goliath challenges Israel to send a champion",
          "David arrives at the camp with food for his brothers",
          "David volunteers to fight Goliath",
          "Saul offers David his armor, but David refuses",
          "David chooses five smooth stones from the stream",
          "David faces Goliath with only a sling and stones",
          "David strikes Goliath in the forehead with a stone"
        ]
      },
      {
        title: "Noah's Ark",
        steps: [
          "God sees the wickedness of mankind",
          "God tells Noah to build an ark",
          "Noah builds the ark according to God's instructions",
          "Noah gathers two of every animal",
          "Noah's family enters the ark",
          "The rain begins and floods the earth",
          "The ark floats on the waters for 40 days",
          "The waters recede and the ark rests on Mount Ararat",
          "Noah sends out a dove",
          "God makes a covenant with Noah"
        ]
      },
      {
        title: "Jesus Feeds 5000",
        steps: [
          "Jesus withdraws to a solitary place",
          "The crowds follow Jesus",
          "Evening approaches and the disciples want to send people away",
          "Jesus asks the disciples to feed the people",
          "A boy offers five loaves and two fish",
          "Jesus has the people sit down",
          "Jesus gives thanks and breaks the bread",
          "Everyone eats and is satisfied"
        ]
      },
      {
        title: "Daniel in the Lions' Den",
        steps: [
          "King Darius appoints Daniel as one of three administrators",
          "Daniel distinguishes himself and the king plans to promote him",
          "Other officials become jealous of Daniel",
          "They trick the king into making a law against prayer",
          "Daniel continues to pray three times a day",
          "Daniel is caught praying and thrown into the lions' den",
          "God sends an angel to shut the lions' mouths",
          "Daniel is found unharmed",
          "The king has Daniel's accusers thrown to the lions",
          "King Darius writes a decree honoring God"
        ]
      },
      {
        title: "The Good Samaritan",
        steps: [
          "A man travels from Jerusalem to Jericho",
          "Robbers attack him, strip him, and beat him",
          "A priest sees him but passes by on the other side",
          "A Levite also passes by without helping",
          "A Samaritan sees him and takes pity",
          "The Samaritan bandages his wounds",
          "He puts the man on his donkey",
          "He takes him to an inn and cares for him",
          "The Samaritan gives money to the innkeeper",
          "Jesus asks 'Which was a neighbor to him?'"
        ]
      },
      {
        title: "Moses and the Red Sea",
        steps: [
          "Pharaoh finally lets the Israelites leave Egypt",
          "God leads them by a pillar of cloud and fire",
          "Pharaoh changes his mind and pursues with his army",
          "The Israelites are trapped between the army and the sea",
          "Moses stretches out his hand over the sea",
          "God divides the waters with a strong east wind",
          "The Israelites walk through on dry ground",
          "The Egyptians pursue them into the sea",
          "God causes the waters to return",
          "The Egyptian army is destroyed"
        ]
      },
      {
        title: "The Prodigal Son",
        steps: [
          "A man has two sons",
          "The younger son asks for his inheritance",
          "The son travels to a distant country",
          "He squanders his wealth in wild living",
          "A severe famine strikes the land",
          "He ends up feeding pigs and is starving",
          "He decides to return home",
          "While still far off, his father sees him",
          "The father runs to embrace and kiss him",
          "They celebrate with a feast"
        ]
      },
      {
        title: "Jonah and the Great Fish",
        steps: [
          "God tells Jonah to go to Nineveh",
          "Jonah runs away and boards a ship",
          "A violent storm threatens the ship",
          "The sailors discover Jonah is running from God",
          "Jonah tells them to throw him overboard",
          "They throw Jonah into the sea",
          "The storm stops immediately",
          "God provides a great fish to swallow Jonah",
          "Jonah prays from inside the fish",
          "The fish vomits Jonah onto dry land"
        ]
      },
      {
        title: "The Birth of Jesus",
        steps: [
          "Caesar Augustus orders a census",
          "Joseph and Mary travel to Bethlehem",
          "They arrive but find no room at the inn",
          "Mary gives birth to Jesus",
          "She wraps him in cloths and lays him in a manger",
          "Angels appear to shepherds in the fields",
          "The angels announce Jesus' birth",
          "The shepherds go to Bethlehem",
          "They find Mary, Joseph, and baby Jesus",
          "The shepherds spread the word"
        ]
      },
      {
        title: "Zacchaeus Meets Jesus",
        steps: [
          "Jesus enters Jericho",
          "Zacchaeus, a wealthy tax collector, wants to see Jesus",
          "He is too short to see over the crowd",
          "He runs ahead and climbs a sycamore tree",
          "Jesus reaches the spot and looks up",
          "Jesus tells Zacchaeus to come down",
          "Jesus says he must stay at Zacchaeus's house",
          "People grumble that Jesus is going to a sinner's house",
          "Zacchaeus stands and promises to give half his possessions to the poor",
          "Jesus declares salvation has come to this house"
        ]
      },
      {
        title: "The Resurrection",
        steps: [
          "Jesus is crucified and buried",
          "A stone is rolled in front of the tomb",
          "Guards are posted at the tomb",
          "Early Sunday morning, women go to the tomb",
          "They find the stone rolled away",
          "An angel tells them Jesus has risen",
          "The women run to tell the disciples",
          "Peter and John run to the tomb",
          "They find the tomb empty",
          "Jesus appears to Mary Magdalene"
        ]
      },
      {
        title: "The Tower of Babel",
        steps: [
          "All people speak one language",
          "They settle in the land of Shinar",
          "They decide to build a city and tower",
          "They want to make a name for themselves",
          "They begin building with brick and tar",
          "The Lord comes down to see the city",
          "God says nothing will be impossible for them",
          "God confuses their language",
          "People can no longer understand each other",
          "They stop building and scatter across the earth"
        ]
      },
      {
        title: "Jesus Walks on Water",
        steps: [
          "Jesus makes disciples get into the boat",
          "He dismisses the crowd",
          "Jesus goes up on a mountainside to pray",
          "The boat is far from land, buffeted by waves",
          "During the fourth watch, Jesus walks on the lake",
          "The disciples see him and are terrified",
          "Jesus says 'Take courage! It is I. Don't be afraid'",
          "Peter asks to come to Jesus on the water",
          "Peter walks on water toward Jesus",
          "Peter becomes afraid and begins to sink"
        ]
      },
      {
        title: "The Calling of the Disciples",
        steps: [
          "Jesus walks beside the Sea of Galilee",
          "He sees Simon and Andrew casting a net",
          "Jesus calls them to follow him",
          "They immediately leave their nets",
          "Jesus continues and sees James and John",
          "They are in a boat with their father",
          "Jesus calls them",
          "They leave the boat and their father",
          "They all follow Jesus",
          "Jesus begins teaching and healing"
        ]
      },
      {
        title: "The Healing of the Paralytic",
        steps: [
          "Jesus returns to Capernaum",
          "Word spreads that Jesus is at a house",
          "So many people gather that there's no room",
          "Four men bring a paralytic on a mat",
          "They cannot get through the crowd",
          "They make an opening in the roof",
          "They lower the paralytic down to Jesus",
          "Jesus sees their faith",
          "Jesus tells the man his sins are forgiven",
          "Jesus heals the man and he walks"
        ]
      }
    ]
  },
  'number-memory': {
    questions: [
      { question: "How many disciples did Jesus have?", answer: "12", hint: "They were his closest followers" },
      { question: "How many days did God take to create the world?", answer: "6", hint: "He rested on the seventh" },
      { question: "How many plagues did God send on Egypt?", answer: "10", hint: "Before Pharaoh let the people go" },
      { question: "How many commandments did God give Moses?", answer: "10", hint: "Written on stone tablets" },
      { question: "How many books are in the New Testament?", answer: "27", hint: "From Matthew to Revelation" },
      { question: "How many days and nights did it rain during the flood?", answer: "40", hint: "Noah was in the ark" },
      { question: "How many brothers did Joseph have?", answer: "11", hint: "Plus his two half-brothers makes 13 total" },
      { question: "How many days did Jesus fast in the wilderness?", answer: "40", hint: "He was tempted by Satan" },
      { question: "How many people were saved in the ark?", answer: "8", hint: "Noah, his wife, his sons, and their wives" },
      { question: "How many loaves of bread did Jesus use to feed 5000?", answer: "5", hint: "Plus two fish" },
      { question: "How many years did the Israelites wander in the wilderness?", answer: "40", hint: "Before entering the Promised Land" },
      { question: "How many books are in the Old Testament?", answer: "39", hint: "From Genesis to Malachi" },
      { question: "How many sons did Jacob have?", answer: "12", hint: "They became the twelve tribes of Israel" },
      { question: "How many chapters are in the book of Psalms?", answer: "150", hint: "The longest book in the Bible" },
      { question: "How many days did it rain during Noah's flood?", answer: "40", hint: "Same as Jesus' time in the wilderness" },
      { question: "How old was Jesus when he began his ministry?", answer: "30", hint: "He was baptized by John" },
      { question: "How many people did Jesus feed with loaves and fish?", answer: "5000", hint: "Plus women and children" },
      { question: "How many times did Peter deny Jesus?", answer: "3", hint: "Before the rooster crowed" },
      { question: "How many days after his resurrection did Jesus ascend to heaven?", answer: "40", hint: "He appeared to many" },
      { question: "How many apostles were there after Judas was replaced?", answer: "12", hint: "Matthias was chosen" },
      { question: "How many people did Jesus raise from the dead?", answer: "3", hint: "Including Lazarus" },
      { question: "How many fruits of the Spirit are there?", answer: "9", hint: "Love, joy, peace..." },
      { question: "How many wise men visited Jesus?", answer: "3", hint: "They brought gold, frankincense, and myrrh" },
      { question: "How many days was Lazarus in the tomb?", answer: "4", hint: "Before Jesus raised him" },
      { question: "How many times should we forgive?", answer: "490", hint: "Seventy times seven" }
    ]
  }
};

// Main App Component
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [userProgress, setUserProgress] = useState({
    points: 0,
    streak: 0,
    exercisesCompleted: 0,
    versesMemorized: 0,
    lastLoginDate: null
  });
  const [lifetimeCodes, setLifetimeCodes] = useState(() => {
    const saved = localStorage.getItem('lifetimeCodes');
    return saved ? JSON.parse(saved) : initializeLifetimeCodes();
  });
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Save lifetime codes to localStorage
  useEffect(() => {
    localStorage.setItem('lifetimeCodes', JSON.stringify(lifetimeCodes));
  }, [lifetimeCodes]);

  // Load user data
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      const savedProgress = localStorage.getItem(`progress_${user.email}`);
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
      setCurrentScreen('dashboard');
    }
  }, []);

  // Save user progress
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`progress_${currentUser.email}`, JSON.stringify(userProgress));
    }
  }, [userProgress, currentUser]);

  const contextValue = {
    currentUser,
    setCurrentUser,
    currentScreen,
    setCurrentScreen,
    userProgress,
    setUserProgress,
    lifetimeCodes,
    setLifetimeCodes,
    darkMode,
    setDarkMode,
    fontSize,
    setFontSize,
    showTutorial,
    setShowTutorial,
    showHelp,
    setShowHelp,
    exerciseData
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'}`}>
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'login' && <LoginScreen />}
        {currentScreen === 'register' && <RegisterScreen />}
        {currentScreen === 'lifetime-code' && <LifetimeCodeScreen />}
        {currentScreen === 'dashboard' && <DashboardScreen />}
        {currentScreen === 'exercises' && <ExercisesScreen />}
        {currentScreen === 'exercise-play' && <ExercisePlayScreen />}
        {currentScreen === 'achievements' && <AchievementsScreen />}
        {currentScreen === 'settings' && <SettingsScreen />}
        {currentScreen === 'admin' && <AdminScreen />}
      </div>
    </AppContext.Provider>
  );
}

// Splash Screen
function SplashScreen() {
  const { setCurrentScreen } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <BookOpen className="w-24 h-24 mx-auto text-white mb-4" />
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">VerseVault</h1>
          <p className="text-2xl text-purple-100 italic">Hide God's Word in Your Heart</p>
          <p className="text-lg text-purple-200 mt-2">Psalm 119:11</p>
        </div>
        <div className="mb-6">
          <p className="text-white text-lg mb-1">Building On The Faith Ministry</p>
          <p className="text-purple-200">Founded by Robert Chalk Jr.</p>
        </div>
        <button
          onClick={() => setCurrentScreen('login')}
          className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Login Screen
function LoginScreen() {
  const { setCurrentScreen, setCurrentUser, lifetimeCodes } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentScreen('dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <BookOpen className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
          >
            Sign In
          </button>

          <button
            onClick={() => setCurrentScreen('register')}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-lg"
          >
            Create Free Account
          </button>

          <button
            onClick={() => setCurrentScreen('lifetime-code')}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            I Have a Lifetime Code
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentScreen('admin')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
}

// Register Screen
function RegisterScreen() {
  const { setCurrentScreen, setCurrentUser } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      setError('Email already registered');
      return;
    }

    const newUser = {
      email,
      password,
      accountType: 'free',
      createdDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <BookOpen className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Start your faith journey today</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
          >
            Create Account
          </button>

          <button
            onClick={() => setCurrentScreen('login')}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

// Lifetime Code Screen
function LifetimeCodeScreen() {
  const { setCurrentScreen, setCurrentUser, lifetimeCodes, setLifetimeCodes } = useAppContext();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const validateCode = () => {
    const codeData = lifetimeCodes[code];
    if (!codeData) {
      setError('Invalid code');
      return;
    }
    if (codeData.status !== 'available') {
      setError('This code has already been used');
      return;
    }
    setStep(2);
    setError('');
  };

  const activateCode = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      setError('Email already registered');
      return;
    }

    const newUser = {
      email,
      password,
      accountType: 'lifetime',
      lifetimeCode: code,
      createdDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const updatedCodes = { ...lifetimeCodes };
    updatedCodes[code] = {
      ...updatedCodes[code],
      status: 'active',
      activatedBy: email,
      activatedDate: new Date().toISOString(),
      email: email
    };
    setLifetimeCodes(updatedCodes);

    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Star className="w-16 h-16 mx-auto text-amber-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Lifetime Access</h2>
          <p className="text-gray-600 mt-2">Enter your promotional code</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Lifetime Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none text-center text-xl font-mono"
                placeholder="VV-LIFE-2024-0001"
                maxLength={19}
              />
            </div>

            <button
              onClick={validateCode}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Validate Code
            </button>

            <button
              onClick={() => setCurrentScreen('login')}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back to Login
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-green-700 font-semibold">✓ Code Valid!</p>
              <p className="text-green-600 text-sm">Create your account to activate</p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={activateCode}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Activate Lifetime Access
            </button>

            <button
              onClick={() => { setStep(1); setError(''); }}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Dashboard Screen
function DashboardScreen() {
  const { currentUser, userProgress, setCurrentScreen, darkMode, setShowTutorial, setShowHelp } = useAppContext();

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(`tutorial_seen_${currentUser.email}`);
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      localStorage.setItem(`tutorial_seen_${currentUser.email}`, 'true');
    }
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} pb-20`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BookOpen className={`w-12 h-12 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <h1 className={`text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  VerseVault
                </h1>
                <p className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentUser.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(true)}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section with Yellow/Orange Border */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border-4 border-amber-400 shadow-xl">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Welcome Back!
          </h2>
          <p className="text-xl text-amber-800">
            Let's strengthen your faith and memory today
          </p>
          {currentUser.accountType === 'lifetime' && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">Lifetime Member</span>
            </div>
          )}
        </div>

        {/* Stats Cards with Yellow Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-4 border-yellow-400`}>
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-12 h-12 text-amber-500" />
              <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {userProgress.points}
              </span>
            </div>
            <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Points</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-4 border-yellow-400`}>
            <div className="flex items-center justify-between mb-4">
              <Flame className="w-12 h-12 text-orange-500" />
              <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {userProgress.streak}
              </span>
            </div>
            <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Day Streak</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-4 border-yellow-400`}>
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {userProgress.exercisesCompleted}
              </span>
            </div>
            <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Exercises Done</p>
          </div>
        </div>

        {/* Action Cards with Yellow Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setCurrentScreen('exercises')}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-purple-50'} rounded-2xl p-8 shadow-xl border-4 border-yellow-400 transition-all text-left group`}
          >
            <BookOpen className="w-16 h-16 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Memory Exercises
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Practice scripture memorization and cognitive exercises
            </p>
            <div className="mt-4 flex items-center gap-2 text-purple-600 font-semibold">
              <span>Start Practicing</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={() => setCurrentScreen('achievements')}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'} rounded-2xl p-8 shadow-xl border-4 border-yellow-400 transition-all text-left group`}
          >
            <Award className="w-16 h-16 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Achievements
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              View your badges and milestones
            </p>
            <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold">
              <span>View Progress</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Upgrade Banner for Free Users with Yellow Border */}
        {currentUser.accountType === 'free' && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl border-4 border-yellow-400">
            <h3 className="text-2xl font-bold mb-2">Unlock All 20 Exercises</h3>
            <p className="text-purple-100 mb-4">
              Upgrade to Premium for full access to all memory exercises, achievements, and more!
            </p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all">
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>

      <TutorialModal />
      <HelpModal />
      <BottomNav />
    </div>
  );
}

// Tutorial Modal
function TutorialModal() {
  const { showTutorial, setShowTutorial, darkMode } = useAppContext();
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    {
      icon: <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />,
      title: "Welcome to VerseVault! 📖",
      description: "Hide God's Word in your heart through fun memory exercises designed for all ages."
    },
    {
      icon: <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />,
      title: "Earn Points & Badges 🏆",
      description: "Complete exercises to earn points, maintain daily streaks, and unlock achievement badges!"
    },
    {
      icon: <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />,
      title: "Three Exercise Types ✅",
      description: "Fill in the Blank, Story Sequencing, and Number Memory - each helps strengthen your faith!"
    },
    {
      icon: <Settings className="w-16 h-16 text-blue-500 mx-auto mb-4" />,
      title: "Customize Your Experience ⚙️",
      description: "Adjust font size, enable dark mode, and personalize settings for comfortable reading."
    },
    {
      icon: <Star className="w-16 h-16 text-amber-600 mx-auto mb-4" />,
      title: "Let's Get Started! 🚀",
      description: "Click 'Memory Exercises' on the dashboard to begin your journey!"
    }
  ];

  if (!showTutorial) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 max-w-lg w-full shadow-2xl`}>
        {tutorialSteps[step].icon}
        <h2 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {tutorialSteps[step].title}
        </h2>
        <p className={`text-xl text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {tutorialSteps[step].description}
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === step ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          {step < tutorialSteps.length - 1 ? (
            <>
              <button
                onClick={() => setShowTutorial(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Skip
              </button>
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Next
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowTutorial(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Get Started!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Help Modal
function HelpModal() {
  const { showHelp, setShowHelp, darkMode } = useAppContext();

  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            How to Use VerseVault 📖
          </h2>
          <button
            onClick={() => setShowHelp(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🎮 Fill in the Blank
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              Read the Bible verse and type the missing word. Great for memorizing key scriptures!
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              📚 Story Sequencing
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              Arrange Bible story events in the correct order. Tap and drag to reorder!
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🔢 Number Memory
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              Test your knowledge of Biblical numbers. How many disciples? How many plagues?
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🏆 Points & Achievements
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              Earn points for correct answers! Unlock badges by reaching milestones and maintaining streaks.
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              ⚙️ Settings
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              Customize font size, toggle dark mode, and adjust preferences in the Settings tab.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowHelp(false)}
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Got It!
        </button>
      </div>
    </div>
  );
}

// Exercises Screen
function ExercisesScreen() {
  const { setCurrentScreen, currentUser, darkMode } = useAppContext();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const exercises = [
    { id: 'fill-blank', name: 'Fill in the Blank', gradient: 'from-cyan-400 to-blue-500', icon: '📝', points: 75, locked: false },
    { id: 'story-sequencing', name: 'Story Sequencing', gradient: 'from-amber-400 to-orange-500', icon: '📚', points: 100, locked: false },
    { id: 'number-memory', name: 'Number Memory', gradient: 'from-purple-400 to-violet-500', icon: '🔢', points: 85, locked: false },
    { id: 'bible-stories', name: 'Bible Stories', gradient: 'from-rose-400 to-pink-500', icon: '📖', points: 100, locked: currentUser.accountType === 'free' },
    { id: 'verse-recall', name: 'Verse Recall', gradient: 'from-blue-400 to-indigo-500', icon: '💭', points: 100, locked: currentUser.accountType === 'free' },
    { id: 'pattern-recognition', name: 'Pattern Recognition', gradient: 'from-purple-400 to-pink-500', icon: '🧩', points: 100, locked: currentUser.accountType === 'free' },
    { id: 'word-sequence', name: 'Word Sequence', gradient: 'from-green-400 to-emerald-500', icon: '🔤', points: 100, locked: currentUser.accountType === 'free' },
    { id: 'quick-match', name: 'Quick Match', gradient: 'from-orange-400 to-red-500', icon: '⚡', points: 150, locked: currentUser.accountType === 'free' },
  ];

  const handleExerciseClick = (exercise) => {
    if (exercise.locked) {
      alert('Upgrade to Premium or use a Lifetime Code to unlock all exercises!');
      return;
    }
    setSelectedExercise(exercise);
    localStorage.setItem('currentExercise', JSON.stringify(exercise));
    setCurrentScreen('exercise-play');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} pb-20`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Memory Exercises
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => handleExerciseClick(exercise)}
              className={`relative bg-gradient-to-br ${exercise.gradient} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-left group ${
                exercise.locked ? 'opacity-60' : ''
              }`}
            >
              {exercise.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="text-5xl mb-4">{exercise.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {exercise.name}
              </h3>
              <div className="flex items-center gap-2 text-white">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">{exercise.points} points</span>
              </div>
              {!exercise.locked && (
                <div className="mt-4 flex items-center gap-2 text-white font-semibold">
                  <span>Start Exercise</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// Exercise Play Screen
function ExercisePlayScreen() {
  const { setCurrentScreen, userProgress, setUserProgress, darkMode, exerciseData } = useAppContext();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Story sequencing state
  const [currentStory, setCurrentStory] = useState(0);
  const [storySteps, setStorySteps] = useState([]);
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('currentExercise');
    if (saved) {
      const exercise = JSON.parse(saved);
      setCurrentExercise(exercise);
      
      if (exercise.id === 'story-sequencing') {
        const story = exerciseData['story-sequencing'].stories[0];
        const shuffled = [...story.steps].sort(() => Math.random() - 0.5);
        setStorySteps(shuffled);
        setUserOrder(shuffled.map((_, i) => i));
      }
    }
  }, []);

  const handleSubmit = () => {
    if (!currentExercise) return;

    let correct = false;
    let pointsEarned = 0;

    if (currentExercise.id === 'fill-blank') {
      const correctAnswer = exerciseData['fill-blank'].questions[currentQuestion].answer.toLowerCase();
      correct = userAnswer.toLowerCase().trim() === correctAnswer;
      pointsEarned = correct ? 75 : 0;
    } else if (currentExercise.id === 'number-memory') {
      const correctAnswer = exerciseData['number-memory'].questions[currentQuestion].answer;
      correct = userAnswer.trim() === correctAnswer;
      pointsEarned = correct ? 85 : 0;
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + pointsEarned);
      setUserProgress({
        ...userProgress,
        points: userProgress.points + pointsEarned,
        exercisesCompleted: userProgress.exercisesCompleted + 1
      });
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setUserAnswer('');
    
    if (currentExercise.id === 'fill-blank') {
      if (currentQuestion < exerciseData['fill-blank'].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert(`Exercise Complete! You earned ${score} points!`);
        setCurrentScreen('exercises');
      }
    } else if (currentExercise.id === 'number-memory') {
      if (currentQuestion < exerciseData['number-memory'].questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert(`Exercise Complete! You earned ${score} points!`);
        setCurrentScreen('exercises');
      }
    }
  };

  const handleStoryCheck = () => {
    const currentStoryData = exerciseData['story-sequencing'].stories[currentStory];
    const correctOrder = currentStoryData.steps;
    const userStoryOrder = userOrder.map(index => storySteps[index]);
    
    const correct = JSON.stringify(userStoryOrder) === JSON.stringify(correctOrder);
    
    if (correct) {
      const pointsEarned = 100;
      setScore(score + pointsEarned);
      setUserProgress({
        ...userProgress,
        points: userProgress.points + pointsEarned,
        exercisesCompleted: userProgress.exercisesCompleted + 1
      });
      
      if (currentStory < exerciseData['story-sequencing'].stories.length - 1) {
        alert('Correct! Moving to next story...');
        const nextStoryData = exerciseData['story-sequencing'].stories[currentStory + 1];
        const shuffled = [...nextStoryData.steps].sort(() => Math.random() - 0.5);
        setStorySteps(shuffled);
        setUserOrder(shuffled.map((_, i) => i));
        setCurrentStory(currentStory + 1);
      } else {
        alert(`All Stories Complete! You earned ${score + pointsEarned} total points!`);
        setCurrentScreen('exercises');
      }
    } else {
      alert('Not quite right. Try again!');
    }
  };

  const moveStep = (index, direction) => {
    const newOrder = [...userOrder];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < newOrder.length) {
      [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
      setUserOrder(newOrder);
    }
  };

  if (!currentExercise) return null;

  const exerciseInstructions = {
    'fill-blank': {
      title: "How to Play Fill in the Blank",
      steps: [
        "Read the Bible verse carefully",
        "Think about which word is missing",
        "Type your answer in the box",
        "Click 'Submit' to check if you're correct",
        "Earn 75 points for each correct answer!"
      ]
    },
    'story-sequencing': {
      title: "How to Play Story Sequencing",
      steps: [
        "Read all the story events carefully",
        "Use ⬆️ and ⬇️ buttons to reorder events",
        "Arrange them in the correct chronological order",
        "Click 'Check Order' when you think it's right",
        "Earn 100 points for each correctly ordered story!"
      ]
    },
    'number-memory': {
      title: "How to Play Number Memory",
      steps: [
        "Read the Biblical question",
        "Think about the correct number",
        "Type just the number (no words)",
        "Click 'Submit' to check your answer",
        "Earn 85 points for each correct answer!"
      ]
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} pb-20`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentScreen('exercises')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {currentExercise.name}
                </h1>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Score: {score} points
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInstructions(true)}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentExercise.id === 'fill-blank' && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl`}>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Question {currentQuestion + 1} of {exerciseData['fill-blank'].questions.length}
                </span>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl mb-6">
                <p className="text-2xl text-gray-800 mb-2">
                  {exerciseData['fill-blank'].questions[currentQuestion].verse}
                </p>
                <p className="text-sm text-gray-600 italic">
                  {exerciseData['fill-blank'].questions[currentQuestion].reference}
                </p>
              </div>
            </div>

            {!showResult ? (
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none mb-4"
                  placeholder="Type the missing word..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div>
                <div className={`p-6 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                  <p className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  {!isCorrect && (
                    <p className="text-lg text-gray-700">
                      The correct answer was: <strong>{exerciseData['fill-blank'].questions[currentQuestion].answer}</strong>
                    </p>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                >
                  {currentQuestion < exerciseData['fill-blank'].questions.length - 1 ? 'Next Question' : 'Complete Exercise'}
                </button>
              </div>
            )}
          </div>
        )}

        {currentExercise.id === 'story-sequencing' && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl`}>
            <div className="mb-6">
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {exerciseData['story-sequencing'].stories[currentStory].title}
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Story {currentStory + 1} of {exerciseData['story-sequencing'].stories.length}
              </p>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                Arrange the events in the correct order using the arrow buttons
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {userOrder.map((stepIndex, orderIndex) => (
                <div
                  key={orderIndex}
                  className="flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl"
                >
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => moveStep(orderIndex, -1)}
                      disabled={orderIndex === 0}
                      className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ⬆️
                    </button>
                    <button
                      onClick={() => moveStep(orderIndex, 1)}
                      disabled={orderIndex === userOrder.length - 1}
                      className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ⬇️
                    </button>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-amber-800 mr-2">{orderIndex + 1}.</span>
                    <span className="text-lg text-gray-800">{storySteps[stepIndex]}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStoryCheck}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-lg text-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Check Order
            </button>
          </div>
        )}

        {currentExercise.id === 'number-memory' && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl`}>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Question {currentQuestion + 1} of {exerciseData['number-memory'].questions.length}
                </span>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl mb-6">
                <p className="text-2xl text-gray-800 mb-4">
                  {exerciseData['number-memory'].questions[currentQuestion].question}
                </p>
                <p className="text-sm text-gray-600 italic">
                  💡 Hint: {exerciseData['number-memory'].questions[currentQuestion].hint}
                </p>
              </div>
            </div>

            {!showResult ? (
              <div>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none mb-4"
                  placeholder="Enter the number..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div>
                <div className={`p-6 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                  <p className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  {!isCorrect && (
                    <p className="text-lg text-gray-700">
                      The correct answer was: <strong>{exerciseData['number-memory'].questions[currentQuestion].answer}</strong>
                    </p>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg"
                >
                  {currentQuestion < exerciseData['number-memory'].questions.length - 1 ? 'Next Question' : 'Complete Exercise'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 max-w-lg w-full shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {exerciseInstructions[currentExercise.id].title}
              </h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ol className="space-y-3">
              {exerciseInstructions[currentExercise.id].steps.map((step, index) => (
                <li key={index} className={`flex gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                  <span className="font-bold text-purple-600">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={() => setShowInstructions(false)}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Achievements Screen
function AchievementsScreen() {
  const { setCurrentScreen, userProgress, darkMode } = useAppContext();

  const achievements = [
    { name: 'First Steps', description: 'Complete your first exercise', points: 100, unlocked: userProgress.exercisesCompleted >= 1, icon: '🎯' },
    { name: 'Point Collector', description: 'Earn 1000 points', points: 1000, unlocked: userProgress.points >= 1000, icon: '💰' },
    { name: 'Week Warrior', description: 'Maintain a 7-day streak', points: 7, unlocked: userProgress.streak >= 7, icon: '🔥' },
    { name: 'Dedicated Disciple', description: 'Complete 10 exercises', points: 10, unlocked: userProgress.exercisesCompleted >= 10, icon: '⭐' },
    { name: 'Memory Master', description: 'Memorize 25 verses', points: 25, unlocked: userProgress.versesMemorized >= 25, icon: '📖' },
    { name: 'Perfect Score', description: 'Get a perfect score on any exercise', points: 1, unlocked: false, icon: '💯' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} pb-20`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Achievements
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl ${
                achievement.unlocked ? 'border-4 border-amber-400' : 'opacity-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">Unlocked!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Lock className="w-5 h-5" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// Settings Screen
function SettingsScreen() {
  const { 
    setCurrentScreen, 
    currentUser, 
    setCurrentUser, 
    darkMode, 
    setDarkMode,
    fontSize,
    setFontSize,
    setShowTutorial,
    setShowHelp
  } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentScreen('splash');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} pb-20`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Settings
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl mb-6`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {currentUser.email}
              </p>
            </div>
            <div>
              <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Account Type
              </label>
              <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {currentUser.accountType === 'free' && '🆓 Free'}
                {currentUser.accountType === 'premium' && '⭐ Premium'}
                {currentUser.accountType === 'lifetime' && '🌟 Lifetime Member'}
              </p>
            </div>
            {currentUser.lifetimeCode && (
              <div>
                <label className={`block font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Lifetime Code
                </label>
                <p className={`text-lg font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {currentUser.lifetimeCode}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl mb-6`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Appearance
          </h2>
          <div className="space-y-6">
            <div>
              <label className={`block font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Theme
              </label>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                } hover:opacity-80 transition-all`}
              >
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>

            <div>
              <label className={`block font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Font Size
              </label>
              <div className="flex gap-3">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      fontSize === size
                        ? 'bg-purple-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    } hover:opacity-80 transition-all`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl mb-6`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Help & Support
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setShowTutorial(true)}
              className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
            >
              <span className="font-semibold text-blue-700">Show Tutorial</span>
              <ChevronRight className="w-5 h-5 text-blue-700" />
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all"
            >
              <span className="font-semibold text-green-700">How to Use App</span>
              <ChevronRight className="w-5 h-5 text-green-700" />
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

// Admin Screen
function AdminScreen() {
  const { setCurrentScreen, lifetimeCodes, setLifetimeCodes, darkMode } = useAppContext();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCode, setSelectedCode] = useState(null);

  const handleLogin = () => {
    if (password === 'ADMIN2024!') {
      setAuthenticated(true);
    } else {
      alert('Invalid admin password');
    }
  };

  const filteredCodes = Object.entries(lifetimeCodes).filter(([code, data]) => {
    const searchLower = searchTerm.toLowerCase();
    return code.toLowerCase().includes(searchLower) || 
           (datajsx.email && data.email.toLowerCase().includes(searchLower));
  });

  const stats = {
    total: 100,
    activated: Object.values(lifetimeCodes).filter(c => c.status === 'active').length,
    available: Object.values(lifetimeCodes).filter(c => c.status === 'available').length,
    suspended: Object.values(lifetimeCodes).filter(c => c.status === 'suspended').length
  };

  const toggleCodeStatus = (code) => {
    const updatedCodes = { ...lifetimeCodes };
    const currentStatus = updatedCodes[code].status;
    updatedCodes[code].status = currentStatus === 'active' ? 'suspended' : 'active';
    setLifetimeCodes(updatedCodes);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Settings className="w-16 h-16 mx-auto text-gray-700 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Admin Access</h2>
            <p className="text-gray-600 mt-2">Enter admin password</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-700 focus:outline-none"
              placeholder="Enter password..."
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => setCurrentScreen('login')}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} pb-20`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentScreen('login')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Admin Dashboard
                </h1>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Lifetime Code Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl`}>
            <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Codes
            </p>
            <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {stats.total}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-l-4 border-blue-500`}>
            <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Active
            </p>
            <p className={`text-4xl font-bold text-blue-600`}>
              {stats.activated}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-l-4 border-green-500`}>
            <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Available
            </p>
            <p className={`text-4xl font-bold text-green-600`}>
              {stats.available}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border-l-4 border-red-500`}>
            <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Suspended
            </p>
            <p className={`text-4xl font-bold text-red-600`}>
              {stats.suspended}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl mb-6`}>
          <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} rounded-lg focus:border-purple-500 focus:outline-none`}
              placeholder="Search by code or email..."
            />
          </div>
        </div>

        {/* Codes Table */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Code
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Activated Date
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredCodes.map(([code, data]) => (
                  <tr key={code} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className={`px-6 py-4 font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {code}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        data.status === 'available' ? 'bg-green-100 text-green-800' :
                        data.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {data.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {data.email || '-'}
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {data.activatedDate ? new Date(data.activatedDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedCode({ code, data })}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-all"
                        >
                          View
                        </button>
                        {data.status !== 'available' && (
                          <button
                            onClick={() => toggleCodeStatus(code)}
                            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                              data.status === 'active' 
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {data.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Code Details Modal */}
      {selectedCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 max-w-2xl w-full shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Code Details
              </h2>
              <button
                onClick={() => setSelectedCode(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Code
                </label>
                <p className={`font-mono text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCode.code}
                </p>
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedCode.data.status === 'available' ? 'bg-green-100 text-green-800' :
                  selectedCode.data.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedCode.data.status}
                </span>
              </div>

              {selectedCode.data.email && (
                <>
                  <div>
                    <label className={`block font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Activated By
                    </label>
                    <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedCode.data.email}
                    </p>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Activation Date
                    </label>
                    <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(selectedCode.data.activatedDate).toLocaleString()}
                    </p>
                  </div>
                </>
              )}

              <div>
                <label className={`block font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Created Date
                </label>
                <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCode.data.createdDate}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCode(null)}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Bottom Navigation
function BottomNav() {
  const { currentScreen, setCurrentScreen, darkMode } = useAppContext();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'exercises', icon: BookOpen, label: 'Exercises' },
    { id: 'achievements', icon: Award, label: 'Badges' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-purple-600 bg-purple-50'
                    : darkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
