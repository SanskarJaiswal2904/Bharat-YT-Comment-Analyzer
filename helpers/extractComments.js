const axios = require("axios");

/**
 * Fetches all comments from a YouTube video by handling pagination.
 * @param {string} videoId - The ID of the YouTube video.
 * @param {string} apiKey - The YouTube API key.
 * @returns {Promise<Object[]>} - Array of extracted comments.
 */
const fetchAllComments = async (videoId, apiKey) => {
  let allComments = [];
  let pageToken = null;

  try {
    do {
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&textFormat=plainText&key=${apiKey}${
        pageToken ? `&pageToken=${pageToken}` : ""
      }`;

      // Fetch the comments for the current page
      const response = await axios.get(url);

      // Extract relevant fields from each comment
      const extractedComments = response.data.items.map((item) => {
        const snippet = item.snippet.topLevelComment.snippet;

        return {
          channelId: snippet.channelId,
          videoId: snippet.videoId,
          textDisplay: snippet.textDisplay,
          textOriginal: snippet.textOriginal,
          likeCount: snippet.likeCount,
        };
      });

      // Append comments to the list
      allComments = [...allComments, ...extractedComments];

      // Update pageToken for the next iteration (if any)
      pageToken = response.data.nextPageToken || null;
    } while (pageToken); // Continue fetching while there are more pages

    return allComments;
  } catch (error) {
    console.error("Error fetching YouTube comments:", error.message);
    throw error.response ? error.response.data : { message: "Failed to fetch comments" };
  }
};

module.exports = fetchAllComments;
