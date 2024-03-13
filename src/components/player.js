import { Link, useLocation } from 'react-router-dom';
import { StyledPlayer } from './styles/player.style';
import { useState, useEffect } from 'react';
import { getCurrentTack, skipToNext, skipToPrevious } from '../hooks/index';
import '../css/App.css';
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";
import { IoIosSkipBackward, IoIosPlay, IoIosPause, IoIosSkipForward } from "react-icons/io";
import { HiOutlineQueueList, HiOutlineSpeakerWave } from "react-icons/hi2";


const Player = () => {
    const { pathname } = useLocation();
    const [currentTrack, setCurrentTrack] = useState({});

    
    const fetchData = async () => {
        try{
            const response = await getCurrentTack();
            const json = await response.json();
            console.log(json)
            setCurrentTrack(json);
        }
        catch (error) {
            console.log(error);
        }
    };
    const skipNext = async () => {
        try{
            const response = await skipToNext();
            const json = await response.json();
            console.log(json)
            setCurrentTrack(json);
        }
        catch (error) {
            console.log(error);
        }
    };
    const skipBack = async () => {
        try{
            const response = await skipToPrevious();
            // const json = await response.json();
            console.log(response)
            // setCurrentTrack(json);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData()
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
                            <button className="controls-btn">
                                <IoShuffleOutline />
                            </button>
                            <button className="controls-btn" onClick={skipBack}>
                                <IoIosSkipBackward />
                            </button>
                        </div>
                        <button className="play-pause-btn">
                            <IoIosPlay />
                            {/* <IoIosPause/ /> */}
                        </button>
                        <div className='player-controls right'>
                            <button className="controls-btn" onClick={skipNext}>
                                <IoIosSkipForward />
                            </button>
                            <button className="controls-btn">
                                <IoRepeatOutline />
                            </button>
                        </div>
                    </div>
                    <div className='playback-slider'>
                        <span>{`${Math.floor((currentTrack?.progress_ms / 1000 / 60) % 60)}:${Math.floor((currentTrack?.progress_ms / 1000) % 60).toString().padEnd(2,'0')}`}</span>
                        <div className='slider-bar-container'>
                            <input className='slider-bar' type='range'/>  
                        </div>
                        <span>{`${Math.floor((currentTrack?.item?.duration_ms / 1000 / 60) % 60)}:${Math.floor((currentTrack?.item?.duration_ms / 1000) % 60).toString().padEnd(2,'0')}`}</span>
                    </div>
                </div>
                <div className='more-options-col'>
                    <button className="controls-btn">
                        <HiOutlineQueueList />
                    </button>
                    <div className='volume'>
                        <button className="volume-btn">
                            <HiOutlineSpeakerWave />
                            {/* <HiOutlineSpeakerXMark /> */}
                        </button>
                        <div className='volume-bar-container'>
                            <input className='slider-bar' type='range'/>
                        </div>
                    </div>
                </div>
            </div>
        </StyledPlayer>
    );
}
export default Player;