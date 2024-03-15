import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Sidebar from '../components/sidebar';
import Player from '../components/player/player';
import Home from './home';
import Header from "../components/header";
import Section from './section';
import Search from "./search";
import Playlist from "./playlist";
import Footer from "../components/footer";
import { getCurrentTrack, playList, playTrack } from "../hooks";
import { useEffect, useState } from "react";
import Queue from "./queue";

const Account = () => {
    const [track, setTrack] = useState({});
    const [tracks, setTracks] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const fetchCurrentTrack = async () => {
        try{
            const response = await getCurrentTrack();
            const json = await response.json();
            setTrack(json);
        }
        catch (error) {
            console.log(error);
        }
    };

    const playingTrack = async (uri) => {
        try{
            await playTrack([uri]);
            setTimeout(() => {
                fetchCurrentTrack();
            }, 600);
        }
        catch (error) {
            console.log(error);
        }
    };
    const playingList = async (uri) => {
        try{
            await playList(uri);
            setTimeout(() => {
                fetchCurrentTrack();
            }, 600);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setTrack(tracks[currentIndex]?.track);
    }, [currentIndex, tracks]);

    return (
        <div id='main'>
            <Router basename='/'>
                <Sidebar />
                <main>
                    <div className="main-view-container">
                        <Header />
                        <Routes>               
                            <Route path='/' element={<Home playingTrack={playingTrack} playingList={playingList}/>}/>
                            <Route path='/section/:sectionId' element={<Section playingTrack={playingTrack} playingList={playingList}/>}/>
                            <Route path='/search' element={<Search playingTrack={playingTrack} playingList={playingList}/>}/>
                            <Route path='/album/:albumId' element={<Playlist playingTrack={playingTrack} playingList={playingList}/>} />
                            <Route path='/collection/tracks' element={<Playlist playingTrack={playingTrack} playingList={playingList}/>}/>
                            <Route path='/playlist/:playlistId' element={<Playlist playingTrack={playingTrack} playingList={playingList}/>}/>
                            <Route path='/queue' element={<Queue playingTrack={playingTrack} setTracks={setTracks} setCurrentIndex={setCurrentIndex}/>}/>
                        </Routes>
                        <Footer />
                    </div>
                </main>
                <Player fetchCurrentTrack={fetchCurrentTrack} currentTrack={track} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} tracks={tracks}/>
            </Router>
        </div>
    );
}

export default Account;