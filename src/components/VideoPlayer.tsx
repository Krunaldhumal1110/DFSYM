import React, { useState, useCallback } from 'react';

interface VideoPlayerProps {
  videos: string[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => {
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());

  const handleVideoLoad = useCallback((idx: number) => {
    setLoadedVideos((prev) => new Set(prev).add(idx));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map((src, idx) => (
        <div key={idx} className="aspect-video w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {!loadedVideos.has(idx) ? (
            <button
              onClick={() => handleVideoLoad(idx)}
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-maroon-700 to-maroon-900 hover:from-maroon-600 hover:to-maroon-800 transition-all"
              aria-label={`Load video ${idx + 1}`}
            >
              <svg className="w-16 h-16 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ) : (
            <iframe
              src={src}
              title={`Video ${idx + 1}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="w-full h-full rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoPlayer;
