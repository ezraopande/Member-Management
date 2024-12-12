import React, { useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

const TopLoadingBar = ({ progress }) => {
    const loadingBarRef = useRef(null);

    return (
        <LoadingBar
            color="#4CAF50"
            progress={progress} 
            height={3}
            waitingTime={100}
            onLoaderFinished={() => { loadingBarRef.current.complete(); }}
            ref={loadingBarRef}
        />
    );
};

export default TopLoadingBar;
