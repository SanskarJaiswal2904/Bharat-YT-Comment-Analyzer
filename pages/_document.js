import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta Tags */}
          <meta name="description" content="Web site created using create-react-app" />
          <meta name="description" content="Get the total length/duration of a YouTube playlist by passing its link as input. You get the time required to watch that playlist at different speeds." />

          {/* Favicon */}
          <link rel="icon" href="/YT-comment-analyzer.svg" />
          
          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" href="/logo192.png" />
          
          {/* Manifest */}
          <link rel="manifest" href="/manifest.json" />

          {/* Font Awesome Links */}
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
