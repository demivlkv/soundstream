import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

import Auth from '../utils/Auth';
import TrackResults from './TrackResults';
import Player from './Player';
import SpotifyLogo from '../assets/spotify-logo.png';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID
})

export default function Dashboard({ code }) {
  const accessToken = Auth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [lyrics, setLyrics] = useState('');

  function selectTrack(track) {
    setCurrentTrack(track);
    setSearch('');
    setLyrics('');
  };

  // access lyrics
  useEffect(() => {
    if (!currentTrack) return;
    axios.get('https://soundstream.herokuapp.com/lyrics', {
      params: {
        track: currentTrack.title,
        artist: currentTrack.artist
      }
    })
    .then(res => {
      setLyrics(res.data.lyrics);
    })
  }, [currentTrack])

  // get access token
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // get search results
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then(res => {
      // prevent search results from appearing until user stops typing
      if (cancel) return;

      setSearchResults(res.body.tracks.items.map(track => {
        const smallAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.album.images[0]);

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallAlbumImage.url,
          albumName: track.album.name,
          duration: track.duration_ms
        }
      })
    )})
    return () => cancel = true;
  }, [search, accessToken]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#2c2e31]">
      <nav className="fixed top-0 left-0 w-full h-auto md:h-[100px] py-4 md:py-0 px-4 flex flex-col md:flex-row justify-between items-center bg-[#111417]">
        <div className="flex flex-col md:flex-row">
          <div className="text-green-400 text-center text-xs md:text-sm mr-0 md:mr-4 flex flex-col justify-center items-center">
            <a href="https://developer.spotify.com/" target="_blank" className="hover:opacity-50 transition-all ease-in duration-300">
              Powered by
              <img src={SpotifyLogo} alt="Powered by Spotify" className="h-[30px]" />
            </a>
          </div>
          <div className="flex items-center">
            <h1>
              Sound<span className="text-white">Stream</span>
              <i className="ml-3 bx bx-music bx-md bx-burst-hover"></i>
            </h1>
          </div>
        </div>
        <div className="search-bar w-full max-w-[550px] mr-4">
          <div className="relative">
						<div className="inline-flex items-center justify-center absolute left-4 top-0 h-full w-10 text-green-400 text-2xl">
              <i className="bx bx-search"></i>
						</div>
            <input
              type="search"
              placeholder="What do you want to listen to?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full m-2 py-3 pl-12 pr-6 bg-[#292d32] text-gray-200 border border-gray-700 placeholder:text-slate-400 placeholder:italic rounded-full focus:bg-[#212325] focus:border-green-300 focus:outline-none"
            />
          </div>
        </div>
      </nav>
      {/* DISPLAY SEARCH RESULTS & SONG LYRICS */}
      <main className="w-full mt-[180px] md:mt-[100px] mb-[100px] p-8 bg-gradient-to-b from-black to-[#2c2e31] text-gray-200 flex flex-col grow overscroll-y-auto">
        {searchResults.map(track => (
          <TrackResults
            track={track}
            key={track.uri}
            selectTrack={selectTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center whitespace-pre">
            {lyrics}
          </div>
        )}
      </main>
      {/* MUSIC PLAYER */}
      <section className="fixed bottom-0 left-0 w-full h-[100px] bg-gray-900 text-gray-200 flex">
        <Player accessToken={accessToken} trackUri={currentTrack?.uri} />
      </section>
    </div>
  );
};
