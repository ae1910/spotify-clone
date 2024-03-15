import { IoIosPlay } from "react-icons/io";
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import { LuClock3 } from "react-icons/lu";
import Track from "../components/track";
import { Link, useLocation } from "react-router-dom";
import { getPlaylist, getAlbum, getSavedTracks } from "../hooks";
import { useEffect, useState } from "react";
import likedSongsImg from '../img/liked-songs-300.png';

function Playlist({playingTrack, playingList}) {
    const location = useLocation();
    const { id, type } = location.state;

    const [playlist, setPlaylist] = useState({});

    const fetchData = async () => {
        let getFunction;
        if(type == 'playlist') {
            getFunction = getPlaylist(id, 100);
        } else if(type == 'album') {
            getFunction = getAlbum(id);
        } else {
            getFunction = getSavedTracks();
        }
        try{
            const response = await getFunction;
            const json = await response.json();
            setPlaylist(json);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div className="playlist-view-container">
            <div className="playlist-info-container">
                <div className="playlist-image">
                    <img src={type == 'liked songs' ? likedSongsImg : playlist?.images ? playlist?.images[0]?.url : ''}/>
                </div>
                <div className="playlist-info">
                    <p>{type == 'liked songs'? 'Playlist' : playlist?.type?.substring(0, 1).toUpperCase() + playlist?.type?.substring(1)}</p>
                    <h1>{type == 'liked songs'? 'Liked Songs' : playlist?.name}</h1>
                    {type !== 'playlist' ? <></> : <span className="playlist-description">{playlist?.description}</span>}
                    <div className="metadata">
                    <div className="user">
                        {type == 'album' ? 
                            <Link to={playlist.artists ? playlist?.artists[0]?.external_urls?.spotify : ''} target="_blank" rel="noopener noreferrer">{playlist.artists ? playlist?.artists[0]?.name : ''}</Link>
                            : type == 'liked songs' ? <Link to={playlist?.external_urls?.spotify} target="_blank" rel="noopener noreferrer">{playlist?.owner?.display_name}</Link>
                            : <Link to={playlist?.external_urls?.spotify} target="_blank" rel="noopener noreferrer">{playlist?.owner?.display_name}</Link>
                        }
                    </div>
                    {type == 'album' ? <p>{new Date(playlist?.release_date).getFullYear()}</p> : <></>}
                    {type == 'album' ? <p>{playlist?.total_tracks?.toLocaleString()} songs</p> : type == 'liked songs' ? <p>{playlist?.total?.toLocaleString()} songs</p> : <p>{playlist?.tracks?.total?.toLocaleString()} songs</p>}
                    </div>
                </div>
            </div>
            <div className="playlist-container">
                <div className="playlist-options">
                    <button className="playlist-play-btn" onClick={type == 'liked songs' ? '' : () => playingList(playlist?.uri)}>
                        <IoIosPlay />
                    </button>
                    <button className="playlist-save-btn">
                        <FaRegHeart  />
                    </button>
                    <button className="playlist-more-btn">
                        <PiDotsThreeBold />
                    </button>
                </div>
                <div className="playlist-layout">
                    <div className="playlist-header layout-grid">
                        <div className='col col-1' role="column-header">#</div> 
                        <div className='col col-2' role="column-header">Title</div> 
                        {type == 'album' ? <></> : <div className='col col-3' role="column-header">Album</div>} 
                        {type == 'album' ? <></> : <div className='col col-4' role="column-header">Date Added</div>}
                        <div className='col col-5' role="column-header">
                            <LuClock3 />
                        </div>
                    </div>
                    {type == 'liked songs' ?
                        <div className="playlist-items">
                            {playlist?.items?.map((item, i) =>
                                <Track 
                                key={i}
                                id={i + 1}
                                type={type}
                                item={item}
                                playingTrack={playingTrack}/>
                            )}
                        </div>
                        : <div className="playlist-items">
                            {playlist?.tracks?.items?.map((item, i) =>
                                <Track 
                                key={i}
                                id={i + 1}
                                type={type}
                                item={item}
                                playingTrack={playingTrack}/>
                            )}
                        </div>
                    }
                </div>
            </div>
            {type == 'album' ?
                <div className='metadata-copyright'>
                    <p>{`${new Date(playlist?.release_date).toLocaleString('default', { month: 'long' })} ${new Date(playlist?.release_date).getDate()}, ${new Date(playlist?.release_date).getFullYear()}`}</p>
                    {playlist?.copyrights?.map((copyright, i) =>
                        <p>{copyright.text}</p>
                    )}
                </div> 
                : <></>
            }
        </div>
    )
}

export default Playlist