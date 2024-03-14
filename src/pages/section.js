import { useLocation } from 'react-router-dom';
import Card from '../components/cards';

function Section({playingTrack, playingList}) {
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
                            type={'album'}
                            item={item}
                            image={item.images[0]}
                            playingTrack={playingList}
                            uri={item.uri}/>
                        )}
                    </>
                : pathname === '/section/recently-played'?
                    <>
                        {data.items?.map((item, i) =>
                            <Card
                            key={i}
                            type={'track'}
                            item={item.track}
                            image={item.track.album.images[1]}
                            playingTrack={playingTrack}
                            uri={item.track.album.uri}/>
                        )}
                    </>
                : pathname === '/section/recommendations'?
                    <>
                        {data.tracks?.map((item, i) =>
                            <Card
                            key={i}
                            type={'track'}
                            item={item}
                            image={item.album.images[1]}
                            playingTrack={playingTrack}
                            uri={item.uri}/>
                        )}
                    </>
                :
                    <>
                        {data?.tracks?.items.map((item, i) =>
                            <Card
                            key={i}
                            type={'track'}
                            item={item.track}
                            image={item.track.album.images[1]}
                            playingTrack={playingTrack}
                            uri={item.track.uri}/>
                        )}
                    </>
                }
            </div>
        </div>
    )
}

export default Section