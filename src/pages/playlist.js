import { IoIosPlay } from "react-icons/io";
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import { LuClock3 } from "react-icons/lu";
import Track from "../components/track";
import { Link, useLocation } from "react-router-dom";
import { getPlaylist } from "../hooks";
import { useEffect, useState } from "react";

function Playlist() {
    const location = useLocation();
    const { id } = location.state;

    const [playlist, setPlaylist] = useState({});

    const fetchData = async () => {
        try{
            const response = await getPlaylist(id, 100);
            const json = await response.json();
            console.log(json);
            setPlaylist(json);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="playlist-view-container">
            <div className="playlist-info-container">
                <div className="playlist-image">
                    <img src={playlist?.images[0]?.url}/>
                </div>
                <div className="playlist-info">
                    <p>{playlist?.type?.substring(0, 1).toUpperCase() + playlist?.type?.substring(1)}</p>
                    <h1>{playlist?.name}</h1>
                    <span className="playlist-description">{playlist?.description}</span>
                    <div className="metadata">
                        <div className="user">
                            <div className="user-image">
                                <img src=""/>
                            </div>
                            <Link to={playlist?.external_urls?.spotify} target="_blank" rel="noopener noreferrer">{playlist?.owner?.display_name}</Link>
                        </div>
                        <p>{playlist?.tracks?.total} songs</p>
                    </div>
                </div>
            </div>
            <div className="playlist-container">
                <div className="playlist-options">
                    <button className="playlist-play-btn">
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
                        <div className='col col-3' role="column-header">Album</div> 
                        <div className='col col-4' role="column-header">Date Added</div>
                        <div className='col col-5' role="column-header">
                            <LuClock3 />
                        </div>
                    </div>
                    <div className="playlist-items">
                        {playlist?.tracks?.items?.map((item, i) =>
                            <Track 
                            key={i}
                            id={i + 1}
                            item={item}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playlist