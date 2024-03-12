import { Link } from 'react-router-dom';
import { StyledFooter } from './styles/footer.style';
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import '../css/App.css';

const Footer = () => {
    return (
        <StyledFooter>
            <div className='footer-halves'>
                <div className='first-footer'>
                    <div className='links-list-container'>
                        <ul className='links-list'>
                            <p className='list-title'>Company</p>
                            <Link to={'https://www.spotify.com/us/about-us/contact/'} target="_blank" rel="noopener noreferrer">About</Link>
                            <Link to={'https://www.lifeatspotify.com/'} target="_blank" rel="noopener noreferrer">Jobs</Link>
                            <Link to={'https://newsroom.spotify.com/'} target="_blank" rel="noopener noreferrer">For the Record</Link>
                        </ul>
                        <ul className='links-list'>
                            <p className='list-title'>Communities</p>
                            <Link to={'https://artists.spotify.com/home'} target="_blank" rel="noopener noreferrer">For Artists</Link>
                            <Link to={'https://developer.spotify.com/'} target="_blank" rel="noopener noreferrer">Developers</Link>
                            <Link to={'https://ads.spotify.com/en-US/'} target="_blank" rel="noopener noreferrer">Advertising</Link>
                            <Link to={'https://investors.spotify.com/home/default.aspx'} target="_blank" rel="noopener noreferrer">Investors</Link>
                            <Link to={'https://spotifyforvendors.com/'} target="_blank" rel="noopener noreferrer">Vendors</Link>
                        </ul>
                        <ul className='links-list'>
                            <p className='list-title'>Useful Links</p>
                            <Link to={'https://support.spotify.com/us/'} target="_blank" rel="noopener noreferrer">Support</Link>
                            <Link to={'https://www.spotify.com/us/download/'} target="_blank" rel="noopener noreferrer">Free Mobile App</Link>
                        </ul>
                    </div>
                    <div className='social-media-btns'>
                        <Link to={'https://www.instagram.com/spotify'} target="_blank" rel="noopener noreferrer">
                            <div>
                                <FaInstagram className="nav-icons"/>
                            </div>
                        </Link>
                        <Link to={'https://twitter.com/spotify'} target="_blank" rel="noopener noreferrer">
                            <div>
                                <FaTwitter className="nav-icons"/>
                            </div>
                        </Link>
                        <Link to={'https://www.facebook.com/spotifyusa/?brand_redir=6243987495'} target="_blank" rel="noopener noreferrer">
                            <div>
                                <FaFacebook className="nav-icons"/>
                            </div>
                        </Link>
                    </div>
                </div>
                
                <hr/>
                <div className='second-footer'>
                    <div className='second-footer-one'>
                        <Link to={'https://www.spotify.com/us/legal/end-user-agreement/'} target="_blank" rel="noopener noreferrer">Legal</Link>
                        <Link to={'https://www.spotify.com/us/safetyandprivacy/reporting-content'} target="_blank" rel="noopener noreferrer">Safety & Privacy Center</Link>
                        <Link to={'https://www.spotify.com/us/legal/privacy-policy/'} target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                        <Link to={'https://www.spotify.com/us/legal/cookies-policy/'} target="_blank" rel="noopener noreferrer">Cookies</Link>
                        <Link to={'https://www.spotify.com/us/legal/privacy-policy/#s3'} target="_blank" rel="noopener noreferrer">About Ads</Link>
                        <Link to={'https://www.spotify.com/us/accessibility'} target="_blank" rel="noopener noreferrer">Accessibility</Link>
                        <Link to={'https://www.spotify.com/us/legal/notice-at-collection/'} target="_blank" rel="noopener noreferrer">Notice at Collection</Link>
                        <Link to={'https://www.spotify.com/us/account/privacy/'} target="_blank" rel="noopener noreferrer">Your Privacy Choices</Link>
                    </div>
                    <div className='second-footer-two'>© 2024 Spotify Limited</div>
                </div>
            </div>
        </StyledFooter>
    );
}
export default Footer;