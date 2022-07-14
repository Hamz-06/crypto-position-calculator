
import axios from "axios";

//gets 500 candle sticks 
export const GetCandles=(currentTimeFrame)=>{

  return axios.get('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval='+currentTimeFrame)

}

//gets 24 hour percent change and crypto info
export const GetCryptoInfo=()=>{
  return axios.get('https://api.binance.com/api/v3/ticker?symbol=BTCUSDT')
}
//gets current candle stick info from binance 
export const GetLiveCandle = (currentTimeFrame)=>{
  return "wss://stream.binance.com:9443/ws/btcusdt@kline_"+currentTimeFrame
}

//get 
export const cryptoCoins = [
  {
    cryptoName:'BTC/USDT',
    cryptoImage:'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
  },{
    cryptoName:'ETH/USDT',
    cryptoImage:'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'

  }

]


