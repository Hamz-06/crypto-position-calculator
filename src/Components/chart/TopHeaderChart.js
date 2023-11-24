import React, { useEffect, useState } from 'react'
import { GetCryptoInfo } from '../ApiReq/PriceData'

function TopInfoContainer({ cryptoCoin }) {

    const [cryptoInfo, updateCryptoInfo] = useState([])

    useEffect(() => {

        //Set extra info
        function setTimerInfo() {
            //pass coin info to api
            try {

                GetCryptoInfo(cryptoCoin).then(resp => {
                    var priceChangePercent = parseFloat(resp.data.priceChangePercent).toFixed(2)
                    var lowPrice = parseFloat(resp.data.lowPrice).toFixed(2)
                    var openPrice = parseFloat(resp.data.openPrice).toFixed(2)

                    const cryptoInfoLocal = [priceChangePercent, lowPrice, openPrice]
                    updateCryptoInfo(cryptoInfoLocal)

                })
            } catch (error) {

                updateCryptoInfo(['not found', 'not found', 'not found'])
            }
        }
        //run once on load 
        setTimerInfo()
        //stat timer 
        var getInfoInterval = setInterval(setTimerInfo, 2000)
        return () => {
            clearInterval(getInfoInterval)
        }
    }, [cryptoCoin])

    return (
        <>
            <div>
                24h Percent Change<br />
                <p style={cryptoInfo[0] > 0 ? { color: 'green' } : { color: 'red' }}>{cryptoInfo[0]}</p>

            </div>
            <div>

                24h Low<br />
                {cryptoInfo[1]}
            </div>
        </>
    )
}

export { TopInfoContainer }