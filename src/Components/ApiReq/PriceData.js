
import axios from "axios";

//gets 500 candle sticks 
export const GetCandles = (currentTimeFrame, currentCoin) => {


  return axios.get('https://api.binance.com/api/v3/klines?symbol=' + currentCoin + '&interval=' + currentTimeFrame + '&limit=1000')

}

//gets 24 hour percent change and crypto info
export const GetCryptoInfo = (currentCoin) => {
  return axios.get('https://api.binance.com/api/v3/ticker?symbol=' + currentCoin)
}
//gets current candle stick info from binance 
export const GetLiveCandle = (currentTimeFrame, currentCoin) => {

  var symbol_LowerCase = currentCoin
  var symbol_LowerCase = symbol_LowerCase.toLowerCase()
  return 'wss://stream.binance.com:9443/ws/' + symbol_LowerCase + '@kline_' + currentTimeFrame
}

//gets current bitcoin price 
// export const GetCurrentPrice = ()=>{
//   return axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
// }

//get coins 
export const cryptoCoins = [
  {
    cryptoName: 'BTCUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
  }, {
    cryptoName: 'ETHUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
  }, {
    cryptoName: 'SOLUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png'
  }, {
    cryptoName: 'DOTUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png'
  }, {
    cryptoName: 'BNBUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
  }, {
    cryptoName: 'LINKUSDT',
    cryptoImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png'
  }, {
    cryptoName: "CAKEUSDT",
    cryptoImage: "https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png"
  }, {
    cryptoName: "MATICUSDT",
    cryptoImage: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
  }
]

//incorrect function
export const getCryptoImage = (getCoin) => {

  var coin = cryptoCoins.find((crypto) => {
    return crypto.cryptoName === getCoin
  })
  // console.log(coin.cryptoImage)
  return coin.cryptoImage
}

export const unixToDate = (unix) => {
  const milliseconds = unix
  const dateObject = new Date(milliseconds)
  const humanDateFormat = dateObject.toLocaleString()
  return humanDateFormat
}
