
import axios from "axios";

//gets 500 candle sticks 
export const GetCandles=()=>{

  return axios.get('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=30m')

}

//gets 24 hour percent change and crypto info
export const GetCryptoInfo=()=>{
  return axios.get('https://api.binance.com/api/v3/ticker?symbol=BTCUSDT')
}
//gets current candle stick info from binance 
export const GetLiveCandle = ()=>{
  return "wss://stream.binance.com:9443/ws/btcusdt@kline_30m"
}




