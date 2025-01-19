const express = require("express");
const cors = require("cors");
const fetchAllComments = require("./helpers/extractComments");
const fetchVideoDetails = require("./helpers/fetchVideoDetails");
const {analyzeCommentsAndVideo} = require("./helpers/analyzeCommentsAndVideo");

require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Example POST route
app.post("/api/v1/data", (req, res) => {
  const { message } = req.body; // Access JSON data from the request body
  res.json({ response: `Received your message: ${message}` });
});

const extractAnalysisData = (analysis) => {
    const parts = analysis?.candidates?.[0]?.content?.parts || [];
    const modelVersion = analysis?.modelVersion || '';
  
    return { parts, modelVersion };
  };


// Route to fetch all YouTube comments
app.get("/api/v1/comments/:videoId/:length", async (req, res) => {
    const { videoId, length } = req.params; // Get videoId and length from URL
    const apiKey = process.env.YOUTUBE_API_KEY; // YouTube API key
    const generativeApiKey = process.env.GEMINI_API_KEY; // GEMINI API key

  
    try {
        const allComments = await fetchAllComments(videoId, apiKey);
          
        // Extract 'textDisplay' and store as objects in an array
        const commentObjects = allComments.map((comment) => ({
            textDisplay: comment.textDisplay,
        }));

        // Get the number of comments analyzed
        const numberOfComments = commentObjects.length;

        const videoDetails = await fetchVideoDetails(videoId, apiKey);
        const { title, description } = videoDetails;

        // Ensure length parameter is valid
        const validLengths = ['small', 'medium', 'large'];
        if (!validLengths.includes(length)) {
            return res.status(400).json({ error: "Invalid length parameter. Choose from 'small', 'medium', or 'large'." });
        }

        // Call the generative language API
        const analysis = await analyzeCommentsAndVideo(generativeApiKey, commentObjects, title, description, length);

        // Extract the parts and modelVersion from the analysis response
        const { parts, modelVersion } = extractAnalysisData(analysis);

        res.json({ videoDetails: videoDetails, parts, modelVersion, numberOfComments});

    } catch (error) {
        console.error("Error during API calls:", error.message);
        res.status(500).json({ error: "Failed to process the request." });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
