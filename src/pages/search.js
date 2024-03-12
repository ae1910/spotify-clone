import { useEffect, useState } from "react";
import { getCategories, getSearchResults } from "../hooks";
import { StyledCategoryContainer, StyledCategory } from "../components/styles/categories.style";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Card from "../components/cards";
import { StyledTrackItem } from "../components/styles/track.style";
import { BsExplicitFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";


function Search() {
    const { pathname } = useLocation();

    const [categories, setCategories] = useState();
    const [tracksResults, setTracksResults] = useState({});
    const [artistsResults, setArtistsResults] = useState({});
    const [albumResults, setAlbumResults] = useState({});
    const [playlistsResults, setPlaylistsResults] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query');

    const randomColor = () => {
        let colorH = Math.floor(Math.random() * 360)
        , colorS = Math.floor(Math.random() * 70) + 30
        , colorL = Math.floor(Math.random() * 20) + 45 ;
        return `hsl(${colorH}, ${colorS}%, ${colorL}%)`;
    };

    const fetchData = async () => {
        try{
            const response = await getCategories();
            const json = await response.json();
            setCategories(json.categories);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchSearchResults = async () => {
        try{
            const responses = await getSearchResults(query);
            const json = await Promise.all(responses.map(response => response.json()));
            console.log(json);
            setTracksResults(json[0].tracks);
            setArtistsResults(json[1].artists);
            setAlbumResults(json[2].albums)
            setPlaylistsResults(json[3].playlists);
        }
        catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchSearchResults();
    }, [query]);
    return (
        <div className="search-view-container">
            {query == null || query == '' ?
                <StyledCategoryContainer className="categories-container">
                    <h2>Browse</h2>
                    <div className="categories-items">
                        {categories?.items?.map((category, i) =>
                            <StyledCategory key={i} className="category-item" to={`https://open.spotify.com/genre/${category?.id}`} target="_blank" rel="noopener noreferrer" style={{backgroundColor: randomColor()}}>
                                <div>
                                    <img src={category?.icons[0].url}/>
                                    <span>{category?.name}</span>
                                </div>
                            </StyledCategory>
                        )}
                    </div>
                </StyledCategoryContainer>
                : <div>
                    <div className="section search-sections">
                        <h2>Songs</h2>
                        <div className="track-items">
                            {tracksResults?.items?.map((item, i) =>
                                <StyledTrackItem key={i} className="playlist-item track-item">
                                    <div className="col-2">
                                        <div className="track-image">
                                            <img src={item?.album?.images[1]?.url}/>
                                        </div>
                                        <div className="track-info">
                                            <Link to={item?.external_urls.spotify} className="track-title">{item?.name}</Link>
                                            {item?.explicit ? <BsExplicitFill /> : <></>}
                                            <div className="track-artists">
                                                {item?.artists?.map((artist, index) =>
                                                    <>
                                                        {item?.artists?.length !== 1 && item?.artists[0] !== artist ? ", " : " "}
                                                        <Link key={index} to={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="artists">{artist.name}</Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <button className="save-track-btn">
                                            <FaRegHeart  />
                                        </button>
                                            <span>{`${Math.floor((item?.duration_ms / 1000 / 60) % 60)}:${Math.floor((item?.duration_ms / 1000) % 60).toString().padEnd(2,'0')}`}</span>
                                        <button className="more-track-btn">
                                            <PiDotsThreeBold />
                                        </button>
                                    </div>
                                </StyledTrackItem>
                            )}
                        </div>
                    </div>
                    <div className="section search-sections">
                        <h2>Artists</h2>
                        <div className="section-items">
                            {artistsResults?.items?.map((item, i) =>
                                <Card
                                key={i}
                                type={'artist'}
                                item={item}
                                image={item.images[1]}
                                url={item.external_urls.spotify}/>
                            )}
                        </div>
                    </div>
                    <div className="section search-sections">
                        <h2>Albums</h2>
                        <div className="section-items">
                            {albumResults?.items?.map((item, i) =>
                                <Card
                                key={i}
                                type={'album'}
                                item={item}
                                image={item.images[1]}
                                url={item.external_urls.spotify}/>
                            )}
                        </div>
                    </div>
                    <div className="section search-sections">
                        <h2>Playlists</h2>
                        <div className="section-items">
                            {playlistsResults?.items?.map((item, i) =>
                                <Card
                                key={i}
                                type={'playlist'}
                                item={item}
                                image={item.images[0]}
                                url={item.external_urls.spotify}/>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search