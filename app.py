from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import random


# создаем сервер
app = FastAPI()



# CORS
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



# AI сигналы
signals = [

    "BUY",

    "SELL",

    "HOLD"
]



# sentiment
sentiments = [

    "Bullish",

    "Bearish",

    "Neutral"
]




# главная страница
@app.get("/")
def home():

    return {

        "message": "AI Crypto Server работает 🚀"
    }




# AI SIGNAL
@app.get("/signal/{coin}")
def signal(coin: str):


    # случайный сигнал
    ai_signal = random.choice(signals)



    # случайный sentiment
    sentiment = random.choice(sentiments)



    # confidence
    confidence = random.randint(60, 95)




    return {

        "coin": coin.upper(),

        "signal": ai_signal,

        "confidence": confidence,

        "sentiment": sentiment
    }
