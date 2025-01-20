"use client";

import React, { useState } from "react";
import {
  Card,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  CardActions,
  Button,
  Box,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { CopyAll, Done } from "@mui/icons-material";
import axios from "axios";
import IndiaGlobal from "./IndiaGlobal";
import EmptySearchMessage from "./EmptySearchMessage";
import { blue, teal, pink, lime, amber } from '@mui/material/colors';


const Mainsection = () => {
  const [videoIds, setVideoIds] = useState("");
  const [selectedOption, setSelectedOption] = useState("small");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expanded, setExpanded] = useState({}); 


  const toggleExpanded = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the state for the specific index
    }));
  };

  const renderDescription = (description, index) => {
    const isExpanded = expanded[index]; // Check if the specific card is expanded
    if (isExpanded) {
      return (
        <>
          {description}{" "}
          <span
            onClick={() => toggleExpanded(index)} // Pass the index to toggleExpanded
            style={{ color: "lightgreen", cursor: "pointer" }}
          >
            Read less
          </span>
        </>
      );
    } else {
      const truncatedText = description.slice(0, 450);
      return (
        <>
          {truncatedText}...
          <span
            onClick={() => toggleExpanded(index)} // Pass the index to toggleExpanded
            style={{ color: "lightgreen", cursor: "pointer" }}
          >
            Read more
          </span>
        </>
      );
    }
  };

  const extractUniqueIds = async () => {
    setIsLoading(true);
    setResult([]);
    setError(null);
    const inputLines = videoIds.split(/\r?\n/);
    const idRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|^)([a-zA-Z0-9_-]{11})(?:&.*)?$/;
    const uniqueIds = new Set();

    inputLines.forEach((line) => {
      const trimmedLine = line.trim();
      const match = idRegex.exec(trimmedLine);
      if (match) {
        uniqueIds.add(match[1]);
      }
    });

    const results = [];
    const API_URL =
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000/api/v1";

    for (const videoId of uniqueIds) {
      try {
        const response = await axios.get(
          `${API_URL}/comments/${videoId}/${selectedOption}`
        );
        results.push({
          videoId,
          data: response.data,
        });
      } catch (error) {
        console.error(`Failed to fetch comments for videoId ${videoId}:`, error);
        setError(error);
        setIsLoading(false);
      }
    }

    setResult(results);
    setIsLoading(false);
  };

  const handleCopyToClipboard = (videoDetails, numberOfComments, parts, index) => {
    if (!document.hasFocus()) {
      alert("Please ensure the document is in focus to copy the details.");
      return;
    }
  
    const data = {
      "Channel Title": videoDetails.channelTitle || "N/A",
      "Video Title": videoDetails.title || "N/A",
      "Published At": videoDetails.publishedAt
        ? new Date(videoDetails.publishedAt).toLocaleString()
        : "N/A",
      "Number of Comments": numberOfComments || "N/A",
      "Prompts": parts.length
        ? parts.map((part, index) => `${part.text}`).join("\n")
        : "No parts available",
    };
  
    const formattedString = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  
    navigator.clipboard
      .writeText(formattedString)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1400);
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };  

  const getThumbnailUrl = (thumbnails) => {
    if (thumbnails?.maxres?.url) return thumbnails.maxres.url;
    if (thumbnails?.standard?.url) return thumbnails.standard.url;
    if (thumbnails?.high?.url) return thumbnails.high.url;
    if (thumbnails?.medium?.url) return thumbnails.medium.url;
    if (thumbnails?.default?.url) return thumbnails.default.url;
    return "/noImage.png";
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "#03132fe8"
            : theme.palette.grey[100],
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{
          ml: 2, mt: 0, mb: 2,
        }}>
            <Box sx={{mt: 0, m: 0}}>
                <IndiaGlobal/>
            </Box>
            <Typography variant='h5' fontWeight={'bold'} sx={{fontSize: {sm : '0.875rem', md: '1rem'}}}>
            Analyze the comments of any YouTube video:
            </Typography>
            <Typography variant='body4' sx={{fontSize: {sm : '0.875rem', md: '1rem'}, my: 2}} >
            Enter a YouTube video link or video ID or you can enter multiple video link or video ID to analyze the comments, sentiment, and more!
            </Typography>
        </Box>
        <TextField
          label="Video IDs"
          multiline
          rows={6}
          placeholder={`https://www.youtube.com/watch?v=ID1\nhttps://www.youtube.com/watch?v=ID2\n\nor just,\nID1\nID2`}
          variant="standard"
          value={videoIds}
          onChange={(e) => setVideoIds(e.target.value)}
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%" },
            minWidth: "300px",
            maxWidth: "800px",
            marginBottom: 2,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',  // Align button to the right
            alignItems: 'center',
            width: '100%',
            mb: 5,
          }}
        >
          <Tooltip title="Clear Video IDs">
            <Button
              variant="text"
              color="success"
              onClick={() => setVideoIds('')}
            >
              Clear
            </Button>
          </Tooltip>
        </Box>

        <FormControl
          variant="outlined"
          sx={{
            width: { xs: '60%', sm: '50%', md: '40%' },
            minWidth: '200px',
            maxWidth: '400px',
            mb: 2,
          }}
        >
          <InputLabel id="prompt-size-label">Prompt Size</InputLabel>
          <Select
            labelId="prompt-size-label"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            label="Prompt Size"
            variant="outlined"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            <MenuItem value="small">Small (150-200 words)</MenuItem>
            <MenuItem value="medium">Medium (250-300 words)</MenuItem>
            <MenuItem value="large">Large (350-400 words)</MenuItem>
          </Select>
        </FormControl>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Tooltip title="Analyze" >
              <Button
                variant="contained"
                onClick={extractUniqueIds}
                sx={{
                  marginY: 2,
                  width: { xs: "70%", sm: "60%", md: "50%" },
                  minWidth: "100px",
                  maxWidth: "600px",
                }}
              >
                Analyze
              </Button>
          </Tooltip>
        )}
      </div>

      <Box>
      {result.length === 0 ? (
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4}}>
            {isLoading ? (
              <EmptySearchMessage message="Searching..." />
            ) : (
              <EmptySearchMessage message="Search for a playlist to get its details." />
            )}
          </Box>
            ) : (
<Grid
  container
  spacing={3} // Slightly increase spacing for better separation
  sx={{ padding: 3 }} // Adjust padding for better responsiveness
  justifyContent="center"
>
  {result.length > 0 &&
    result.map(({ videoId, data }, index) => {
      const {
        title = 'N/A',
        channelTitle = 'N/A',
        description = 'N/A',
        publishedAt = 'N/A',
        thumbnails,
      } = data.videoDetails || {};
      const thumbnailUrl = getThumbnailUrl(thumbnails);

      return (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={videoId}
        >
          <Card
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
              maxWidth: 400,
              margin: 'auto',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', // Elevate card
              borderRadius: 6, // More rounded corners for a modern look
              overflow: 'hidden', // Avoid content overflow
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)', // Slight scaling on hover
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)', // More pronounced shadow
              },
            }}
          >
            {/* Thumbnail */}
            <Box
              sx={{
                width: { xs: '250px', sm: '270px', md: '300px', lg: '350px', xl: '400px' },
                height: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto', xl: 'auto' },
                overflow: 'hidden',
                borderRadius: '4px',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                margin: '0 auto', // Centers the entire Box itself
                marginBottom: '10px',
                title: {title},
              }}
            >
              <img
                src={thumbnailUrl}
                loading="lazy"
                alt="Video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Content */}
            <CardContent
              sx={{
                padding: 3, // Add more padding for breathing room
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 2, wordBreak: 'break-word', color: (theme) => theme.palette.mode === 'light' ? pink[600] : pink[300] }}
              >
                <strong>Channel:</strong> {channelTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 1, wordBreak: "break-word", color: (theme) => theme.palette.mode === 'light' ? teal[800] : teal[300] }}
              >
                <strong>Description:</strong> {renderDescription(description, index)}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ marginTop: 1, color: (theme) => theme.palette.mode === 'light' ? lime[700] : lime[300] }}
              >
                <strong>Published At:</strong>{' '}
                {publishedAt !== 'N/A' ? new Date(publishedAt).toLocaleString() : 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ marginTop: 1 }}
              >
                <strong> Total Comments:</strong> {data.numberOfComments === 0 ? 'N/A -> Server didn\'t provide number of comments': data.numberOfComments + ' comments analyzed  '} <span style={{'cursor': 'pointer'}} title="If number of comments analyzed is less than the actual comment&#10;that means some of the comment where either deleted or made private.">&#8505;</span>

              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, color: (theme) => theme.palette.mode === 'light' ? blue[700] : blue[300]}}
              >
                <strong>Model Version:</strong> {data.modelVersion}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginTop: 1, color: (theme) => theme.palette.mode === 'light' ? amber[900] : amber[300] }}
              >
                <strong> Gemini Prompt:</strong>{' '}
                {data.parts.map((part, idx) => (
                  <Typography
                    variant="caption"
                    display="block"
                    key={idx}
                    sx={{ marginLeft: 1 }}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions
              sx={{
                justifyContent: 'space-between',
                padding: 2,
                borderTop: '1px solid #ddd', // Divider for clarity
              }}
            >
            <Tooltip title="Watch Video">
              <Button
                size="small"
                variant="text"
                color="primary"
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
                }
                sx={{
                  textTransform: 'none', // Prevent uppercase
                  fontWeight: 600,
                }}
              >
                Watch Video
              </Button>
            </Tooltip>
              <Tooltip title="Copy Details to Clipboard">
                <IconButton
                  color="secondary"
                  onClick={() => {
                    handleCopyToClipboard(
                      data.videoDetails,
                      data.numberOfComments,
                      data.parts,
                      index
                    );
                  }}
                  disabled={copiedIndex === index}
                >
                 {copiedIndex === index ? (
                  <>
                    <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
                      Copied
                    </Typography>
                    <Done sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }} />
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
                      Copy
                    </Typography>
                    <CopyAll sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }} />
                  </>
                )}

                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      );
    })}
</Grid>

            )}

{error && (
        <div>
          <h3>Errors</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
</Box>


    </Box>
  );
};

export default Mainsection;
