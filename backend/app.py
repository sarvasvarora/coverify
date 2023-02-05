import sys
# add src to path
sys.path.insert(0, "src/") 

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import zipfile
import os
from typing import List
from models.playlist_song_data_type import PlaylistSongData
from cover_generator.cover_generator import CoverGenerator
from io import BytesIO


# load .env file
load_dotenv()

# create the backend API app
app = FastAPI()

# enable CORS
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# function to zip files
def generate_zip(bytesio_list):
    mem_zip = BytesIO()

    with zipfile.ZipFile(mem_zip, mode="w",compression=zipfile.ZIP_DEFLATED) as zf:
        i = 1
        for f in bytesio_list:
            zf.writestr(f"file{i}.png", f.getvalue())
            i += 1

    return mem_zip.getvalue()


@app.get("/")
async def root():
    return "Hello, world!"


@app.post("/generate-covers")
async def generate_covers(tracks: List[PlaylistSongData]):
    # obtain the number of tracks in the playlist (capped at 100 by the Spotify API)
    num_tracks = len(tracks)

    # obtain the track names
    track_names = [track['name'] for track in tracks]

    # compute the average audio features and feed the data to the cover generator
    cover_generator = CoverGenerator(
        track_names,
        {
            "accousticness": sum([track['accousticness'] for track in tracks]) / num_tracks,
            "danceability": sum([track['danceability'] for track in tracks]) / num_tracks,
            "energy": sum([track['energy'] for track in tracks]) / num_tracks,
            "instrumentalness": sum([track['instrumentalness'] for track in tracks]) / num_tracks,
            "speechiness": sum([track['speechiness'] for track in tracks]) / num_tracks,
            "tempo": sum([track['tempo'] for track in tracks]) / num_tracks,
            "valence": sum([track['valence'] for track in tracks]) / num_tracks
        }
    )

    # generate cover images
    covers = cover_generator.generate_covers()
    covers_zip = generate_zip(covers)

    # return the response
    return Response(covers_zip, media_type="application/x-zip-compressed")


@app.get("/test")
async def test_endpoint():
    cover_generator = CoverGenerator(
        ["best song ever", "another song"],
        {
            "accousticness": 0.1,
            "danceability": 0.4,
            "energy": 0.5,
            "instrumentalness": 0.8,
            "speechiness": 0.3,
            "tempo": 155,
            "valence": 0.7
        }
    )

    covers = cover_generator.generate_covers()
    covers_zip = generate_zip(covers)

    return Response(covers_zip, media_type="application/x-zip-compressed")