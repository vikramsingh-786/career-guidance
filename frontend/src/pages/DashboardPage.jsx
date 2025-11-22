import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SkillGapCard from '../components/SkillGapCard';
import RoadmapCard from '../components/RoadmapCard';
import TechNewsCard from '../components/TechNewsCard';
import { analyzeSkillGap, generateRoadmap } from '../services/api';
import { ArrowLeft, Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [skillGapData, setSkillGapData] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!location.state?.targetRole || !location.state?.currentSkills) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { targetRole, currentSkills } = location.state;

        const [skillGapResponse, roadmapResponse] = await Promise.all([
          analyzeSkillGap(targetRole, currentSkills),
          generateRoadmap(targetRole)
        ]);

        setSkillGapData(skillGapResponse);
        setRoadmapData(roadmapResponse);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load analysis. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.state, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Analyzing your career path...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Your Career Analysis
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Based on your goal: <span className="font-semibold text-blue-600 dark:text-blue-400">{skillGapData?.targetRole}</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          {skillGapData && <SkillGapCard data={skillGapData} />}
        </div>

        <div>
          {roadmapData && <RoadmapCard data={roadmapData} />}
        </div>
      </div>

      <div>
        <TechNewsCard />
      </div>
    </div>
  );
};

export default DashboardPage;