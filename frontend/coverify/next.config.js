require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_AUTH_REDIRECT_URL: process.env.SPOTIFY_AUTH_REDIRECT_URL,
    SPOTIFY_AUTH_ENDPOINT: process.env.SPOTIFY_AUTH_ENDPOINT,
    SPOTIFY_AUTH_RESPONSE_TYPE: process.env.SPOTIFY_AUTH_RESPONSE_TYPE
  }
}

module.exports = nextConfig
