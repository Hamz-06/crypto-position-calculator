
import axios from "axios";
import { useEffect, useState } from "react";
export const GetCandles=()=>{


    
  return axios.get('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h')

}


