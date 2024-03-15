import { useEffect, useState } from 'react';
import Track from '../components/track'
import { getQueue } from '../hooks';
import { StyledQueue } from '../components/styles/queue.styles';

function Queue({playingTrack, setTracks, setCurrentIndex}) {
  const [queue, setQueue] = useState({});

  const fetchQueue = async () => {
    try{
      const response = await getQueue();
      const json = await response.json();
      setQueue(json);
      setTracks(json);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect (() => {
    fetchQueue();
  }, []);

  return (
    <StyledQueue>
      <div className='queue-view-container'>
        <h1>Queue</h1>
        <h2>Now Playing</h2>
          <Track 
            key={0}
            id={1}
            type={'queue'}
            item={queue?.currently_playing}
            playingTrack={playingTrack}
            fetchQueue={fetchQueue}
            onClick={() => setCurrentIndex(1)}/>
        <h2>Next Up</h2>
        <div className='queue-list'>
          {queue?.queue?.map((item, i) =>
            <Track 
              key={i}
              id={i + 2}
              type={'queue'}
              item={item}
              playingTrack={playingTrack}
              fetchQueue={fetchQueue}
              onClick={() => setCurrentIndex(i + 2)}/>
          )}
        </div>
          
      </div>
    </StyledQueue>
  )
}

export default Queue