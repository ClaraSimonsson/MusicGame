import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

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

function Dashboard(props) {
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [token, setToken] = useState();
    const playlist_id = '5mQVbkcILLiU2aqVOplsMy';
    var prev = null;
    //var spotifyApi = new SpotifyWebApi();
    //spotifyApi.setPromiseImplementation(new Promise());

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        const hash = props.token;
        window.location.hash = "";
        const _token = hash.access_token;
        if (_token) {
            setToken(_token)
            //spotifyApi.setAccessToken(props.token);
        }

        

        // Initialize the player
/*         document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                //setFirstTrack();
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

            document.getElementById('togglePlay').onclick = function() {
              player.togglePlay();
            };

            player.connect();

        }; */
    }, [props]);

/*     function setFirstTrack() {
        // abort previous request, if any
        if (prev !== null) {
          prev.abort();
        }
        prev = spotifyApi.getPlaylistTracks(playlist_id);
        prev.then(
                function (data) {
                    // clean the promise so it doesn't call abort
                    prev = null;
                    shufflePlaylist(data.items)
                    console.log('Playlist tracks', data);
                    return data.items[0].track
                },
                function (err) {
                    console.error(err);
                }
            )
            .then(function (first_track) {
                setTrack(first_track);
            });
    }

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

    } */

    if (!is_active) {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
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
        );
    }
}

export default Dashboard