import React from "react";
import './TradeTrackerPrev.css'
export function TradeTracker() {
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


                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>19/12/21</td>
                            <td>BTC/USDT</td>
                            <td>21000.12</td>
                            <td>Long</td>
                        </tr>

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