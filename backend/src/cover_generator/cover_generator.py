from typing import List
import requests
import os
from io import BytesIO
from .prompts import *

class CoverGenerator():
    def __init__(self, track_names: List[str], audio_features: dict):
        self.track_names = track_names
        self.audio_features = audio_features
        self.model_id = os.getenv("HUGGINGFACE_MODEL_ID") or "runwayml/stable-diffusion-v1-5"
        self.API_URL = f"https://api-inference.huggingface.co/models/{self.model_id}"
        self.API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")

    def _query_api(self, payload: str) -> BytesIO:
        headers = {"Authorization": f"Bearer {self.API_TOKEN}"}
        res = requests.post(self.API_URL, headers=headers, json=payload)
        return BytesIO(res.content)

    def _get_prompt_generators(self):
        dominant_prompt_generators = []
        if self.audio_features['tempo'] > 120 or self.audio_features['energy'] >= 0.8:
            dominant_prompt_generators.append(high_tempo_prompt)
        if (self.audio_features['valence'] <= 0.5 and self.audio_features['danceability'] <= 0.6) or self.audio_features['valence'] <= 0.3:
            dominant_prompt_generators.append(sad_prompt)
        if self.audio_features['valence'] >= 0.5 or self.audio_features['energy'] >= 0.6:
            dominant_prompt_generators.append(happy_prompt)
        if self.audio_features['speechiness'] < 0.33 or self.audio_features['instrumentalness'] >= 0.75:
            dominant_prompt_generators.append(chill_prompt)
        if self.audio_features['danceability'] > 0.5:
            dominant_prompt_generators.append(dance_prompt)
        return dominant_prompt_generators

    def generate_covers(self) -> List[BytesIO]:
        # generate image for different prompts
        random_track_name_cover_1 = self._query_api(random_track_name_prompt(self.track_names))
        random_track_name_cover_2 = self._query_api(random_track_name_prompt(self.track_names))

        # get prompt generators and generate images using three of them
        prompt_generators = self._get_prompt_generators()
        cover_1 = self._query_api(random.choice(prompt_generators)())
        cover_2 = self._query_api(random.choice(prompt_generators)())
        cover_3 = self._query_api(random.choice(prompt_generators)())

        return [random_track_name_cover_1, random_track_name_cover_2, cover_1, cover_2, cover_3]
