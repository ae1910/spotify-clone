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
        const response = await fetch(`http://localhost:8080/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = response;
        setLocalAccessToken(access_token);
        console.log(access_token);
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
  
    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
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
    methods:'GET', 
    headers
});

// Get a List of Current User's Playlists
// --> https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export const getLibrary = () => fetch('https://api.spotify.com/v1/me/playlists ', { 
    methods:'GET', 
    headers
});

// Get a List of New Releases
// --> https://developer.spotify.com/documentation/web-api/reference/get-new-releases
export const getNewReleases = () => fetch('https://api.spotify.com/v1/browse/new-releases ', { 
    methods:'GET', 
    headers
});

// Get a List of Recently Played Tracks
// --> https://developer.spotify.com/documentation/web-api/reference/get-recently-played
export const getRecentlyPlayed = () => fetch('https://api.spotify.com/v1/me/player/recently-played ', { 
    methods:'GET', 
    headers
});

// Get a List of Recommended Tracks
// --> https://developer.spotify.com/documentation/web-api/reference/get-recommendations
export const getRecommendations = (topTracksIds) => fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${topTracksIds.join(',')}`, { 
    methods:'GET', 
    headers
});

// Get a Playlist
// --> https://developer.spotify.com/documentation/web-api/reference/get-playlist
export const getPlaylist = (id, limit) => fetch(`https://api.spotify.com/v1/playlists/${id}?limit=${limit}`, { 
    methods:'GET', 
    headers
});

// Get Categories
// --> https://developer.spotify.com/documentation/web-api/reference/get-playlist
export const getCategories = () => fetch(`https://api.spotify.com/v1/browse/categories/?limit=50`, { 
    methods:'GET', 
    headers
});

// Get a Album
// --> https://developer.spotify.com/documentation/web-api/reference/get-an-album
export const getAlbum = (id) => fetch(`https://api.spotify.com/v1/albums/${id}`, { 
    methods:'GET', 
    headers
});

// Get a List of Saved Tracks
// --> https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
export const getSavedTracks = () => fetch(`https://api.spotify.com/v1/me/tracks?limit=50`, { 
    methods:'GET', 
    headers
});

// Get Search Results
// --> https://developer.spotify.com/documentation/web-api/reference/search
export const getSearchResult = (query, type, limit) => fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`, { 
    methods:'GET', 
    headers
});

// Get Currently Playing Track
// --> https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
export const getCurrentTack = () => fetch(`https://api.spotify.com/v1/me/player/currently-playing`, { 
    methods:'GET', 
    headers
});

// Skip To Next Song
// --> https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
export const skipToNext = () => fetch(`https://api.spotify.com/v1/me/player/currently-playing`, { 
    methods:'POST', 
    headers
});

// Skip To Previous Song
// --> https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
export const skipToPrevious = () => fetch(`https://api.spotify.com/v1/me/player/previous`, { 
    methods:'POST', 
    headers
});

export const getHomepage = () => 
    Promise.all([getNewReleases(), getRecentlyPlayed(), getPlaylist('37i9dQZEVXbMDoHDwVN2tF', 20)]);
;
export const getSearchResults = (query) => 
    Promise.all([getSearchResult(query, 'track', 5), getSearchResult(query, 'artist', 10), getSearchResult(query, 'album', 10), getSearchResult(query, 'playlist', 10)]);
;

