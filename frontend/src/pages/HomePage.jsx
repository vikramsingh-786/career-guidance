import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Sparkles, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [targetRole, setTargetRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const availableRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Data Analyst'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!targetRole || !currentSkills.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    const skillsArray = currentSkills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    navigate('/dashboard', {
      state: { targetRole, currentSkills: skillsArray }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-25">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-2xl">
            <Target className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Career Path <span className="text-blue-600 dark:text-blue-400">Analyzer</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Discover your skill gaps, get a personalized roadmap, and stay updated with the latest tech trends
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Let's Analyze Your Career Path
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Role *
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select your target role</option>
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Skills *
              </label>
              <textarea
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="Enter your skills separated by commas (e.g., HTML, CSS, JavaScript)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                rows="4"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Tip: Separate skills with commas for better accuracy
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Analyze My Career Path
                </>
              )}
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Skill Gap Analysis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Identify exactly what skills you need to learn for your dream role
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized Roadmap</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get a structured learning path tailored to your career goals
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Latest Tech News</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stay updated with trending stories from the tech world
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
