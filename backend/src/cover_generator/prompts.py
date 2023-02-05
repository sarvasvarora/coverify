import random
from typing import List

def sad_prompt():
    return random.choice([
        "dark, sad abstract art",
        "dark, sad generative art",
        "dark, low energy album cover",
        "dark, low energy album cover",
        "sad abstract album cover",
        "diabolism demons",
        "fighting demons",
        "lone kid",
        "all alone on a dark night",
        "lone wolf",
        "the warrior dies in valhalla",
        "heartbroken abstract",
    ])

def happy_prompt():
    return random.choice([
        "happy abstract art",
        "happy sad generative art",
        "happy, high energy album cover",
        "bright, high energy, happy album cover",
        "high abstract album cover",
        "colorful album cover",
        "trance music abstract art",
        "cheerful morning",
        "cheerful day",
        "happy cats abstract"
        "love abstract",
        "silhouette love music cover",
        "euphoria music cover"
    ])

def high_tempo_prompt():
    return random.choice([
        "rave abstract art",
        "high tempo generative art",
        "fun energy album cover",
        "techno, high energy album cover",
        "hype album cover",
        "hype, high temperature abstract generative art",
        "party abstract",
        "fighting demons"
    ])

def dance_prompt():
    return random.choice([
        "just dance abstract album cover",
        "fun dance album cover",
        "dance generative art music cover",
        "trance music abstract art",
        "dancing silhouettes"
    ])

def chill_prompt():
    return random.choice([
        "lofi abstract",
        "study music album cover",
        "chill mode on abstract music cover",
        "sunset music cover without text",
        "minimalism music cover"
    ])

def random_track_name_prompt(track_names: List[str]):
    track_name = random.choice(track_names)
    return f"{track_name} music cover"