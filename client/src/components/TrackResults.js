import React from 'react';

export default function TrackResults({ track, selectTrack }) {
  function handlePlay() {
    selectTrack(track);
  };

  return (
    <section onClick={handlePlay} className="w-full p-4 flex items-center hover:bg-slate-900 hover:rounded-lg hover:cursor-pointer transition-all ease-in duration-300">
      <img
        src={track.albumUrl}
        alt={track.artist}
        className="w-[72px] h-[72px] my-2"
      />
      <div className="flex flex-col ml-4">
        <div className="">
          {track.title}
        </div>
        <div className="text-slate-400">
          {track.artist}
        </div>
      </div>
    </section>
  );
};