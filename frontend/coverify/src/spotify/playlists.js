import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

let SPOTIFY_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
let SPOTIFY_USER_ENDPOINT = "https://api.spotify.com/v1/me/";


const getUserId = async (token, setUserId) => {
    console.log(`INSIDE GET USER ID token: ${token}`);
    const {res} = await axios.get(SPOTIFY_USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    setUserId(res.id)
}


const getPlaylists = async (token, setPlaylists) => {
    // TODO: handle pagination i.e., extract next set of playlists if total #playlists > 50 (max limit)

    const {res} = await axios.get(SPOTIFY_PLAYLIST_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            limit: 50
        }
    });

    resPlaylists = res.items;
    resPlaylists.filter((p) => {
        p.owner.id == userId
    });

    setPlaylists(resPlaylists);
}


export default function Playlists(token, setToken) {
    const [searchKey, setSearchKey] = useState("");
    const [userId, setUserId] = useState("");
    const [playlists, setPlaylists] = useState([]);

    // get the token from the local storage
    // let token; //= window.localStorage.getItem("SPOTIFY_AUTH_TOKEN");
    // useEffect(() => {
    //     token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN");
    // });
    useEffect(() => {
        const hash = window.location.hash
        token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("SPOTIFY_AUTH_TOKEN", token)
        }
    
        setToken(token)
    
    }, [])
    console.log(`Token is: ${token}`);

    // obtain the user's playlists
    getUserId(token, setUserId);
    getPlaylists(token, setPlaylists);

    let arr = [];
    for(let playlist of playlists) { 
        arr.push(<li>
            <p>{ playlist.name }</p>
        </li>);
    }


    return (
        <ul>
            {
                arr
            }
        </ul>
    );


}