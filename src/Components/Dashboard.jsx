import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import MyPlayer from "./MyPlayer";
import { useCallback } from "react";

function Dashboard({token}) {

    const getOAuthToken = useCallback(callback => callback(token), []);
    return (
        <div className="App">
            <header className="App-header">
                <WebPlaybackSDK initialDeviceName="Music Game Player" getOAuthToken={getOAuthToken} initialVolume={0.5} connectOnInitialized={true}>
                    <MyPlayer token={token}/>
                </WebPlaybackSDK>
            </header>
        </div>
    );
}

export default Dashboard