"use client";


import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { useTheme } from '@mui/material/styles'; 


const Footer = () => {
    const theme = useTheme();
    
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? '#031634' : theme.palette.primary.dark,
        color: theme.palette.text.primary, // Use theme values directly
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          © {new Date().getFullYear()}  Bharat YT Comment-Analyzer by SansKar Jaiswal       <i className="fas fa-home"></i> {/* FontAwesome icon */}

        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
         © {new Date().getFullYear()}  Bharat YT Comment-Analyzer. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
        🤝 Feel free to fork this repository and make your own changes.
        </Typography>
        <Typography 
            variant="body2" 
            sx={{ 
                mt: 1, 
                display: 'flex', // Using flexbox to align items horizontally
                justifyContent: 'center', // Center the content horizontally
                alignItems: 'center', // Vertically center the content
                gap: 1 // Optional: Adds space between the icon and the text
            }}
            >
            <Link
                href="https://sanskarjaiswal2904.github.io/Sanskar-Website/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                color: 'white', 
                fontWeight: 'bold', 
                textDecoration: 'none',
                display: 'flex', // Makes the link's content behave like a flex container
                alignItems: 'center' // Vertically center the content inside the link
                }}
            >
                <LinkIcon sx={{ mr: 0.5 }} /> {/* Optional: Adjusts space between icon and text */}
                Made by SansKar with ❤.
            </Link>
            </Typography>
            <Typography 
            variant="body2" 
            sx={{ 
                mt: 1, 
                display: 'flex', // Enables flexbox to align items horizontally
                alignItems: 'center', // Vertically centers the items
                justifyContent: 'center', // Horizontally center the items
                gap: 1, // Adds space between the icons and text
            }}
            >
            This website is built using:{' '}
            <img src="/html-1.svg" alt="HTML logo" height={'15px'} width={'15px'} style={{ margin: '0 5px' }} title='HTML5'/>
            <img src="/css-3.svg" alt="CSS logo" height={'15px'} width={'15px'} style={{ margin: '0 5px' }} title='CSS3'/>
            <img src="/logo-javascript.svg" alt="Javascript logo" height={'15px'} width={'15px'} style={{ margin: '0 5px' }} title='Javascript (ES6+)' />
            <img src="/next.svg" alt="Next.js logo" height={'37px'} width={'37px'} style={{ margin: '0 5px' }} title='Next.js' />
            <img src="/nodejs-horizontal.svg" alt="Node.js logo" height={'15px'} width={'auto'} style={{ margin: '0 5px' }} title='Node.js' />
            <img src="/gemini-color.svg" alt="Gemini logo" height={'20px'} width={'20px'} style={{ margin: '0 5px' }} title='Gemini AI' />
            </Typography>


        {/** Just uncomment it */}
        <Typography sx={{ 
            mt: 2, 
            textAlign: 'center', // Center text inside Typography
            display: 'flex', // Enables flexbox
            justifyContent: 'center', // Centers content horizontally
            alignItems: 'center' // Centers content vertically
          }}>
          <a href="https://www.hitwebcounter.com" target="_blank">
          <img src="https://hitwebcounter.com/counter/counter.php?page=18552717&style=0025&nbdigits=7&type=ip&initCount=0" title="Counter Widget" alt="Visit counter For Websites"   border="0" /></a>            
        </Typography>
      </Container>
    </Box>
  
  );
};

export default Footer;
