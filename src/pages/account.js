import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Sidebar from '../components/sidebar';
import Player from '../components/player';
import Home from './home';
import Section from './section';
import Playlist from "./playlist";
import Header from "../components/header";
import Footer from "../components/footer";

const Account = () => {
    return (
        <div id='main'>
            <Router basename='/'>
                <Sidebar />
                <main>
                    <div className="main-view-container">
                        <Header />
                        <Routes>               
                            <Route path='/' element={<Home />}/>
                            <Route path='/section/:sectionId' element={<Section />}/>
                            <Route path='/search' />
                            <Route path='/track/:trackId' />
                            <Route path='/album/:albumId' />
                            <Route path='/collections/:collectionsId' />
                            <Route path='/playlist/:playlistId' element={<Playlist />}/>
                            <Route path='/queue' />
                        </Routes>
                        <Footer />
                    </div>
                </main>
                <Player />
            </Router>
        </div>
    );
}

export default Account;