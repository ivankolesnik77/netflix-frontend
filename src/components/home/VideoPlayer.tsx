// VideoPlayer.js
import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadedBlobs, setLoadedBlobs] = useState<Blob[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const fetchSlice = (start: number, end: number) => {
    const headers = new Headers();
    headers.append("Range", `bytes=${start}-${end}`);

    return fetch("http://localhost:3001/videos/intro.mp4", {
      headers,
    })
      .then((response) => response.blob())
      .catch((error) => {
        console.error("Error fetching video slice:", error);
      });
  };

  const loadNextSlice = async () => {
    const startTime = currentTime;
    const endTime = Math.min(currentTime + 5, 25);
    setCurrentTime(endTime);

    const blob = await fetchSlice(startTime, 5);
    const arrayBuffer = await fetchSlice(startTime, endTime);
    const sourceBuffer = mediaSourceRef.current.addSourceBuffer("video/mp4");
    sourceBuffer.appendBuffer(arrayBuffer);
    // @ts-ignore
    setLoadedBlobs((prevBlobs) => [...prevBlobs, blob]);

    // Load the next chunk immediately
    if (currentTime < 25) {
      //   loadNextSlice();
    }
  };

  useEffect(() => {
    if (videoRef.current)
      // Start loading chunks when the component mounts
      loadNextSlice();
  }, [videoRef]); // Run once when the component mounts

  useEffect(() => {
    console.log(currentTime, videoRef.current!.duration);
    // When all slices are loaded, concatenate Blobs and create video URL
    if (loadedBlobs.length == 1) {
      const videoBlob = new Blob(loadedBlobs, { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);

      if (videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.load();
      }
    }
  }, [loadedBlobs, currentTime]);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  return (
    <div>
      <video ref={videoRef} controls width="600">
        <source src=""></source>
      </video>
      <button onClick={handlePlay}>Play Video</button>
    </div>
  );
};

export default VideoPlayer;
