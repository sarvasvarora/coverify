import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";

const SPOTIFY_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const SPOTIFY_USER_ENDPOINT = "https://api.spotify.com/v1/me/";
const AUDIO_FEATURES_ENDPOINT = "https://api.spotify.com/v1/audio-features";
const ML_COVER_GENERATION_ENDPOINT = "http://localhost:8000/generate-covers";


const getUserId = async (token, setUserId) => {
    const res = await axios.get(SPOTIFY_USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(`USERID: ${res.data.id}`);
    setUserId(res.data.id);
}


const getPlaylists = async (token, userId, setPlaylists) => {
    // TODO: handle pagination i.e., extract next set of playlists if total #playlists > 50 (max limit)

    const res = await axios.get(SPOTIFY_PLAYLIST_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            limit: 50
        }
    });

    let resPlaylists = res.data.items;
    resPlaylists = resPlaylists.filter(p => p.owner.id == userId);
    console.log("PLAYLISTS");
    console.log(resPlaylists);
    setPlaylists(resPlaylists);
}

const generateCovers = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN");

    let data = e.target.dataset;
    console.log(data);
    const TRACKS_ENDPOINT = data.playlistTracksEndpoint;
    axios.get(TRACKS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        const token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN");
        const tracks = res.data.items;
        let trackIds = [];
        let trackNames = [];
        let accousticness = [];
        let danceability = [];
        let energy = [];
        let instrumentalness = [];
        let speechiness = [];
        let tempo = [];
        let valence = [];
        let mlCoverGenerationReq = []

        tracks.forEach((track) => {
            trackIds.push(track.track.id);
            trackNames.push(track.track.name);
        });

        for (let trackId of trackIds) {
            axios.get(`${AUDIO_FEATURES_ENDPOINT}/${trackId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                const audioData = res.data;
                console.log(audioData);
                accousticness.push(audioData.accousticness);
                danceability.push(audioData.danceability);
                energy.push(audioData.energy);
                instrumentalness.push(audioData.instrumentalness);
                speechiness.push(audioData.speechiness);
                tempo.push(audioData.tempo);
                valence.push(audioData.valence);
            });
        }
        let sum = (a, b) => a + b;
        let avgAccousticness =  accousticness.reduce(sum, 0) / trackIds.length;
        let avgDanceability = danceability.reduce(sum, 0) / trackIds.length;
        let avgEnergy = energy.reduce(sum, 0) / trackIds.length;
        let avgInstrumentalness = instrumentalness.reduce(sum, 0) / trackIds.length;
        let avgSpeechiness = speechiness.reduce(sum, 0) / trackIds.length;
        let avgTempo = tempo.reduce(sum, 0) / trackIds.length;
        let avgValence = valence.reduce(sum, 0) / trackIds.length;

        for (let i = 0; i < trackIds.length; i++) {
            mlCoverGenerationReq.push({
                "name": trackNames[i],
                "accousticness": accousticness[i],
                "danceability": danceability[i],
                "energy": energy[i],
                "instrumentalness": instrumentalness[i],
                "speechiness": speechiness[i],
                "tempo": tempo[i],
                "valence": valence[i]
            })
        }

        axios.post(ML_COVER_GENERATION_ENDPOINT, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mlCoverGenerationReq)
        })
        .then((res) => {
            console.log(res);
        })

    });
}


export default function Playlists() {
    const [userId, setUserId] = useState("");
    const [playlists, setPlaylists] = useState([]);

    // get the token from the local storage
    // let token; //= window.localStorage.getItem("SPOTIFY_AUTH_TOKEN");
    // useEffect(() => {
    //     token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN");
    // });
    useEffect(() => {
        const token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN");

        // obtain the user's playlists
        getUserId(token, setUserId);
        getPlaylists(token, userId, setPlaylists);
    }, []);
    
    // useEffect(() => {
    //     const hash = window.location.hash
    //     token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN")
    
    //     if (!token && hash) {
    //         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
    //         window.location.hash = ""
    //         window.localStorage.setItem("SPOTIFY_AUTH_TOKEN", token)
    //     }
    
    //     setToken(token)
    
    // }, [])

    let arr = [];
    for(let playlist of playlists) { 
        arr.push(
            <li>
                <button onClick={generateCovers} data-playlist-id={playlist.id} data-playlist-tracks-endpoint={playlist.tracks.href}>{ playlist.name }</button>
            </li>
        );
    }


    return (
        <ul>
            {
                arr
            }
        </ul>
    );


}