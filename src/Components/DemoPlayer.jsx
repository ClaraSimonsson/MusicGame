import { useEffect, useState } from "react";

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

function DemoPlayer(props) {
    const [playlist, setPlaylist] = useState();
    const [current_track, setTrack] = useState(track);

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
        getPlaylist();
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
                    <div className="now-playing__side">
                        <div className="now-playing__name">{current_track.name}</div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default DemoPlayer