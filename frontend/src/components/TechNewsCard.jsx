// src/components/TechNewsCard.jsx - Updated with dark mode
import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, TrendingUp, User, Clock, Loader2 } from 'lucide-react';
import { fetchHackerNews } from '../services/hackerNewsApi';

const TechNewsCard = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const newsData = await fetchHackerNews();
        setNews(newsData);
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Failed to load tech news');
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
          <Newspaper className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Tech News</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Top stories from HackerNews</p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600 dark:text-orange-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-300">Loading latest stories...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* News Grid */}
      {!isLoading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200"
            >
              {/* Type Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-semibold rounded-full">
                  {item.type || 'story'}
                </span>
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-bold">{item.score || 0}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {item.title}
              </h3>

              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{item.by || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(item.time)}</span>
                </div>
              </div>

              {/* Link */}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                >
                  Read More
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {!isLoading && !error && news.length > 0 && (
        <div className="mt-6 text-center">
          <a
            href="https://news.ycombinator.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            View more on HackerNews
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default TechNewsCard;