//TOKENS
const EXPIRATION_TIME = 3600 * 1000;

const setTokenTimestamp = () => window.localStorage.setItem('tokenTimestamp', Date.now());
const setLocalAccessToken = token => {
    setTokenTimestamp();
    localStorage.setItem('accessToken', token);
};
const setLocalRefreshToken = token => localStorage.setItem('refreshToken', token);
const getTokenTimestamp = () => localStorage.getItem('tokenTimestamp');
const getLocalAccessToken = () => localStorage.getItem('accessToken');
const getLocalRefreshToken = () => localStorage.getItem('refreshToken');


const refreshAccessToken = async () => {
    try {
        const response = await fetch(`https://spotifiy-limited-api.onrender.com/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = response;
        setLocalAccessToken(access_token);
        window.location.reload();
        return;
    } catch (error) {
        console.log(error);
    }
};

export const getAccessToken = () => {
    const hashParams = {};
    let params;
    const exclude = /([^&;=]+)=?([^&;]*)/g;
    const hash = window.location.hash.substring(1);
    while ((params = exclude.exec(hash))) {
        hashParams[params[1]] = decodeURIComponent(params[2]);
    } 

    const access_token = hashParams.access_token;
    const refresh_token = hashParams.refresh_token;
    const error = hashParams.error;
  
    if (error) {
        console.error(error);
        refreshAccessToken();
    }

  
    // If token expired
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        setLocalRefreshToken(refresh_token);
        refreshAccessToken();
    }
  
    const localAccessToken = getLocalAccessToken();
  
    console.log(localAccessToken === 'undefined')
    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    if ((!localAccessToken || localAccessToken === 'undefined') || access_token) {
        setLocalAccessToken(access_token);
        setLocalRefreshToken(refresh_token);
        return access_token;
    }
  
    return localAccessToken;
};
  
export const token = getAccessToken();

export const logout = () => {
    window.localStorage.removeItem('tokenTimestamp');
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.location.reload();
};

//API CALLS
const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
};


// Get a List of Current User's Playlists
// --> https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
export const getProfile = () => fetch('https://api.spotify.com/v1/me ', { 
    method:'GET', 
    headers
});

// Get a List of Current User's Playlists
// --> https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export const getLibrary = () => fetch('https://api.spotify.com/v1/me/playlists?limit=50 ', { 
    method:'GET', 
    headers
});

// Get a List of New Releases
// --> https://developer.spotify.com/documentation/web-api/reference/get-new-releases
export const getNewReleases = () => fetch('https://api.spotify.com/v1/browse/new-releases ', { 
    method:'GET', 
    headers
});

// Get a List of Recently Played Tracks
// --> https://developer.spotify.com/documentation/web-api/reference/get-recently-played
export const getRecentlyPlayed = () => fetch('https://api.spotify.com/v1/me/player/recently-played ', { 
    method:'GET', 
    headers
});

// Get a List of Recommended Tracks
// --> https://developer.spotify.com/documentation/web-api/reference/get-recommendations
export const getRecommendations = (topTracksIds) => fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${topTracksIds.join(',')}`, { 
    method:'GET', 
    headers
});

// Get a Playlist
// --> https://developer.spotify.com/documentation/web-api/reference/get-playlist
export const getPlaylist = (id, limit) => fetch(`https://api.spotify.com/v1/playlists/${id}?limit=${limit}`, { 
    method:'GET', 
    headers
});

// Get Categories
// --> https://developer.spotify.com/documentation/web-api/reference/get-playlist
export const getCategories = () => fetch(`https://api.spotify.com/v1/browse/categories/?limit=50`, { 
    method:'GET', 
    headers
});

// Get a Album
// --> https://developer.spotify.com/documentation/web-api/reference/get-an-album
export const getAlbum = (id) => fetch(`https://api.spotify.com/v1/albums/${id}`, { 
    method:'GET', 
    headers
});

// Get a List of Saved Tracks
// --> https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
export const getSavedTracks = () => fetch(`https://api.spotify.com/v1/me/tracks?limit=50`, { 
    method:'GET', 
    headers
});

// Get Search Results
// --> https://developer.spotify.com/documentation/web-api/reference/search
export const getSearchResult = (query, type, limit) => fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`, { 
    method:'GET', 
    headers
});

// Get Currently Playing Track
// --> https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
export const getCurrentTrack = () => fetch(`https://api.spotify.com/v1/me/player/currently-playing`, { 
    method:'GET', 
    headers
});

// Get Playback State
// --> https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
export const getPlaybackState = () => fetch(`https://api.spotify.com/v1/me/player`, { 
    method:'GET', 
    headers
});

// Transfers playback to a new device
// --> https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track & https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
export const transferPlayback = (id) => fetch(`https://api.spotify.com/v1/me/player`, { 
    method:'PUT', 
    headers,
    body: JSON.stringify({
        'device_ids': [id]
    })
});

// Toggle Shuffle
// --> https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track & https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
export const shuffleTrack = (type) => fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${type}`, { 
    method:'PUT', 
    headers
});

// Skip To Next or Previous Track
// --> https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track & https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
export const skipTrack = (type) => fetch(`https://api.spotify.com/v1/me/player/${type}`, { 
    method:'POST', 
    headers
});

// Play or Pause Track
// --> https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback & https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
export const playPauseTrack = (type) => fetch(`https://api.spotify.com/v1/me/player/${type}`, { 
    method:'PUT', 
    headers
});

// Play  Track
// --> https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
export const playList = (uri) => fetch(`https://api.spotify.com/v1/me/player/play`, { 
    method:'PUT', 
    headers,
    body: JSON.stringify({
        'context_uri': uri
    }) 
});

// Play  Track
// --> https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
export const playTrack = (uri) => fetch(`https://api.spotify.com/v1/me/player/play`, { 
    method:'PUT', 
    headers,
    body: JSON.stringify({ 
        'uris': uri
    })
});

// Toggle Repeat
// --> https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback & https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
export const repeatTrack = (type) => fetch(`https://api.spotify.com/v1/me/player/repeat?state=${type}`, { 
    method:'PUT', 
    headers
});

// Seek To Position
// --> https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback & https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
export const setSeekPosition = (value) => fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${value}`, { 
    method:'PUT', 
    headers
});

// Seek To Position
// --> https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback
export const setVolume = (value) => fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${value}`, { 
    method:'PUT', 
    headers
});

// Get Queue List
// --> https://developer.spotify.com/documentation/web-api/reference/get-queue
export const getQueue = () => fetch(`https://api.spotify.com/v1/me/player/queue`, { 
    method:'GET', 
    headers
});

export const getHomepage = () => 
    Promise.all([getNewReleases(), getRecentlyPlayed(), getPlaylist('37i9dQZEVXbMDoHDwVN2tF', 20)]);
;
export const getSearchResults = (query) => 
    Promise.all([getSearchResult(query, 'track', 5), getSearchResult(query, 'artist', 10), getSearchResult(query, 'album', 10), getSearchResult(query, 'playlist', 10)]);
;

