import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getHomepage, getRecommendations } from '../hooks/index';
import Card from '../components/cards';


const Home = () => {
    const [newReleases, setNewReleases] = useState({});
    const [recentlyPlayed, setRecentlyPlayed] = useState({});
    const [recommended, setRecommended] = useState({});
    const [popularTracks, setPopularTracks] = useState({});


    const getRecommended = async (data) => {
        const topTracksIds = [];
        for(let i = 0; i < 5; i++) {
            topTracksIds.push(data?.items[i]?.track.id);
        }
        try{
            const response = await getRecommendations(topTracksIds);
            const json = await response.json();
            setRecommended(json);
        }
        catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {
        try{
            const responses = await getHomepage();
            const json = await Promise.all(responses.map(response => response.json()));
            setNewReleases(json[0]);
            setRecentlyPlayed(json[1]);
            getRecommended(json[1])
            setPopularTracks(json[2]);
        }
        catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="main-home">
            <div className="opening">
                <h2>Good Afternoon</h2>
                <div className="recent-playlists">
                    {recentlyPlayed.items?.slice(0, 6).map((item, i) =>
                        <Link key={i} className="recent-playlist">
                            <div className="recent-playlist-img">
                                <img src={item.track.album.images[1].url}/>
                            </div>
                            <div className="recent-playlist-title">
                                <p>{item.track.album.name}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <div className="section new-releases">
                <div className="section-title-container">
                    <Link to='/section/new-releases' state={{data: newReleases, title: "New Releases"}}>New Releases</Link>
                    <Link to='/section/new-releases' state={{data: newReleases, title: "New Releases"}}>Show All</Link>
                </div>
                <div className="section-items">
                    {newReleases.albums?.items.map((item, i) =>
                        <Card
                        key={i}
                        type='album'
                        item={item}
                        image={item.images[0]}
                        url={`/album/${item.id}`}/>
                    )}
                </div>
            </div>
            <div className="section recently-played">
                <div className="section-title-container">
                    <Link to='/section/recently-played' state={{data: recentlyPlayed, title: "Recently Played"}}>Recently Played</Link>
                    <Link to='/section/recently-played' state={{data: recentlyPlayed, title: "Recently Played"}}>Show All</Link>
                </div>
                <div className="section-items">
                    {recentlyPlayed.items?.map((item, i) =>
                        <Card
                        key={i}
                        type={'track'}
                        item={item.track}
                        image={item.track.album.images[1]}
                        url={item.track.external_urls.spotify}/>
                    )}
                </div>
            </div>
            <div className="section recently-played">
                <div className="section-title-container">
                    <Link to='/section/recommendations' state={{data: recommended, title: "Recommended Tracks"}}>Recommended Tracks</Link>
                    <Link to='/section/recommendations' state={{data: recommended, title: "Recommended Tracks"}}>Show All</Link>
                </div>
                <div className="section-items">
                    {recommended.tracks?.map((item, i) =>
                        <Card
                        key={i}
                        type={'track'}
                        item={item}
                        image={item.album.images[1]}
                        url={item.album.external_urls.spotify}/>
                    )}
                </div>
            </div>
            <div className="section popular">
                <div className="section-title-container">
                    <Link to='/section/popular' state={{data: popularTracks, title: "Top Hits"}}>Top Hits</Link>
                    <Link to='/section/popular' state={{data: popularTracks, title: "Top Hits"}}>Show All</Link>
                </div>
                <div className="section-items">
                    {popularTracks?.tracks?.items.map((item, i) =>
                        <Card
                        key={i}
                        type={'track'}
                        item={item.track}
                        image={item.track.album.images[1]}
                        url={item.track.album.external_urls.spotify}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;