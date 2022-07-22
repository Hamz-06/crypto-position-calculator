import React, { useEffect, useState, useMemo } from "react";
import './TradeTrackerPrev.css'
import { displayTradeDataBase } from '../Firebase/Firebase_user_info'
import { useSelector } from 'react-redux'
import { useRef } from "react";
import { addTradeDatabase, fetchTradeDataBase } from '../Firebase/Firebase_user_info'
import { cryptoCoins, getCryptoImage, unixToDate } from '../ApiReq/PriceData'

export function TradeTracker() {


    const userId = useSelector((state) => state.userId.value)



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
        function deleteOldTrade(index, date, userId) {
            const newArray = oldTrades.filter((_, i) => index !== i)
            // console.log(oldTrades,newArray)
            // console.log(oldTrades.length, newArray.length)
            fetchTradeDataBase(date, userId)
            updateOldTrades(newArray)
        }

        //if there is data inside old trades
        if (!oldTrades) return
        return oldTrades.map((trade, key) => {
            //gets logo of symbol
            var symbolLogo = getCryptoImage(trade.cryptoCoin)
            //get date and time -> 21/07/2022, 01:03:50 --- splice comma 
            const dateAndTime = unixToDate(trade.date)
            const arrayDate = dateAndTime.split(',')
            return (
                < tr key={key}>
                    <td>
                        {arrayDate[0]}<br />{arrayDate[1]}
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
                    <td><i /** onClick={() => deleteOldTrade(key, trade.date, userId)}*/ className="fa-solid fa-trash-can"></i></td>
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
        function deleteNewTrade(index, date, userId) {


            const newArray = newTrades.filter((_, i) => index !== i)
            //used to fetch trade and delete it
            fetchTradeDataBase(date, userId)
            updateNewTrades(newArray)

        }

        return newTrades.map((trade, key) => {
            //get date and time -> 21/07/2022, 01:03:50 --- splice comma 
            const dateAndTime = unixToDate(trade.date)
            const arrayDate = dateAndTime.split(',')

            return (
                <tbody>
                    < tr
                        key={key}
                    // style={(key === 0) ? { color: 'blue', borderBottom: '2px solid black' } : {}}
                    >
                        <td>
                            {arrayDate[0]}<br />{arrayDate[1]}

                        </td>
                        <td>
                            <div>
                                {trade.cryptoCoin}
                                <img src={trade.cryptoImage} alt="alternatetext"></img>

                            </div>

                        </td>
                        <td>{trade.entryPrice}</td>
                        <td>{trade.posType}</td>
                        <td><i onClick={() => deleteNewTrade(key, trade.date, userId)} className="fa-solid fa-trash-can"></i></td>
                    </tr >
                </tbody>
            )
        })
    }


    return (
        <>


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
           


        </>
    )
}