import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import DemoPlayer from "./DemoPlayer";
import MyPlayer from "./MyPlayer";
import { useCallback } from "react";

function Dashboard(props) {

    const getOAuthToken = useCallback(callback => callback(props.token), []);
    return (
        <div className="App">
            <header className="App-header">
                <WebPlaybackSDK deviceName="Music Game Player" getOAuthToken={getOAuthToken} volume={0.5} connectOnInitialized={true}>
                    <MyPlayer token={props.token}/>
                </WebPlaybackSDK>
            </header>
        </div>
    );
}

export default Dashboard