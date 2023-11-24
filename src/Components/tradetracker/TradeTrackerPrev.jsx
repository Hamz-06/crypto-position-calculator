import React, { useEffect } from "react";
import "./TradeTrackerPrev.css";
import { displayTradeDataBase } from "../Firebase/Firebase_user_info";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTradeDataBase,
} from "../Firebase/Firebase_user_info";
import { cryptoCoins, getCryptoImage, unixToDate } from "../ApiReq/PriceData";
import { useSpring, animated, useTransition } from "react-spring";
import { deleteNewTrade, setNewTrade } from "../Storage/NewTrade";
import { setLoading } from "../Storage/loading";

export function TradeTracker() {

  const userId = useSelector((state) => state.userId.value);
  const fetchTrade = useSelector((state) => state.newTrade.value);
  const loading = useSelector((state) => state.loading.value);


  // const [newTrades, updateNewTrades] = useState([]);
  const dispatch = useDispatch();

  //redux - send old + new trades to redux storage
  //delete trade
  async function deleteTrade(index, date) {

    const newArray = fetchTrade.filter((_, i) => index !== i);
    
    try {
      dispatch(setLoading(true));
      await fetchTradeDataBase(date, userId);

    } catch (error) {

    } finally {
      dispatch(deleteNewTrade(newArray));
      dispatch(setLoading(false));
    }
  }



  //used to fetch old trades
  useEffect(() => {
    if (!userId) return;

    //fetches trade from firebase database
    displayTradeDataBase(userId)
      .then((res) => {
        // updateOldTrades(res);
        dispatch(setNewTrade(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);




  //display new trades
  const DisplayNewTrades = () => {

    // const tradeTrackAnim = useSpring({
    //   to: { opacity: 1, x: 0, y: 0 },
    //   from: { opacity: 0, x: 200, y: 0 },
    // });

    if (!userId) return;
    return fetchTrade.map((trade, key) => {
      //get date and time -> 21/07/2022, 01:03:50 --- splice comma
      const dateAndTime = unixToDate(trade.date);
      const arrayDate = dateAndTime.split(",");

      return (
        <animated.tr key={key}
        // style={tradeTrackAnim}
        >
          <td>
            {arrayDate[0]}
            <br />
            {arrayDate[1]}
          </td>
          <td>
            <div>
              {trade.cryptoCoin}
              <img src={getCryptoImage(trade.cryptoCoin)} alt="alternatetext"></img>
            </div>
          </td>
          <td>{trade.entryPrice}</td>
          <td>{trade.posType}</td>
          <td>
            <button
              onClick={() =>
                deleteTrade(key, trade.date)
              }
              disabled={loading}
            >
              <i
                className="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </animated.tr>
      );
    });
  };

  return (
    <>
      <div className="tracker_table_container">
        {
          //if user not logged in display lock
          !userId ? <p className="signInPrompt">Please sign in</p> : ""
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
              
                {/* user needs to be logged in for this to load */}
                <DisplayNewTrades />
              
            </tbody>
          </table>
        </div>

        <a
          href="https://hamz-06.github.io/crypto-position-calculator/#/view_trades&potfolio"
          className="tracker_moreInfo_icon"
          target="_blank">
          <i className="fa-solid fa-pen-to-square"></i>
        </a>
        {/* <div className="tracker_moreInfo">
                <i className="fa-solid fa-info"></i>  Coming Out Soon
            </div> */}
      </div>
    </>
  );
}
