import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { StyledHeader } from './styles/header.style';
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { BiSearch } from 'react-icons/bi';
import { IoCloseOutline } from "react-icons/io5";
import { PiArrowCircleDownLight } from "react-icons/pi";
import { useState, useEffect } from 'react';
import { getProfile, logout } from '../hooks/index';
import '../css/App.css';

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [disabled, setDisabled] = useState(false);

    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    // const [results, setResults] = useState({});

    const fetchData = async () => {
        try{
            const response = await getProfile();
            const json = await response.json();
            setProfile(json);
        }
        catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData();
        // console.log(pathname);
    }, []);

    const handleChange = (e) => {
        setSearchParams(prev => {
            prev.set('query', e.target.value);
            return prev;
        }, {replace: true});
        setQuery(e.target.value);
    }

    // useEffect(() => {
    //     if
    // }, [navigate]);

    return (
        <StyledHeader>
            <div className="navigation-btns">
                <button className="nav-btn left" onClick={() => navigate(-1)} disabled={disabled}>
                    <RxCaretLeft />
                </button>
                <button className="nav-btn right" onClick={() => navigate(1)}>
                    <RxCaretRight />
                </button>
                {pathname === '/search' ?
                    <form role='search'>
                        <input 
                        name="search"
                        type="text"
                        placeholder='What do you want to play?'
                        value={query} 
                        onChange={e => handleChange(e)}/>
                        <div>
                            <span><BiSearch /></span>
                            <button><IoCloseOutline /></button>
                        </div>
                    </form>
                    : ''
                }
            </div>
            <div className="header-options">
                <Link to={'https://www.spotify.com/us/download/'} target="_blank" rel="noopener noreferrer">
                    <button className="install-btn">
                        <PiArrowCircleDownLight />
                        Install Spotify
                    </button>
                </Link>
                <Link to={profile?.external_urls?.spotify} target="_blank" rel="noopener noreferrer" title={profile?.display_name}>
                    <button className="profile-btn">
                        <div className="profile-img-container">
                            {profile?.images ?
                                <img src={profile?.images[0]?.url} />
                                : ''
                            }
                        </div>
                    </button>
                </Link>
            </div>
        </StyledHeader>
    );
}
export default Header;