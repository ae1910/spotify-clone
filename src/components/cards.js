import { Link, useNavigate } from 'react-router-dom';
import { StyledCard } from './styles/cards.style';
import '../css/App.css';
import { IoIosPlay } from 'react-icons/io';

const Card = (props) => {
    // const navigate = useNavigate();
    return (
        <StyledCard key={props.key} className="section-item" to={props.url} state={props.type ==='album' || props.type ==='playlist' ? {id: props.item.id, type: props.type} : ''} target={props.type ==='album' || props.type ==='playlist' ? '' : '_blank'} rel={props.type ==='album' || props.type ==='playlist' ? '' : 'noopener noreferrer'}>
            <div className={props.type == 'artist'? "section-img artists" :  "section-img"}>
                <img src={props.image?.url} />
                <div>
                    <button className="play-btn" onClick={(e) => {e.preventDefault(); props.playingTrack(props.uri);}}>
                        <IoIosPlay />
                    </button>
                </div>
            </div>
            <div className="section-info">
                <p className="section-title">{props.item.name}</p>
                {props.type == 'playlist' ?
                    <div className="section-description">{`By ${props.item.owner.display_name}`}</div>
                    : props.type == 'artist' ?
                    <div className="section-description">Artist</div>
                    : <div className="section-description">
                        {props.item.artists?.map((artist, index) =>
                            <>
                                {props.item.artists?.length !== 1 && props.item.artists[0] !== artist ? ", " : " "}
                                <Link key={index} to={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">{artist.name}</Link>
                            </>
                        )}
                    </div>
                }
            </div>
        </StyledCard>
    )
}

export default Card