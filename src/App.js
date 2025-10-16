import React, { useState, useEffect } from 'react';
import {
  BookOpen, Trophy, Flame, CheckCircle2, Settings,
  LogOut, Award, X, Eye, EyeOff, Shield, Activity,
  Zap, Target, Crown, ChevronRight, Star
} from 'lucide-react';

const initializeLifetimeCodes = () => {
  const codes = {};
  for (let i = 1; i <= 100; i++) {
    const code = `LIFETIME${String(i).padStart(3, '0')}`;
    codes[code] = { used: false, usedBy: null, usedAt: null };
  }
  return codes;
};

const VerseVault = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lifetimeCodes] = useState(() => initializeLifetimeCodes());
  const [enteredCode, setEnteredCode] = useState('');
  const [codeMessage, setCodeMessage] = useState('');

  const defaultUserData = {
    email: '',
    streak: 0,
    lastActive: new Date().toISOString().split('T')[0],
    xp: 0,
    level: 1,
    completedExercises: [],
    subscription: 'free',
    subscriptionExpiry: null
  };

  const [userData, setUserData] = useState(defaultUserData);

  const exercises = [
    {
      id: 1,
      title: "John 3:16 - First Word",
      verse: "For God so loved the world that he gave his one and only Son",
      reference: "John 3:16",
      difficulty: "beginner",
      type: "first-letter",
      xpReward: 10,
      locked: false
    },
    {
      id: 2,
      title: "Psalm 23:1 - Fill the Blank",
      verse: "The Lord is my shepherd, I lack nothing",
      reference: "Psalm 23:1",
      difficulty: "beginner",
      type: "fill-blank",
      xpReward: 15,
      locked: false
    },
    {
      id: 3,
      title: "Philippians 4:13 - Multiple Choice",
      verse: "I can do all things through Christ who strengthens me",
      reference: "Philippians 4:13",
      difficulty: "intermediate",
      type: "multiple-choice",
      xpReward: 20,
      locked: true,
      unlockXp: 25
    },
    {
      id: 4,
      title: "Romans 8:28 - Complete Verse",
      verse: "And we know that in all things God works for the good of those who love him",
      reference: "Romans 8:28",
      difficulty: "intermediate",
      type: "complete",
      xpReward: 25,
      locked: true,
      unlockXp: 50
    },
    {
      id: 5,
      title: "Proverbs 3:5-6 - Two Verses",
      verse: "Trust in the Lord with all your heart and lean not on your own understanding",
      reference: "Proverbs 3:5-6",
      difficulty: "advanced",
      type: "multi-verse",
      xpReward: 30,
      locked: true,
      unlockXp: 100
    }
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (userData.lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (userData.lastActive === yesterdayStr) {
        setUserData(prev => ({
          ...prev,
          streak: prev.streak + 1,
          lastActive: today
        }));
      } else {
        setUserData(prev => ({
          ...prev,
          streak: 1,
          lastActive: today
        }));
      }
    }
  }, [userData.lastActive]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsProcessing(true);

    try {
      if (authMode === 'signup') {
        const newUser = {
          ...defaultUserData,
          email: email,
          id: Date.now().toString()
        };
        setUser(newUser);
        setUserData(newUser);
        setShowAuth(false);
        setEmail('');
        setPassword('');
      } else {
        const existingUser = {
          ...defaultUserData,
          email: email,
          id: Date.now().toString()
        };
        setUser(existingUser);
        setUserData(existingUser);
        setShowAuth(false);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserData(defaultUserData);
    setShowSettings(false);
  };

  const checkAnswer = () => {
    if (!currentExercise) return;
    
    const normalizedInput = userInput.toLowerCase().trim();
    const normalizedAnswer = currentExercise.verse.split(' ')[0].toLowerCase();
    
    if (normalizedInput === normalizedAnswer) {
      setFeedback({ type: 'success', message: '🎉 Perfect! Well done!' });
      
      if (!userData.completedExercises.includes(currentExercise.id)) {
        const newXp = userData.xp + currentExercise.xpReward;
        const newLevel = Math.floor(newXp / 100) + 1;
        
        setUserData(prev => ({
          ...prev,
          xp: newXp,
          level: newLevel,
          completedExercises: [...prev.completedExercises, currentExercise.id]
        }));
      }
    } else {
      setFeedback({ type: 'error', message: 'Not quite. Try again!' });
    }
  };

  const applyLifetimeCode = () => {
    const code = enteredCode.trim().toUpperCase();
    
    if (!code) {
      setCodeMessage('Please enter a code');
      return;
    }

    if (lifetimeCodes[code]) {
      if (lifetimeCodes[code].used) {
        setCodeMessage('This code has already been used');
      } else {
        lifetimeCodes[code] = {
          used: true,
          usedBy: userData.email,
          usedAt: new Date().toISOString()
        };
        
        setUserData(prev => ({
          ...prev,
          subscription: 'lifetime',
          subscriptionExpiry: null
        }));
        
        setCodeMessage('✅ Lifetime access activated!');
        setTimeout(() => {
          setEnteredCode('');
          setCodeMessage('');
        }, 3000);
      }
    } else {
      setCodeMessage('Invalid code');
    }
  };

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={() => setShowAuth(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            {authMode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Subscription Status</h3>
            </div>
            <p className="text-gray-700 capitalize">
              {userData.subscription === 'lifetime' ? '✅ Lifetime Access' : 'Free Plan'}
            </p>
          </div>

          {userData.subscription !== 'lifetime' && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Activate Lifetime Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={applyLifetimeCode}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Apply
                </button>
              </div>
              {codeMessage && (
                <p className={`text-sm ${codeMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                  {codeMessage}
                </p>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-20 h-20 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            VerseVault
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master Scripture through interactive training
          </p>
          <button
            onClick={() => {
              setShowAuth(true);
              setAuthMode('signup');
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors"
          >
            Start Training Free
          </button>
        </div>
        {showAuth && <AuthModal />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              VerseVault
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-gray-700">{userData.streak} day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">{userData.xp} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-700">Level {userData.level}</span>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!currentExercise ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Training Path</h2>
            <p className="text-gray-600 mb-8">Master Scripture one verse at a time</p>
            
            <div className="grid gap-4">
              {exercises.map((exercise) => {
                const isLocked = exercise.locked && userData.xp < exercise.unlockXp;
                return (
                  <div
                    key={exercise.id}
                    className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
                      isLocked
                        ? 'border-gray-200 opacity-60'
                        : 'border-indigo-100 hover:border-indigo-300 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={() => !isLocked && setCurrentExercise(exercise)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          userData.completedExercises.includes(exercise.id)
                            ? 'bg-green-100'
                            : isLocked
                            ? 'bg-gray-100'
                            : 'bg-indigo-100'
                        }`}>
                          {userData.completedExercises.includes(exercise.id) ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <BookOpen className={`w-6 h-6 ${isLocked ? 'text-gray-400' : 'text-indigo-600'}`} />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{exercise.title}</h3>
                          <p className="text-sm text-gray-500">{exercise.reference}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold text-gray-700">+{exercise.xpReward} XP</span>
                          </div>
                          {isLocked && (
                            <p className="text-xs text-gray-500 mt-1">Unlock at {exercise.unlockXp} XP</p>
                          )}
                        </div>
                        {!isLocked && <ChevronRight className="w-6 h-6 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => {
                setCurrentExercise(null);
                setUserInput('');
                setFeedback(null);
              }}
              className="text-indigo-600 hover:text-indigo-700 mb-6 flex items-center gap-2"
            >
              ← Back to exercises
            </button>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
                  {currentExercise.reference}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentExercise.title}</h2>
              </div>

              <div className="mb-6 p-6 bg-indigo-50 rounded-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-bold text-indigo-600">___</span> {currentExercise.verse.split(' ').slice(1).join(' ')}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's the first word?
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                  placeholder="Type your answer..."
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
              </div>

              {feedback && (
                <div className={`mb-6 p-4 rounded-lg ${
                  feedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  <p className="font-medium">{feedback.message}</p>
                </div>
              )}

              <button
                onClick={checkAnswer}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Check Answer
              </button>
            </div>
          </div>
        )}
      </main>

      {showSettings && <SettingsModal />}
      {showAuth && <AuthModal />}
    </div>
  );
};

export default VerseVault;import React, { useState, useEffect } from 'react';
import {
  BookOpen, Trophy, Flame, CheckCircle2, Settings,
  LogOut, Award, X, Eye, EyeOff, Shield, Activity,
  Zap, Target, Crown, ChevronRight, Star
} from 'lucide-react';

const initializeLifetimeCodes = () => {
  const codes = {};
  for (let i = 1; i <= 100; i++) {
    const code = `LIFETIME${String(i).padStart(3, '0')}`;
    codes[code] = { used: false, usedBy: null, usedAt: null };
  }
  return codes;
};

const VerseVault = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lifetimeCodes] = useState(() => initializeLifetimeCodes());
  const [enteredCode, setEnteredCode] = useState('');
  const [codeMessage, setCodeMessage] = useState('');

  const defaultUserData = {
    email: '',
    streak: 0,
    lastActive: new Date().toISOString().split('T')[0],
    xp: 0,
    level: 1,
    completedExercises: [],
    subscription: 'free',
    subscriptionExpiry: null
  };

  const [userData, setUserData] = useState(defaultUserData);

  const exercises = [
    {
      id: 1,
      title: "John 3:16 - First Word",
      verse: "For God so loved the world that he gave his one and only Son",
      reference: "John 3:16",
      difficulty: "beginner",
      type: "first-letter",
      xpReward: 10,
      locked: false
    },
    {
      id: 2,
      title: "Psalm 23:1 - Fill the Blank",
      verse: "The Lord is my shepherd, I lack nothing",
      reference: "Psalm 23:1",
      difficulty: "beginner",
      type: "fill-blank",
      xpReward: 15,
      locked: false
    },
    {
      id: 3,
      title: "Philippians 4:13 - Multiple Choice",
      verse: "I can do all things through Christ who strengthens me",
      reference: "Philippians 4:13",
      difficulty: "intermediate",
      type: "multiple-choice",
      xpReward: 20,
      locked: true,
      unlockXp: 25
    },
    {
      id: 4,
      title: "Romans 8:28 - Complete Verse",
      verse: "And we know that in all things God works for the good of those who love him",
      reference: "Romans 8:28",
      difficulty: "intermediate",
      type: "complete",
      xpReward: 25,
      locked: true,
      unlockXp: 50
    },
    {
      id: 5,
      title: "Proverbs 3:5-6 - Two Verses",
      verse: "Trust in the Lord with all your heart and lean not on your own understanding",
      reference: "Proverbs 3:5-6",
      difficulty: "advanced",
      type: "multi-verse",
      xpReward: 30,
      locked: true,
      unlockXp: 100
    }
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (userData.lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (userData.lastActive === yesterdayStr) {
        setUserData(prev => ({
          ...prev,
          streak: prev.streak + 1,
          lastActive: today
        }));
      } else {
        setUserData(prev => ({
          ...prev,
          streak: 1,
          lastActive: today
        }));
      }
    }
  }, [userData.lastActive]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsProcessing(true);

    try {
      if (authMode === 'signup') {
        const newUser = {
          ...defaultUserData,
          email: email,
          id: Date.now().toString()
        };
        setUser(newUser);
        setUserData(newUser);
        setShowAuth(false);
        setEmail('');
        setPassword('');
      } else {
        const existingUser = {
          ...defaultUserData,
          email: email,
          id: Date.now().toString()
        };
        setUser(existingUser);
        setUserData(existingUser);
        setShowAuth(false);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserData(defaultUserData);
    setShowSettings(false);
  };

  const checkAnswer = () => {
    if (!currentExercise) return;
    
    const normalizedInput = userInput.toLowerCase().trim();
    const normalizedAnswer = currentExercise.verse.split(' ')[0].toLowerCase();
    
    if (normalizedInput === normalizedAnswer) {
      setFeedback({ type: 'success', message: '🎉 Perfect! Well done!' });
      
      if (!userData.completedExercises.includes(currentExercise.id)) {
        const newXp = userData.xp + currentExercise.xpReward;
        const newLevel = Math.floor(newXp / 100) + 1;
        
        setUserData(prev => ({
          ...prev,
          xp: newXp,
          level: newLevel,
          completedExercises: [...prev.completedExercises, currentExercise.id]
        }));
      }
    } else {
      setFeedback({ type: 'error', message: 'Not quite. Try again!' });
    }
  };

  const applyLifetimeCode = () => {
    const code = enteredCode.trim().toUpperCase();
    
    if (!code) {
      setCodeMessage('Please enter a code');
      return;
    }

    if (lifetimeCodes[code]) {
      if (lifetimeCodes[code].used) {
        setCodeMessage('This code has already been used');
      } else {
        lifetimeCodes[code] = {
          used: true,
          usedBy: userData.email,
          usedAt: new Date().toISOString()
        };
        
        setUserData(prev => ({
          ...prev,
          subscription: 'lifetime',
          subscriptionExpiry: null
        }));
        
        setCodeMessage('✅ Lifetime access activated!');
        setTimeout(() => {
          setEnteredCode('');
          setCodeMessage('');
        }, 3000);
      }
    } else {
      setCodeMessage('Invalid code');
    }
  };

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={() => setShowAuth(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            {authMode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Subscription Status</h3>
            </div>
            <p className="text-gray-700 capitalize">
              {userData.subscription === 'lifetime' ? '✅ Lifetime Access' : 'Free Plan'}
            </p>
          </div>

          {userData.subscription !== 'lifetime' && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Activate Lifetime Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={applyLifetimeCode}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Apply
                </button>
              </div>
              {codeMessage && (
                <p className={`text-sm ${codeMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                  {codeMessage}
                </p>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-6">
            <BookOpen className="w-20 h-20 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            VerseVault
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master Scripture through interactive training
          </p>
          <button
            onClick={() => {
              setShowAuth(true);
              setAuthMode('signup');
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors"
          >
            Start Training Free
          </button>
        </div>
        {showAuth && <AuthModal />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              VerseVault
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-gray-700">{userData.streak} day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">{userData.xp} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-700">Level {userData.level}</span>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!currentExercise ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Training Path</h2>
            <p className="text-gray-600 mb-8">Master Scripture one verse at a time</p>
            
            <div className="grid gap-4">
              {exercises.map((exercise) => {
                const isLocked = exercise.locked && userData.xp < exercise.unlockXp;
                return (
                  <div
                    key={exercise.id}
                    className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
                      isLocked
                        ? 'border-gray-200 opacity-60'
                        : 'border-indigo-100 hover:border-indigo-300 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={() => !isLocked && setCurrentExercise(exercise)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          userData.completedExercises.includes(exercise.id)
                            ? 'bg-green-100'
                            : isLocked
                            ? 'bg-gray-100'
                            : 'bg-indigo-100'
                        }`}>
                          {userData.completedExercises.includes(exercise.id) ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <BookOpen className={`w-6 h-6 ${isLocked ? 'text-gray-400' : 'text-indigo-600'}`} />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{exercise.title}</h3>
                          <p className="text-sm text-gray-500">{exercise.reference}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold text-gray-700">+{exercise.xpReward} XP</span>
                          </div>
                          {isLocked && (
                            <p className="text-xs text-gray-500 mt-1">Unlock at {exercise.unlockXp} XP</p>
                          )}
                        </div>
                        {!isLocked && <ChevronRight className="w-6 h-6 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => {
                setCurrentExercise(null);
                setUserInput('');
                setFeedback(null);
              }}
              className="text-indigo-600 hover:text-indigo-700 mb-6 flex items-center gap-2"
            >
              ← Back to exercises
            </button>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
                  {currentExercise.reference}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentExercise.title}</h2>
              </div>

              <div className="mb-6 p-6 bg-indigo-50 rounded-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-bold text-indigo-600">___</span> {currentExercise.verse.split(' ').slice(1).join(' ')}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's the first word?
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                  placeholder="Type your answer..."
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
              </div>

              {feedback && (
                <div className={`mb-6 p-4 rounded-lg ${
                  feedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  <p className="font-medium">{feedback.message}</p>
                </div>
              )}

              <button
                onClick={checkAnswer}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Check Answer
              </button>
            </div>
          </div>
        )}
      </main>

      {showSettings && <SettingsModal />}
      {showAuth && <AuthModal />}
    </div>
  );
};

export default VerseVault;
