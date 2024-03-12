import { Link, useLocation } from 'react-router-dom';
import { StyledPlayer } from './styles/player.style';
import { useState, useEffect } from 'react';
import { getLibrary } from '../hooks/index';
import '../css/App.css';

const Player = () => {
    const { pathname } = useLocation();
    const [library, setLibrary] = useState({});

    
    useEffect(() => {
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
        fetchData()
    }, []);

    return (
        <StyledPlayer>
            
        </StyledPlayer>
    );
}
export default Player;