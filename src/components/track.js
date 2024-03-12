import { Link } from "react-router-dom";
import { IoIosPlay } from "react-icons/io";
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { StyledTrackItem } from "./styles/track.style";
import { BsExplicitFill } from "react-icons/bs";
import { PiDotsThreeBold } from "react-icons/pi";

function Track(props) {
  return (
    <StyledTrackItem key={props?.key} className="playlist-item layout-grid">
        <div className="col-1">
            <span>{props?.id}</span>
            {/* <button>
                <IoIosPlay />
            </button> */}
        </div>
        <div className="col-2">
            <div className="track-image">
                <img src={props?.item?.track.album.images[1].url}/>
            </div>
            <div className="track-info">
                <Link to={props?.item?.track.external_urls.spotify} className="track-title">{props?.item?.track.name}</Link>
                {props?.item?.track.explicit ? <BsExplicitFill  /> : <></>}
                <div className="track-artists">
                    {props?.item?.track.artists?.map((artist, index) =>
                        <>
                            {props?.item?.track.artists?.length !== 1 && props.item.track.artists[0] !== artist ? ", " : " "}
                            <Link key={index} to={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="artists">{artist.name}</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
        <div className="col-3">
            <Link to=''>{props?.item?.track.album.name}</Link>
        </div>
        <div className="col-4">
            <span>{`${new Date(props?.item?.added_at).toLocaleString('default', { month: 'short' })} ${new Date(props?.item?.added_at).getDate()}, ${new Date(props?.item?.added_at).getFullYear()}`}</span>
        </div>
        <div className="col-5">
            <button className="save-track-btn">
                <FaRegHeart  />
            </button>
            <span>{`${Math.floor((props?.item?.track.duration_ms / 1000 / 60) % 60)}:${Math.floor((props?.item?.track.duration_ms / 1000) % 60)}`}</span>
            <button className="more-track-btn">
                <PiDotsThreeBold />
            </button>
        </div>
    </StyledTrackItem>
  )
}

export default Track