import React, { useEffect, useState, useMemo, useCallback } from "react";
import './TradeTrackerPrev.css'
import { displayTradeDataBase } from '../Firebase/Firebase_user_info'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from "react";
import { addTradeDatabase, fetchTradeDataBase } from '../Firebase/Firebase_user_info'
import { cryptoCoins, getCryptoImage, unixToDate } from '../ApiReq/PriceData'
import { useSpring, animated, useTransition } from 'react-spring'
import { Link } from "react-router-dom";
import { setAllTrades } from "../Storage/AllTrades";
export function TradeTracker() {

    const userId = useSelector((state) => state.userId.value)
    const fetchTrade = useSelector((state) => state.newTrade.value)
    const [oldTrades, updateOldTrades] = useState(null) //starts with null
    const [newTrades, updateNewTrades] = useState([])
    const dispatch = useDispatch()

    //redux - send old + new trades to redux storage
    useEffect(() => {
        if (oldTrades === null) return;

        const allTrades = oldTrades.concat(newTrades)
        dispatch(setAllTrades(allTrades))

    }, [oldTrades, newTrades])

    //delete trade 
    function deleteTrade(index, date, userId, array, updateArray) {
        const newArray = array.filter((_, i) => index !== i)
        // console.log(oldTrades,newArray)
        // console.log(oldTrades.length, newArray.length)
        fetchTradeDataBase(date, userId)
        updateArray(newArray)
    }

    //used to fetch old trades 
    useEffect(() => {
        if (!userId) return;
        
        //fetches trade from firebase database 
        displayTradeDataBase(userId)
            .then((res) => {
                updateOldTrades(res)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [userId])
    //used to fetcch new trades
    useEffect(() => {


        //fetch trade starts at null
        if (!fetchTrade) return;
        addTradeDatabase(fetchTrade, userId)
        updateNewTrades([fetchTrade, ...newTrades])

    }, [fetchTrade])

    //display old trade 
    const DisplayOldTrades = () => {
        
        const tradeTrackAnim = useSpring({ to: { opacity: 1, x: 0, y: 0 }, from: { opacity: 0, x: 200, y: 0 } })
        //if there is data inside old trades
        if (!oldTrades) return
        return oldTrades.map((trade, key) => {
            //gets logo of symbol
            var symbolLogo = getCryptoImage(trade.cryptoCoin)

            //get date and time -> 21/07/2022, 01:03:50 --- splice comma 
            const dateAndTime = unixToDate(trade.date)
            const arrayDate = dateAndTime.split(',')
            return (
                < animated.tr key={key} style={tradeTrackAnim}>
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
                    <td><i onClick={() => deleteTrade(key, trade.date, userId, oldTrades, updateOldTrades)} className="fa-solid fa-trash-can"></i></td>
                </animated.tr >
            )
        })
    }


    //display new trades
    const DisplayNewTrades = () => {

        const tradeTrackAnim = useSpring({ to: { opacity: 1, x: 0, y: 0 }, from: { opacity: 0, x: 200, y: 0 } })

        if (!userId) return;
        return newTrades.map((trade, key) => {
            //get date and time -> 21/07/2022, 01:03:50 --- splice comma 
            const dateAndTime = unixToDate(trade.date)
            const arrayDate = dateAndTime.split(',')

            return (

                < animated.tr key={key} style={tradeTrackAnim}>
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
                    <td><i onClick={() => deleteTrade(key, trade.date, userId, newTrades, updateNewTrades)} className="fa-solid fa-trash-can"></i></td>
                </animated.tr >

            )
        })
    }


    return (
        <>


            <div className="tracker_table_container">
                {
                    //if user not logged in display lock
                    (!userId)?(   
                        <p className="signInPrompt">Please sign in</p>
                    ):''
                }
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
                                <DisplayNewTrades />
                            }
                            {
                                // user needs to be logged in for this to load 
                                <DisplayOldTrades />
                            }

                        </tbody>

                    </table>
                </div>


                <a href='https://hamz-06.github.io/crypto-position-calculator/#/view_trades&potfolio' className="tracker_moreInfo_icon" target="_blank">
                    <i className="fa-solid fa-pen-to-square"></i>
                </a>
                {/* <div className="tracker_moreInfo">
                <i className="fa-solid fa-info"></i>  Coming Out Soon
            </div> */}
            </div>



        </>
    )
}