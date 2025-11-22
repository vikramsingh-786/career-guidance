import { Map, Clock, BookOpen } from 'lucide-react';

const RoadmapCard = ({ data }) => {
  const {roadmap, estimatedCompletion } = data;

  const phaseColors = [
    { 
      bg: 'bg-blue-100 dark:bg-blue-900/30', 
      border: 'border-blue-200 dark:border-blue-800', 
      text: 'text-blue-700 dark:text-blue-400', 
      icon: 'bg-blue-600 dark:bg-blue-500' 
    },
    { 
      bg: 'bg-green-100 dark:bg-green-900/30', 
      border: 'border-green-200 dark:border-green-800', 
      text: 'text-green-700 dark:text-green-400', 
      icon: 'bg-green-600 dark:bg-green-500' 
    },
    { 
      bg: 'bg-purple-100 dark:bg-purple-900/30', 
      border: 'border-purple-200 dark:border-purple-800', 
      text: 'text-purple-700 dark:text-purple-400', 
      icon: 'bg-purple-600 dark:bg-purple-500' 
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
          <Map className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Career Roadmap</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Duration: <span className="font-semibold">{estimatedCompletion}</span>
          </p>
        </div>
      </div>

      {/* Roadmap Phases */}
      <div className="space-y-6">
        {roadmap.map((phase, index) => {
          const colors = phaseColors[index % phaseColors.length];
          
          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-lg`}
            >
              {/* Phase Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${colors.icon} p-2 rounded-lg`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{phase.title}</h3>
                    <p className={`text-sm ${colors.text} font-medium`}>{phase.phase}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${colors.text}`} />
                  <span className={`text-sm font-semibold ${colors.text}`}>
                    {phase.duration}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-4">{phase.description}</p>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What You'll Learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Resources:
                </h4>
                <ul className="space-y-1">
                  {phase.resources.map((resource, resourceIndex) => (
                    <li key={resourceIndex} className="flex items-start gap-2">
                      <span className="text-gray-600 dark:text-gray-400 mt-1">•</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector Line */}
              {index < roadmap.length - 1 && (
                <div className="flex justify-center mt-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
          <span className="font-semibold">💡 Pro Tip:</span> Stay consistent and build projects while learning each phase!
        </p>
      </div>
    </div>
  );
};

export default RoadmapCard;