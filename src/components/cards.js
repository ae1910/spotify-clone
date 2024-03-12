import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { StyledCard } from './styles/cards.style';
import '../css/App.css';

const Card = (props) => {
    const navigate = useNavigate();
    
    return (
        <StyledCard key={props.key} className="section-item">
            <div className="section-img">
                <img src={props.image.url} />
            </div>
            <div className="section-info">
                <p className="section-title">{props.item.name}</p>
                <div className="section-description">
                    {props.item.artists?.map((artist, index) =>
                        <>
                            {props.item.artists?.length !== 1 && props.item.artists[0] !== artist ? ", " : " "}
                            <Link key={index} to={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">{artist.name}</Link>
                        </>
                    )}
                </div>
            </div>
        </StyledCard>
    )
}

export default Card