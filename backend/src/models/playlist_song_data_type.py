from pydantic import BaseModel


class PlaylistSongData(BaseModel):
    trackName: str
    accousticness: float
    danceability: float
    energy: float
    instrumentalness: float
    speechiness: float
    tempo: float
    valence: float