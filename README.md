# soundstream
### <p align="center">Tada~ a Spotify clone! :notes:</p>
<p align="center">(For API practice)</p>

<p align="center">:sparkles: <a href="https://soundstream.herokuapp.com/">Visit deployed application here</a> :sparkles:</p>

![screenshot](/../main/client/src/assets/screenshots/lyrics.png)

## Technologies Used
- [Spotify API](https://developer.spotify.com/)
- [ReactJS](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- JavaScript
- [Tailwind CSS](https://tailwindcss.com/)
- HTML
- npm packages:
    - [concurrently](https://www.npmjs.com/package/concurrently)
    - [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node)
    - [react-spotify-web-playback](https://github.com/gilbarbara/react-spotify-web-playback)
    - [lyrics-finder](https://www.npmjs.com/package/lyrics-finder)
    - [dotenv](https://github.com/motdotla/dotenv#readme)
    - [Boxicons](https://boxicons.com/)

## Installation
1. Install [NodeJS](https://nodejs.org/en/) in your operating system
2. Install ***all*** of the dependencies listed above via command-line in terminal by entering `npm install`
3. Create a Spotify account, and then [create a new app](https://developer.spotify.com/dashboard/applications) to retrieve a `Client ID`. Then enter `http://localhost:3000/callback` under `Redirect URIs`.
4. Create a `.env` file with the following variables:
```
CLIENT_ID=(replace this with your client ID)
CLIENT_SECRET=(replace this with your client secret)
REDIRECT_URI=http://localhost:3000/callback
REACT_APP_SPOTIFY_CLIENT_ID=(replace this with your client ID)
```
5. Execute the following command in the root to compile the development build:
```
npm run develop
```

## Usage
Enter `npm run develop` at the root directory in terminal. This will start up the React app and initialize the back-end at the same time. The application will open automatically in your browser. Once the application loads, login with your [Spotify](https://open.spotify.com/) account. Search for an artist or song within the search box at the top left corner of the screen. Let the music move you. :musical_note:

![screenshot: search results](/../main/client/src/assets/screenshots/song-search.png)

## Questions
For any questions about this repository, please contact me at [hayashi.demi@gmail.com](mailto:hayashi.demi@gmail.com).

Visit my GitHub to view more of my works at [github.com/demivlkv](https://github.com/demivlkv)!
