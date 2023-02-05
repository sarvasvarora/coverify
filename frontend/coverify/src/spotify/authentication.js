import React from "react";
import { useEffect, useState } from "react";
import querystring from "query-string";
import generateRandomString from "generate-random-string";

// load the environment variables
let CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
let CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let AUTH_ENDPOINT = process.env.SPOTIFY_AUTH_ENDPOINT;
let REDIRECT_URL = process.env.SPOTIFY_AUTH_REDIRECT_URL;
let RESPONSE_TYPE = process.env.SPOTIFY_AUTH_RESPONSE_TYPE;

let SCOPE = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ugc-image-upload"

export default function Auth(token, setToken) {
    // const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("SPOTIFY_AUTH_TOKEN")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("SPOTIFY_AUTH_TOKEN", token)
        }
    
        setToken(token)
    
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("SPOTIFY_AUTH_TOKEN")
    }

    let reqEndpoint = `${AUTH_ENDPOINT}?` +
            querystring.stringify({
            response_type: RESPONSE_TYPE,
            client_id: CLIENT_ID,
            scope: SCOPE,
            redirect_uri: REDIRECT_URL,
            state: generateRandomString(16)
        })

    return (
        <div className="App">
        <header className="App-header">
            <h1>Spotify React</h1>
            {!token ?
                // <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                <a href={reqEndpoint}>Login to Spotify</a>
                : <button onClick={logout}>Logout</button>}
        </header>
        </div>
    );
}
