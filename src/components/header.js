import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { StyledHeader } from './styles/header.style';
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { BiSearch } from 'react-icons/bi';
import { IoCloseOutline } from "react-icons/io5";
import { PiArrowCircleDownLight } from "react-icons/pi";
import { useState, useEffect } from 'react';
import '../css/App.css';
import { logout } from '../hooks';

const Header = ({user}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [toggle, setToggle] = useState(false);

    const [query, setQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (e) => {
        setSearchParams(prev => {
            prev.set('query', e.target.value);
            return prev;
        }, {replace: true});
        setQuery(e.target.value);
    }

    useEffect(() => {
        setProfile(user);
    }, []);

    return (
        <StyledHeader>
            <div className="navigation-btns">
                <button className="nav-btn left" onClick={() => navigate(-1)}>
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
                <div className='user-container'>
                    <button className="profile-btn" onClick={() => setToggle(!toggle)}>
                        <div className="profile-img-container">
                            {profile?.images ?
                                <img src={profile?.images[0]?.url} />
                                : ''
                            }
                        </div>
                    </button>
                    <div className={toggle ? 'dropdown show' : 'dropdown'}>
                        <ul>
                            <li>
                                <Link to={profile?.external_urls?.spotify} target="_blank" rel="noopener noreferrer" title={profile?.display_name}>Profile</Link>
                            </li>
                            <li onClick={() => logout()}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </StyledHeader>
    );
}
export default Header;