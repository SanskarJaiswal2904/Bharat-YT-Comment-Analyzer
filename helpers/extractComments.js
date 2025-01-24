const axios = require("axios");

/**
 * Fetches a maximum of 10,000 comments from a YouTube video by handling pagination.
 * @param {string} videoId - The ID of the YouTube video.
 * @param {string} apiKey - The YouTube API key.
 * @returns {Promise<Object[]>} - Array of extracted comments.
 */
const fetchAllComments = async (videoId, apiKey) => {
  let allComments = [];
  let pageToken = null;

  // Set the maximum number of comments to fetch
  const maxComments = 3000;
  const commentsPerPage = 20; // YouTube API typically returns 20 comments per page
  const maxRequests = Math.ceil(maxComments / commentsPerPage); // Max requests needed to fetch 10,000 comments

  try {
    let requestCount = 0;

    do {
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&textFormat=plainText&key=${apiKey}${
        pageToken ? `&pageToken=${pageToken}` : ""
      }`;

      // Fetch the comments for the current page
      const response = await axios.get(url);
      requestCount++;

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

      // Stop fetching if we hit the maximum comment limit or API request limit
      if (allComments.length >= maxComments || requestCount >= maxRequests) {
        break;
      }
    } while (pageToken); // Continue fetching while there are more pages and limit not reached

    // Ensure we return only the maximum number of comments if exceeded
    return allComments.slice(0, maxComments);
  } catch (error) {
    console.error("Error fetching YouTube comments:", error.message);
    throw error.response ? error.response.data : { message: "Failed to fetch comments" };
  }
};

module.exports = fetchAllComments;
