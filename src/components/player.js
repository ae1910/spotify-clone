import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StyledPlayer } from './styles/player.style';
import { useState, useEffect, useRef } from 'react';
import { getCurrentTrack, shuffleTrack, skipTrack, playPauseTrack, repeatTrack, setSeekPosition, setVolume } from '../hooks/index';
import '../css/App.css';
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";
import { IoIosSkipBackward, IoIosPlay, IoIosPause, IoIosSkipForward } from "react-icons/io";
import { HiOutlineQueueList, HiOutlineSpeakerWave } from "react-icons/hi2";


const Player = ({fetchCurrentTrack, currentTrack}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // const [currentTrack, setCurrentTrack] = useState({});
    const [isShuffle, setIsShuffle] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [progress, setProgress] = useState(0);
    const [openQueue, setOpenQueue] = useState(false);
    const [volumeValue, setVolumeValue] = useState(100);

    
    
    const isShuffleTrack = async () => {
        try{
            await shuffleTrack(isShuffle);
        }
        catch (error) {
            console.log(error);
        }
    };
    const changeTrack = async (type) => {
        setProgress(0);
        try{
            await skipTrack(type);
            setTimeout(() => {
                fetchCurrentTrack();
            }, "600");
            setIsPlaying(currentTrack?.is_playing);
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

    const isRepeatTrack = async () => {
        const type = isRepeat === true ? 'track': 'off';
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
        isPlayingTrack();
    }

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
        isRepeatTrack();
    }

    const handleQueue = () => {
        setOpenQueue(!openQueue);
        
        if(!openQueue === true) {
            navigate('/queue');
        } else {
            navigate(-1);
        }
    }

    useEffect(() => {
        fetchCurrentTrack();
        setProgress(currentTrack?.progress_ms);
    }, []);

    const intervalRef = useRef();

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            if (progress >= currentTrack?.item?.duration_ms) {
                setTimeout(() => {
                    fetchCurrentTrack();
                }, "600");
                setProgress(currentTrack?.progress_ms);
            } else {
                setProgress(prev => prev + 1000);
            }
        }, [1000]);
    };

    useEffect(() => {
        if (isPlaying) {
            startTimer();
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isPlaying]);


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
                            <button className={isShuffle == true ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleShuffle}>
                                <IoShuffleOutline />
                            </button>
                            <button className="controls-btn" onClick={() => changeTrack('previous')}>
                                <IoIosSkipBackward />
                            </button>
                        </div>
                        <button className="play-pause-btn" onClick={handlePlayPause}>
                            {isPlaying ? <IoIosPause /> : <IoIosPlay />}
                        </button>
                        <div className='player-controls right'>
                            <button className="controls-btn" onClick={() => changeTrack('next')}>
                                <IoIosSkipForward />
                            </button>
                            <button className={isRepeat == true ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleRepeat}>
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
                            value={progress}
                            max={currentTrack?.item?.duration_ms}
                            onChange={e => setProgress(parseInt(e.target.value))}
                            onMouseUp={e => seekPosition(e.target.value)}/>  
                        </div>
                        <span>{`${Math.floor((currentTrack?.item?.duration_ms / 1000 / 60) % 60)}:${Math.floor((currentTrack?.item?.duration_ms / 1000) % 60) < 10 ? Math.floor((currentTrack?.item?.duration_ms / 1000) % 60).toString().padStart(2,'0') : Math.floor((currentTrack?.item?.duration_ms / 1000) % 60).toString().padEnd(2,'0')}`}</span>
                    </div>
                </div>
                <div className='more-options-col'>
                    <button className={!openQueue ? 'controls-btn active-btn' : 'controls-btn'} onClick={handleQueue}>
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