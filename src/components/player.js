import { Link, useNavigate } from 'react-router-dom';
import { StyledPlayer } from './styles/player.style';
import { useState, useEffect, useRef } from 'react';
import { getPlaybackState, shuffleTrack, repeatTrack, setVolume, token, transferPlayback } from '../hooks/index';
import '../css/App.css';
// import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";
import { IoIosSkipBackward, IoIosPlay, IoIosPause, IoIosSkipForward } from "react-icons/io";
import { HiOutlineQueueList, HiOutlineSpeakerWave } from "react-icons/hi2";


const Player = ({fetchCurrentTrack, currentTrack, accountType}) => {
    const navigate = useNavigate();

    const [player, setPlayer] = useState(undefined);

    const [playerState, setPlayerState] = useState({});
    const [isShuffle, setIsShuffle] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [openQueue, setOpenQueue] = useState(false);
    const [volumeValue, setVolumeValue] = useState(100);

    
    const fetchPlayerState = async () => {
        try{
            const response = await getPlaybackState();
            const json = await response.json();
            setPlayerState(json);
        }
        catch (error) {
            console.log(error);
        }
    };
    const isShuffleTrack = async () => {
        try{
            await shuffleTrack(isShuffle);
        }
        catch (error) {
            console.log(error);
        }
    };
    const isRepeatingTrack = async () => {
        const type = isRepeating === true ? 'track' : 'off';
        try{
            await repeatTrack(type);
        }
        catch (error) {
            console.log(error);
        }
    };
    const trackVolume = async (value) => {
        try{
            await setVolume(value);
        }
        catch (error) {
            console.log(error);
        }
    };


    const handleShuffle = () => {
        setIsShuffle(!isShuffle);
        isShuffleTrack();
    }

    const handleRepeat = () => {
        setIsRepeating(!isRepeating);
        isRepeatingTrack();
    }

    const handleQueue = () => {
        setOpenQueue(!openQueue);
        
        if(!openQueue === true) {
            navigate('/queue');
        } else {
            navigate(-1);
        }
    }


    const intervalRef = useRef();

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
                setProgress(prev => prev + 1000);
        }, 1000);
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: volumeValue / 100
            });
    
            setPlayer(player);

            if (player) {
                player.addListener('ready', async ({ device_id }) => {
                    localStorage.setItem('deviceId', device_id);
                    await transferPlayback(device_id);
                    
                    fetchCurrentTrack();
                    fetchPlayerState();
                    setOpenQueue(false);
                    setIsShuffle(playerState?.shuffle_state);
                    setProgress(currentTrack?.progress_ms == null || currentTrack?.progress_ms == undefined ? 0 : currentTrack?.progress_ms);
                });

                player.previousTrack().then(() => {
                });
                
                player.togglePlay().then(() => {
                    setIsPlaying(!isPlaying);
                });

                player.nextTrack().then(() => {
                });

        
                player.addListener('player_state_changed', ( state => {
                    if (!state) {
                        return;
                    }
                    fetchCurrentTrack();
                    clearInterval(intervalRef.current);
                    setIsPlaying(state.paused);
                    setProgress(currentTrack?.progress_ms == null || currentTrack?.progress_ms == undefined ? 0 : currentTrack?.progress_ms);
                    if(!state.paused) {
                        startTimer();
                    }
                }));
                
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });

                player.addListener('authentication_error', ({ message }) => {
                    console.error(message);
                });

                player.addListener('account_error', ({ message }) => {
                    console.error(message);
                });
        
                player.connect();
            }
        };
    }, []);

    return (
        <StyledPlayer>
            <div className='player-container'>
                <div className="track-col">
                    <div className="track-image">
                        <img src={currentTrack && currentTrack?.item?.album?.images ? currentTrack?.item?.album.images[1]?.url : ''}/>
                    </div>
                    <div className="track-info">
                        <Link to={`album/${currentTrack?.item?.album?.id}`} className="track-title">{currentTrack?.item?.name}</Link>
                        <div className="track-artists">
                            {currentTrack?.item?.artists?.map((artist, index) =>
                                <>
                                    {currentTrack?.item?.artists?.length !== 1 && currentTrack?.item?.artists[0] !== artist ? ", " : " "}
                                    <Link key={index} to={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="artists">{artist.name}</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {accountType === 'premium' ?
                    <div className='controls-col'>
                        <div className='controls'>
                            <div className='player-controls left'>
                                <button className={(!isShuffle === true) ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleShuffle}>
                                    <IoShuffleOutline />
                                </button>
                                <button className="controls-btn" onClick={() => player.previousTrack()}>
                                    <IoIosSkipBackward />
                                </button>
                            </div>
                            <button className="play-pause-btn" onClick={() => player.togglePlay()}>
                                {(!isPlaying  == true) ? <IoIosPause /> : <IoIosPlay />}
                            </button>
                            <div className='player-controls right'>
                                <button className="controls-btn" onClick={() => {player.nextTrack(); setProgress(currentTrack?.progress_ms == null || currentTrack?.progress_ms == undefined ? 0 : currentTrack?.progress_ms);}}>
                                    <IoIosSkipForward />
                                </button>
                                <button className={(isRepeating == true) ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleRepeat}>
                                    <IoRepeatOutline />
                                </button>
                            </div>
                        </div>
                        <div className='playback-slider'>
                            <span>{`${Math.floor((progress % 360000) / 60000)}:${Math.floor((progress % 60000) / 1000).toString().padStart(2,'0')}`}</span>
                            <div className='slider-bar-container'>
                                <input 
                                className='slider-bar' 
                                type='range'
                                min={0}
                                value={progress}
                                max={currentTrack?.item?.duration_ms}/>  
                            </div>
                            <span>{`${Math.floor((currentTrack?.item?.duration_ms % 360000) / 60000)}:${Math.floor((currentTrack?.item?.duration_ms  % 60000) / 1000).toString().padStart(2,'0')}`}</span>
                        </div>
                    </div>
                    : ''
                }
                <div className='more-options-col'>
                    <button className={(openQueue === true) ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleQueue}>
                        <HiOutlineQueueList />
                    </button>
                    {accountType === 'premium' ?
                        <div className='volume'>
                            <button className="volume-btn">
                                <HiOutlineSpeakerWave />
                            </button>
                            <div className='volume-bar-container'>
                                <input 
                                className='slider-bar' 
                                type='range'
                                min={0}
                                value={volumeValue}
                                max={100}
                                onChange={e => setVolumeValue(e.target.value)}
                                onMouseUp={e => trackVolume(e.target.value)}/>
                            </div>
                        </div>
                        : ''
                    }
                </div>
            </div>
        </StyledPlayer>
    );
}
export default Player;