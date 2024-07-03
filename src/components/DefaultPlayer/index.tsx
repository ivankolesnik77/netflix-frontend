import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Video from 'next-video'

interface VideoPlayerProps {
    fileName: string
    format?: string
    style?: CSSProperties
    className?: string
    controls?: boolean
    muted?: boolean
    onCanPlay?: () => void
    loop?: boolean
    autoPlay?: boolean
    poster?: string
}

const DefaultPlayer: React.FC<VideoPlayerProps> = ({
    fileName,
    format = 'mp4',
    style,
    className,
    muted,
    loop,
    autoPlay,
    onCanPlay,
    poster,
    controls,
}) => {
    console.log(`${process.env.NEXT_PUBLIC_MEDIA_URL}/${fileName}.${format}`)
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
        <Video
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${fileName}.${format}`}
            style={style}
            className={className}
            controls={controls}
            muted={muted}
            onCanPlay={onCanPlay}
            loop={loop}
            autoPlay={autoPlay}
            poster={poster}
        />
    )
}

export default DefaultPlayer
