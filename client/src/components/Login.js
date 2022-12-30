import React from 'react';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-gray-700 flex justify-center items-center">
      <a href={AUTH_URL}>
        <button className="py-3 px-6 bg-green-400 hover:bg-green-500 text-white font-medium uppercase rounded-full transition-all ease-in duration-300">
          Login with Spotify
        </button>
      </a>
    </div>
  );
};