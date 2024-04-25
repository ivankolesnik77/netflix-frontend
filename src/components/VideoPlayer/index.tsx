import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {}

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
  const [src, setSrc] = useState("");
  // useEffect(() => {
  //   const fetchVideo = async () => {
  //     const rangeHeader = "bytes=0-999"; // Set your desired byte range
  //     const videoUrl = "http://localhost:3002/videoStream/test.mp4";

  //     try {
  //       const response = await fetch(videoUrl, {
  //         headers: {
  //           Range: rangeHeader,
  //         },
  //       });

  //       if (response.ok) {
  //         const blob = await response.blob();
  //         const videoBlobUrl = URL.createObjectURL(blob);

  //         // Use videoBlobUrl in your video player
  //         setSrc(videoBlobUrl);
  //       } else {
  //         console.error(
  //           "Failed to fetch video:",
  //           response.status,
  //           response.statusText,
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching video:", error);
  //     }
  //   };

  //   // Call the function to fetch the video
  //   fetchVideo();
  // }, []);

  return (
    <div>
      <video width={"100%"} height="100%" controls autoPlay>
        <source
          src={"http://localhost:3002/videoStream/test.mp4"}
          type="video/mp4"
        ></source>
      </video>
    </div>
  );
};

export default VideoPlayer;
