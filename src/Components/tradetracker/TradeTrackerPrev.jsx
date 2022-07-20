import React, { useEffect, useState, useMemo } from "react";
import './TradeTrackerPrev.css'
import { displayTradeDataBase } from '../Firebase/Firebase_user_info'
import { useSelector } from 'react-redux'
import { useRef } from "react";
import { addTradeDatabase, fetchTradeDataBase } from '../Firebase/Firebase_user_info'
import { cryptoCoins } from '../ApiReq/PriceData'
export function TradeTracker() {


    const userId = useSelector((state) => state.userId.value)

    //get image 
    const getCryptoImage = (getCoin) => {

        var coin = cryptoCoins.find((crypto) => {
            return crypto.cryptoName = getCoin
        })
        // console.log(coin.cryptoImage)
        return coin.cryptoImage

    }
    //display old trade 
    const DisplayOldTrades = () => {

        const [oldTrades, updateOldTrades] = useState()


        useEffect(() => {
            //fetches trade from firebase database 
            console.log(userId)
            displayTradeDataBase(userId).then((res) => {
                updateOldTrades(res)

            })
        }, [])

        //delete trade 
        function deleteOldTrade(index, date, time, userId) {
            const newArray = oldTrades.filter((trade, i) => index !== i)
            // console.log(oldTrades,newArray)
            // console.log(oldTrades.length, newArray.length)
            fetchTradeDataBase(date, time, userId)
            updateOldTrades(newArray)


        }

        //if there is data inside old trades
        if (!oldTrades) return
        return oldTrades.map((trade, key) => {
            //gets logo of symbol
            var symbolLogo = getCryptoImage(trade.cryptoCoin)

            return (
                < tr key={key}>
                    <td>
                        {trade.date}<br />
                        <p>{trade.time}</p>
                    </td>
                    <td>
                        <div>
                            {trade.cryptoCoin}
                            <img src={symbolLogo} alt="alternatetext"></img>

                        </div>

                    </td>
                    <td>{trade.entryPrice}</td>
                    <td>{trade.posType}</td>
                    {/* used to delete the trade */}
                    <td><i onClick={() => deleteOldTrade(key, trade.date, trade.time, userId)} className="fa-solid fa-trash-can"></i></td>
                </tr >
            )
        })
    }

    //display new trades
    const DisplayNewTrades = () => {

        const fetchTrade = useSelector((state) => state.newTrade.value)
        const [newTrades, updateNewTrades] = useState([])


        useEffect(() => {


            //fetch trade starts at null
            if (!fetchTrade) return;
            addTradeDatabase(fetchTrade, userId)
            updateNewTrades([fetchTrade, ...newTrades])

        }, [fetchTrade])

        //delete trade 
        function deleteNewTrade(index, date, time, userId) {
            const newArray = newTrades.filter((trade, i) => index !== i)
            // console.log(oldTrades,newArray)
            // console.log(oldTrades.length, newArray.length)

            fetchTradeDataBase(date, time, userId)
            updateNewTrades(newArray)


        }

        return newTrades.map((trade, key) => {

            return (
                < tr
                    key={key}
                // style={(key === 0) ? { color: 'blue', borderBottom: '2px solid black' } : {}}
                >
                    <td>
                        {trade.date}<br />
                        <p>{trade.time}</p>
                    </td>
                    <td>
                        <div>
                            {trade.cryptoCoin}
                            <img src={trade.cryptoImage} alt="alternatetext"></img>

                        </div>

                    </td>
                    <td>{trade.entryPrice}</td>
                    <td>{trade.posType}</td>
                    <td><i onClick={() => deleteNewTrade(key,trade.date, trade.time, userId) } className="fa-solid fa-trash-can"></i></td>
                </tr >
            )
        })
    }

    return (

        <div className="tracker_table_container">

            <div className="tracker_table">
                <table>

                    {/* header for table */}
                    <thead>
                        <tr>
                            <th>Trade Taken</th>
                            <th>Symbol</th>
                            <th>Entry Price</th>
                            <th>Long/Short</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {/* table body */}
                    <tbody>


                        {
                            // user needs to be logged in for this to load 
                            userId && <DisplayNewTrades />
                        }
                        {
                            // user needs to be logged in for this to load 
                            userId && <DisplayOldTrades />
                        }


                    </tbody>
                </table>
            </div>


            <div className="tracker_moreInfo_icon">
                <i className="fa-solid fa-pen-to-square"></i>
            </div>
            {/* <div className="tracker_moreInfo">
                <i className="fa-solid fa-info"></i>  Coming Out Soon
            </div> */}
        </div>


    )
}