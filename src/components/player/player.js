import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StyledPlayer } from '../styles/player.style';
import { useState, useEffect, useRef } from 'react';
import { getPlaybackState, shuffleTrack, skipTrack, playPauseTrack, repeatTrack, setSeekPosition, setVolume, token, transferPlayback } from '../../hooks/index';
import '../../css/App.css';
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";
import { IoIosSkipBackward, IoIosPlay, IoIosPause, IoIosSkipForward } from "react-icons/io";
import { HiOutlineQueueList, HiOutlineSpeakerWave } from "react-icons/hi2";


const Player = ({fetchCurrentTrack, currentTrack, currentIndex, setCurrentIndex, tracks}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [player, setPlayer] = useState(undefined);

    const [isActive, setIsActive] = useState(false);
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
    const changeTrack = async (type) => {
        try{
            await skipTrack(type);
            setTimeout(() => {
                fetchCurrentTrack();
                // clearInterval(intervalRef.current);
                // setTimeout(() => {
                //     setProgress(currentTrack?.progress_ms === null ? 0 : currentTrack?.progress_ms);
                //     startTimer();
                // }, 300);
            }, 600);
        }
        catch (error) {
            console.log(error);
        }
    };

    const isPlayingTrack = async () => {
        const type = isPlaying === true ? 'pause': 'play';
        try{
            await playPauseTrack(type, '');
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

    const seekPosition = async (value) => {
        setProgress(parseInt(value))
        try{
            await setSeekPosition(value);
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

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // isPlayingTrack();
    }

    const handleRepeat = () => {
        setIsRepeating(!isRepeating);
        isRepeatingTrack();
    }

    const handleQueue = () => {
        setOpenQueue(!openQueue);
        
        if(openQueue === true) {
            navigate('/queue');
        } else {
            navigate(-1);
        }
    }

    useEffect(() => {
        fetchCurrentTrack();
        fetchPlayerState();

        // setIsPlaying(playerState?.is_playing);
        // isPlayingTrack();
        setIsShuffle(playerState?.is_playing);
        // isShuffleTrack();
    }, []);


    let audioSrc = tracks[currentIndex]?.queue.preview_url;
    const audioRef = useRef(new Audio(tracks[1]?.currently_playing.preview_url));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const {duration} = audioRef.current;
    const currentPercentage = duration ? (progress / duration) * 100 : 0;

    // const startTimer = () => {
    //     clearInterval(intervalRef.current);

    //     intervalRef.current = setInterval(() => {
    //         if (audioRef.current.ended) {
    //             // changeTrack('next');
    //             handleNext();
    //         } else {
    //             setProgress(audioRef.current.currentTime);
    //         }
    //     }, 1000);
    // };

    // useEffect(() => {
    //     console.log(currentTrack?.item?.preview_url);
    // }, []);
    // useEffect(() => {
    //     if (audioRef.current.src) {
    //         if (isPlaying) {
    //             audioRef.current.play();
    //             // setProgress(currentTrack?.progress_ms == null || currentTrack?.progress_ms == undefined ? 0 : currentTrack?.progress_ms);
    //             startTimer();
    //         } else {
    //             clearInterval(intervalRef.current);
    //             audioRef.current.pause();
    //         }
    //     } else {
    //         if (isPlaying) {
    //           audioRef.current = new Audio(audioSrc);
    //           audioRef.current.play();
    //           startTimer();
    //         } else {
    //           clearInterval(intervalRef.current);
    //           audioRef.current.pause();
    //         }
    //       }
    // }, [isPlaying]);

    // useEffect(() => {
    //     audioRef.current.pause();
    //     audioRef.current = new Audio(audioSrc);
    
    //     setProgress(audioRef.current.currentTime);
    
    //     if (isReady.current) {
    //       audioRef.current.play();
    //       setIsPlaying(true);
    //       startTimer();
    //     } else {
    //       isReady.current = true;
    //     }
    //   }, [currentIndex]);

    // useEffect(() => {
    //     return () => {
    //       audioRef.current.pause();
    //       clearInterval(intervalRef.current);
    //     };
    // }, []);

    // const handleNext = () => {
    //     if (currentIndex < tracks.length - 1) {
    //       setCurrentIndex(currentIndex + 1);
    //     } else setCurrentIndex(1);
    //   };
    // useEffect(() => {
    //     audioRef.current.pause();
    //     audioRef.current = new Audio(currentTrack?.item?.preview_url);

    //     setProgress(audioRef.current.currentTime);

    //     audioRef.current.play();
    //     setIsPlaying(true);

    // }, [currentTrack]);

    // useEffect(() => {
    //     // if((progress / currentTrack?.item?.duration_ms) * 100 > 100) {
    //     //     clearInterval(intervalRef.current);
    //     //     fetchCurrentTrack();
    //     //     setTimeout(() => {
    //     //         setProgress(currentTrack?.progress_ms == null || currentTrack?.progress_ms == undefined ? 0 : currentTrack?.progress_ms);
    //     //         startTimer();
    //     //     }, 300);
    //     // }
    //     console.log(progress, duration, (progress * 100 ) / currentTrack?.item?.duration_ms, 100);
    // }, [progress]);

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
    
            player.addListener('ready', async ({ device_id }) => {
                localStorage.setItem('deviceId', device_id);
                await transferPlayback(device_id);
            });

            player.previousTrack().then(() => {
                fetchCurrentTrack();
            });
            
            player.togglePlay().then(() => {});

            player.nextTrack().then(() => {
                fetchCurrentTrack();
            });

            player.seek().then(() => {
                console.log('Changed position!');
            });
    
            // player.addListener('not_ready', ({ device_id }) => {
            //     console.log('Device ID has gone offline', device_id);
            // });

            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
            
                setIsPlaying(state.paused);
            
            
                player.getCurrentState().then( state => { 
                    (!state)? setIsActive(false) : setIsActive(true) 
                });
            
            }));
            
    
    
            player.connect();
    
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
                    <button className="save-track-btn">
                        <FaRegHeart  />
                    </button>
                </div>
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
                            <button className="controls-btn" onClick={() => player.nextTrack()}>
                                <IoIosSkipForward />
                            </button>
                            <button className={(isRepeating == true) ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleRepeat}>
                                <IoRepeatOutline />
                            </button>
                        </div>
                    </div>
                    <div className='playback-slider'>
                        <span>{`${Math.floor((progress / 1000 / 60) % 60)}:${Math.floor((progress / 1000) % 60) < 10 ? Math.floor((progress / 1000) % 60).toString().padStart(2,'0') : Math.floor((progress / 1000) % 60).toString().padEnd(2,'0')}`}</span>
                        <div className='slider-bar-container'>
                            <input 
                            className='slider-bar' 
                            type='range'
                            min={0}
                            value={(progress / currentTrack?.item?.duration_ms) * 100}
                            max={100}
                            // onChange={e => setProgress(parseInt(e.target.value))}
                            onMouseUp={e => {setProgress(e.target.value); player.seek(e.target.value);}}/>  
                        </div>
                        {/* <span>{`${Math.floor((duration / 1000 / 60) % 60)}:${Math.floor((duration / 1000) % 60) < 10 ? Math.floor((duration / 1000) % 60).toString().padStart(2,'0') : Math.floor((duration / 1000) % 60).toString().padEnd(2,'0')}`}</span> */}
                        <span>{`${Math.floor((currentTrack?.item?.duration_ms / 1000 / 60) % 60)}:${Math.floor((currentTrack?.item?.duration_ms / 1000) % 60) < 10 ? Math.floor((currentTrack?.item?.duration_ms / 1000) % 60).toString().padStart(2,'0') : Math.floor((currentTrack?.item?.duration_ms / 1000) % 60).toString().padEnd(2,'0')}`}</span>
                    </div>
                </div>
                <div className='more-options-col'>
                    <button className={openQueue == true ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleQueue}>
                        <HiOutlineQueueList />
                    </button>
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
                            placeholder={100}
                            onChange={e => setVolumeValue(e.target.value)}
                            onMouseUp={e => trackVolume(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        </StyledPlayer>
    );
}
export default Player;