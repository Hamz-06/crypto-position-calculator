import React, { useEffect, useState, useMemo } from "react";
import './TradeTrackerPrev.css'
import { displayTradeDataBase } from '../Firebase/Firebase_user_info'
import { useSelector } from 'react-redux'
import { useRef } from "react";
import { useCallback } from "react";
export function TradeTracker() {

    
    const userId = useSelector((state) => state.userId.value)
        

    const DisplayOldTrades = () => {
        
        const [oldTrades, updateOldTrades] = useState()
       
        
        useEffect(() => {
            //fetches trade from firebase database 
            displayTradeDataBase().then((res) => {
                updateOldTrades(res)
            })
        }, [])

        if (!oldTrades) return
        return oldTrades.map((trade, key) => {
            
            return (
                < tr key={key}>
                    <td>19/12/21</td>
                    <td>{trade.tradeId}</td>
                    <td>21000.12</td>
                    <td>Long</td>
                </tr >
            )
        })
    }
    
    
    const DisplayNewTrades = () => {

        const [newTrades, updateNewTrades] = useState([])
        const fetchTrade = useSelector((state) => state.newTrade.value)
        
        useEffect(() => {
            if(!fetchTrade) return;
            updateNewTrades([...newTrades,fetchTrade])
            
        }, [fetchTrade])

        console.log('refresh')

        return newTrades.map((trade, key)=>{
         
            return (
                < tr key={key} style={(key===0)?{color:'blue', borderBottom:'2px solid green'}:{color:'red'}}>
                    <td>{trade.posType}</td>
                    <td>{trade.entryPrice}</td>
                    <td>lol</td>
                    <td>lol</td>
                </tr >
            )
        })
    }

    return (

        <div className="tracker_table_container">
            
            <div className="tracker_table">
                <table>
                    <thead>
                        <tr>
                            <th>Trade Taken</th>
                            <th>Symbol</th>
                            <th>Entry Price</th>
                            <th>Long/Short</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>19/12/21
                                <br />
                                <p>lol</p>
                            </td>
                            <td>BTC/USDT</td>
                            <td>21000.12</td>
                            <td>Long</td>
                            <td><i className="fa-solid fa-trash-can"></i></td>
                        </tr>

                        {
                            userId && <DisplayNewTrades/>
                        }

                        {
                            // user needs to be logged in for this to load 
                            userId && <DisplayOldTrades/>
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