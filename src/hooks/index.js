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
  
    // If token has expired
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

// Get a List of Popular Tracks
// --> https://developer.spotify.com/documentation/web-api/reference/get-playlist
export const getPlaylist = (id, limit) => fetch(`https://api.spotify.com/v1/playlists/${id}?limit=${limit}`, { 
    methods:'GET', 
    headers
});

export const getHomepage = (limit) => 
    Promise.all([getNewReleases(), getRecentlyPlayed(), getPlaylist(limit)]);
;

