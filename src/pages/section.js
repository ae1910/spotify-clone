import { useLocation } from 'react-router-dom';
import Card from '../components/cards';

function Section() {
    const location = useLocation();
    const { pathname } = useLocation();
    const { title, data } = location.state;

    return (
        <div className='section-items-container'>
            <h2 className='section-items-title'>{title}</h2>
            <div className='section-items-grid'>
                {pathname === '/section/new-releases'?
                    <>
                        {data.albums?.items.map((item, i) =>
                            <Card
                            key={i}
                            item={item}
                            image={item.images[0]}/>
                        )}
                    </>
                : pathname === '/section/recently-played'?
                    <>
                        {data.items?.map((item, i) =>
                            <Card
                            key={i}
                            item={item.track}
                            image={item.track.album.images[1]}/>
                        )}
                    </>
                : pathname === '/section/recommendations'?
                    <>
                        {data.tracks?.map((item, i) =>
                            <Card
                            key={i}
                            item={item}
                            image={item.album.images[1]}/>
                        )}
                    </>
                :
                    <>
                        {data?.tracks?.items.map((item, i) =>
                            <Card
                            key={i}
                            item={item.track}
                            image={item.track.album.images[1]}/>
                        )}
                    </>
                }
            </div>
        </div>
    )
}

export default Section