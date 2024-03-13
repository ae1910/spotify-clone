import { Link, useLocation } from 'react-router-dom';
import { ResizableBox } from 'react-resizable';
import { StyledSidebar } from './styles/sidebar.style';
import { GoHome, GoHomeFill } from "react-icons/go";
import { BiSearch, BiSolidSearch } from 'react-icons/bi';
import { IoIosList } from "react-icons/io";
import { IoLibraryOutline, IoLibrarySharp } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { useState, useEffect, useRef } from 'react';
import { getLibrary } from '../hooks/index';
import likedSongsImg from '../img/liked-songs-300.png';

const Sidebar = () => {
    const { pathname } = useLocation();
    const [library, setLibrary] = useState({});
    const [width, setWidth] = useState(360);
    const [open, setOpen] = useState(true);

    
    const fetchData = async () => {
        try{
            const response = await getLibrary();
            const json = await response.json();
            setLibrary(json);
        }
        catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData()
    }, []);

    const handleClick = () => {
        setOpen(!open);
        
    }
    useEffect(() => {
        if(open) {
            setWidth(280);
        } else {
            setWidth(72);
        }
    }, [open]);

    return (
        <ResizableBox
            width={width}
            resizeHandles={['e']}
            minConstraints={[72, 72]}
            maxConstraints={[420, 72]}
            onResize={(e, {element, size}) => {
                if(size.width > 72 && size.width < 280) {
                    if(size.width > 175 && size.width < 280) {
                        setOpen(true);
                    } else if(size.width > 72 && size.width < 176) {
                        setOpen(false);
                    }
                }
                if(size.width === 72) {
                    setOpen(false);
                } else {
                    setOpen(true);
                }
            }}
            >
            <StyledSidebar>
                <nav>
                    <div className='nav-top'>
                        <ul className='nav-items'>
                            <li className='nav-item'>
                                <Link className={pathname === '/' ? "active-link" : " "} to='/' draggable='false'>
                                    {pathname === '/' ? <GoHomeFill className='nav-icons' /> : <GoHome className='nav-icons' /> }
                                    Home
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className={pathname === '/search' ? "active-link" : " "} to='/search' draggable='false'>
                                    {pathname === '/search' ? <BiSolidSearch className='nav-icons' /> : <BiSearch className='nav-icons' /> }   
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='nav-library'>
                        <div className='library-options'>
                            <div className='library-header'>
                                <button className='show-nav-btn' onClick={handleClick}>
                                    {open ? <IoLibrarySharp className='nav-icons' /> : <IoLibraryOutline className='nav-icons' /> }
                                    Your Library
                                </button>
                                <button className='library-add-btn'></button>
                            </div>
                            <div className='library-media-filter'></div>
                        </div>
                        <div className='library-items-container'>
                            <div className='wrapper-container'>
                                <div className='library-filter-options'>
                                    <button className='library-search-btn'><BiSearch /></button>
                                    <button className='library-sort-btn'>
                                        Recents 
                                        <IoIosList className='nav-icons' />
                                    </button>
                                </div>
                                <div className='items-container'>
                                    <ul className='library-items'>
                                        <li className='library-item'>
                                            <Link className={pathname === '' ? "active-link" : " "} to='/collection/tracks' state={{id: 'liked-songs', type: 'liked songs'}}>
                                                <div className='library-item-img'>
                                                    <img src={likedSongsImg}/>
                                                </div>
                                                <div className='library-item-info'>
                                                    <div>
                                                        <p className='library-item-title'>Liked Songs</p>
                                                        <div className='library-item-metadata'>
                                                            Playlist
                                                        </div>
                                                    </div>
                                                    {/* <div className='speaker'>
                                                        <HiSpeakerWave className='nav-icons' />
                                                    </div> */}
                                                </div>
                                            </Link>
                                        </li>
                                        {library.items?.map((item, i) =>
                                            <li key={i} className='library-item'>
                                                <Link className={pathname === '' ? "active-link" : " "} to={`/playlist/${item.id}`} state={{id: item.id, type: 'playlist'}}>
                                                    <div className='library-item-img'>
                                                        <img src={item.images[0].url}/>
                                                    </div>
                                                    <div className='library-item-info'>
                                                        <div>
                                                            <p className='library-item-title'>{item.name}</p>
                                                            <div className='library-item-metadata'>
                                                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.type === 'playlist' ? item.owner.display_name : item.tracks.total}
                                                            </div>
                                                        </div>
                                                        {/* <div className='speaker'>
                                                            <HiSpeakerWave className='nav-icons' />
                                                        </div> */}
                                                    </div>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </StyledSidebar>
        </ResizableBox>
    );
}
export default Sidebar;