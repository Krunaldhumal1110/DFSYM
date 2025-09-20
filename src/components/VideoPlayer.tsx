import React from 'react';

interface VideoPlayerProps {
  videos: string[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {videos.map((src, idx) => (
      <div key={idx} className="aspect-video w-full">
        <iframe
          src={src}
          title={`Video ${idx + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>
    ))}
  </div>
);

export default VideoPlayer;
