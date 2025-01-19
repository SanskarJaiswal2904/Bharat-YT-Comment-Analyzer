const axios = require("axios");

/**
 * Helper function to call Generative Language API
 * @param {string} apiKey - API key for the generative language API
 * @param {Array} comments - Array of comment objects
 * @param {string} title - Video title
 * @param {string} description - Video description
 * @param {string} length - length of resultant prompt
 * @returns {Object} - Generated response from the API
 */
const analyzeCommentsAndVideo = async (apiKey, comments, title, description, length) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  let size = '';
  if(length === 'small'){
    size = '150-200';
  } else if (length === 'medium'){
    size = '250-300';
  } else if ( length === 'large'){
    size = '350-400';
  } else{
    size = '150-200'
  }
  
  const prompt = `Based on the comment section and video content, summarize in ${size} words what the audience thinks about the video.`;
  
  // Construct the content combining comments, title, and description
  const data = {
    contents: [
      {
        parts: [
          { text: `Title: ${title}` },
          { text: `Description: ${description}` },
          { text: `Comments: ${comments.map(comment => comment.textDisplay).join(" ")}` },
          { text: prompt }
        ]
      }
    ]
  };

  try {
    // Make POST request
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calling generative language API:", error.message);
    if (error.response) {
      return { error: error.response.data };
    } else {
      return { error: "An unknown error occurred." };
    }
  }
};

module.exports = { analyzeCommentsAndVideo };
