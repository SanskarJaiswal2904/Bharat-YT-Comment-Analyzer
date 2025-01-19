const axios = require("axios");

/**
 * Fetch video details from YouTube API.
 * @param {string} videoId - The video ID to fetch details for.
 * @param {string} apiKey - The YouTube API key.
 * @returns {Promise<Object>} - Extracted video details.
 */
async function fetchVideoDetails(videoId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const videoData = response.data.items[0]?.snippet; // Extract snippet from the response

    if (!videoData) {
      throw new Error("Video data not found for the provided ID.");
    }

    // Extract required fields
    return {
      channelTitle: videoData.channelTitle,
      title: videoData.title,
      description: videoData.description,
      publishedAt: videoData.publishedAt,
      thumbnails: videoData.thumbnails,
    };
  } catch (error) {
    console.error("Error fetching video details:", error.message);
    throw error;
  }
}

module.exports = fetchVideoDetails;
