const HACKER_NEWS_API = 'https://hacker-news.firebaseio.com/v0';

export const fetchHackerNews = async (limit = 5) => {
  try {
    const topStoriesResponse = await fetch(`${HACKER_NEWS_API}/topstories.json`);
    
    if (!topStoriesResponse.ok) {
      throw new Error('Failed to fetch top stories');
    }

    const topStoryIds = await topStoriesResponse.json();
    const storyIds = topStoryIds.slice(0, limit);

    const storyPromises = storyIds.map(async (id) => {
      const response = await fetch(`${HACKER_NEWS_API}/item/${id}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch story ${id}`);
      }
      return response.json();
    });

    const stories = await Promise.all(storyPromises);

    return stories
      .filter(story => story && story.title) 
      .map(story => ({
        id: story.id,
        title: story.title,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        score: story.score || 0,
        time: story.time,
        by: story.by,
        type: story.type
      }));
  } catch (error) {
    console.error('Error fetching HackerNews data:', error);
    throw error;
  }
};