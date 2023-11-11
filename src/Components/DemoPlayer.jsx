import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import logo from '../logo.svg';
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { useCallback } from "react";
import MyPlayer from "./MyPlayer";

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function DemoPlayer() {
    const [is_paused, setPaused] = useState(false);
    const [playlist, setPlaylist] = useState();
    /*     async function getPlaylist() {
            await fetch('/playlists/getTracks')
                .then((response) => {
                    console.log(response.json());
                });
        }
        getPlaylist(); */

    
    //const webPlaybackSDKReady = useWebPlaybackSDKReady();
    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                </div>
            </div>
        </>
    );
    /* const [playlist, setPlaylist] = useState();
    const [current_track, setTrack] = useState(track);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);

    useEffect(() => {
        async function getPlaylist() {
            await fetch('/playlists')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const tracks = [];
                    for (const item of data.playlists) {
                        tracks.push(item.track);
                    }
                    shufflePlaylist(tracks);
                    setPlaylist(tracks);
                    setTrack(tracks[0]);
                });
        }
        //getPlaylist();


        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', async ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                async function startPlayback() {
                    const requestOptions = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ device_id: device_id })
                    };
                    await fetch('/playlists/playback', requestOptions)
                        .then((response) => {
                            console.log(response.json())
                        });
                }
                startPlayback();
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });

            }));

            player.connect();

        };
    }, []);

    function shufflePlaylist(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
                    <div className="now-playing__side">
                        <div className="now-playing__name">{current_track.name}</div>
                        <div className="now-playing__artist">{current_track.artists[0].name}</div>

                        <button className="btn-spotify" onClick={() => {
                            player.previousTrack().then(() => {
                                console.log('Set to previous track!');
                            });
                        }} >
                            &lt;&lt;
                        </button>

                        <button id="togglePlay" className="btn-spotify" onClick={() => { player.togglePlay() }} >
                            {is_paused ? "PLAY" : "PAUSE"}
                        </button>

                        <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                            &gt;&gt;
                        </button>
                    </div>
                </div>
            </div>
        </>
    ); */
}


export default DemoPlayer