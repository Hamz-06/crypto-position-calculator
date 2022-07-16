import React, {useState, useEffect, useCallback} from 'react';
import {GetCryptoInfo} from '../ApiReq/PriceData'
//used to update 24 hour time (change to coin geko in the future)- user defined component 
export const ChartTabTopContainer = () => {

    const [cryptoInfo, updateCryptoInfo] = useState([])
    //use effect for bitcoin info
    useEffect(() => {

        function setTimerInfo() {

            GetCryptoInfo().then(resp => {
                var priceChangePercent = parseFloat(resp.data.priceChangePercent).toFixed(2)
                var lowPrice = parseFloat(resp.data.lowPrice).toFixed(2)
                var dataVolume = parseFloat(resp.data.volume).toFixed(2)

                const cryptoInfo = [priceChangePercent, lowPrice, dataVolume]

                updateCryptoInfo(cryptoInfo)

            })
        }
        //run once on load 
        setTimerInfo()
        //stat timer 
        var getInfoInterval = setInterval(setTimerInfo, 2000)
        return () => {
            clearInterval(getInfoInterval)
        }
    }, [])

    //these components are updated every 2 seconds 
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