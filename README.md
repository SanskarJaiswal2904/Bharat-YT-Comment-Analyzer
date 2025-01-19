# YouTube Video Comments Analyzer

A **NEXT.js** application to analyze YouTube video comments using a server-side API. The app allows users to input YouTube video IDs or URLs, fetch comments using an API, and display detailed information about the videos such as title, description, channel details, and comments summary. It uses Gemini API for analysis and categorization of comments. [Live Link](https://bharat-yt-comment-analyzer.onrender.com/).

---

## Features

- **Fetch Video Details**: Input YouTube video IDs or URLs to retrieve video details (title, channel, description, etc.).
- **Comments Analysis**: Choose the level of analysis (small, medium, or large) to analyze the comments of each video.
- **Thumbnail Display**: Dynamically fetch and display the video thumbnail.
- **Description Truncation**: Long descriptions are truncated to 450 characters with "Read more"/"Read less" toggling.
- **Responsive Design**: Fully responsive layout using Material-UI.
- **Copy Video Details**: Copy video details like title, channel, description, and comments analysis to the clipboard.
- **Light/Dark Mode Support**: Adjusts colors dynamically based on the selected theme.

---

## Tech Stack

### Frontend
- **NEXT.js**: Component-based framework for building UI.
- **Material-UI (MUI)**: For UI components and styling.
- **Axios**: For making API calls to the backend.

### Backend (Example Endpoint)
The app assumes an API is running at `http://localhost:4000/api/v1` with endpoints for fetching comments.

---

## Installation

### Prerequisites
- Node.js installed on your system.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/SanskarJaiswal2904/Bharat-YT-Comment-Analyzer
   cd youtube-comments-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variable:
   ```env
   REACT_APP_API_URL=http://localhost:4000/api/v1
   ```

4. Run the development server:
   ```bash
   npm start
   ```

---

## Usage

1. **Input Video IDs/URLs**: Paste YouTube video IDs or URLs into the input field.
2. **Choose Analysis Level**: Select the desired length of comments analysis (small, medium, or large).
3. **Fetch Details**: Click the "Analyze" button to fetch video details and comments.
4. **View Results**: Results are displayed as cards with video information and comments analysis.
5. **Expand Descriptions**: Click "Read more" to expand the video description.
6. **Copy Details**: Click the copy icon to copy video details to the clipboard.

---

## Project Structure

```plaintext
src/
├── components/
│   ├── MainSection.js        // Main application logic and UI
│   ├── VideoCard.js          // Card component for individual video details
│   ├── CommentAnalyzer.js    // Component to display analyzed comments
│
├── App.js                    // Application entry point
├── index.js                  // React DOM rendering
└── styles/                   // Shared styles
```

---

## API Endpoint Details

- **Base URL**: `http://localhost:4000/api/v1`

- **Endpoints**:
  1. **Fetch Comments**:
     ```http
     GET /comments/:videoId/:option
     ```
     - `videoId`: YouTube video ID
     - `option`: Analysis level (`small`, `medium`, `large`)

     **Response**:
     ```json
     {
       "modelVersion": "v1.0",
       "numberOfComments": 50,
       "comments": [
         { "text": "Great video!", "timestamp": "00:01:23" },
         ...
       ]
     }
     ```

---

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.

## Author
This app is created with ❤ by [SansKar Jaiswal](https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html).