import React from 'react';

export default function TrackResults({ track, selectTrack }) {
  function handlePlay() {
    selectTrack(track);
  };

  // format song duration from milliseconds into MM:SS
  const formatDuration = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section onClick={handlePlay} className="w-full py-4 px-8 flex items-center group hover:bg-[#1a1c1d] hover:rounded-lg hover:cursor-pointer transition-all ease-in duration-300">
      <img
        src={track.albumUrl}
        alt={track.artist}
        className="w-[72px] h-[72px] my-2"
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-3 ml-6 gap-2">
        <div className="flex flex-col justify-start">
          <div className="text-white font-medium group-hover:text-green-400 transition-all ease-in duration-300">
            {track.title}
          </div>
          <div className="text-slate-400 font-normal">
            {track.artist}
          </div>
        </div>
        <div className="flex items-center text-slate-400 font-normal">
          {track.albumName}
        </div>
        <div className="hidden md:flex justify-end items-center text-slate-400 font-normal">
          {formatDuration(track.duration)}
        </div>
      </div>
    </section>
  );
};