
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
//gets current bitcoin price 
export const GetCurrentPrice = ()=>{
  return axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
}

//get coins 
export const cryptoCoins = [
  {
    cryptoName:'BTC/USDT',
    cryptoImage:'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
  },{
    cryptoName:'ETH/USDT',
    cryptoImage:'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'

  }

]

export const getCryptoImage=(getCoin)=>{

  var coin=cryptoCoins.find((crypto)=>{
      return crypto.cryptoName = getCoin
  })
  // console.log(coin.cryptoImage)
  return coin.cryptoImage
  
}

export const unixToDate=(unix)=>{
  const milliseconds = unix 
  const dateObject = new Date(milliseconds)
  const humanDateFormat = dateObject.toLocaleString()
  return humanDateFormat
}


