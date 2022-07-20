import { db } from "./Firebase";
import { collection, setDoc, doc, getDoc, getDocs, where, addDoc, query } from "firebase/firestore";



//create a user database
export const createUserDataBase = async (userId) => {
    //get specific user 
    //collection

    const getUserRef = doc(db, 'user', userId);
    //doc snap
    const docSnap = await getDoc(getUserRef);
    //check if user exists
    if (docSnap.exists()) {


        //if no existence create one 
    } else {


        //get collection of all users 
        await setDoc(doc(db, 'user', userId), {})
    }
}

//add trade 
export const displayTradeDataBase = async (userId) => {
    var trades = []

    // // display all trades
    const getUserCollRef = collection(db, 'user', userId, 'trade');
    //const docSnap = query(getUserCollRef)
    const docSnap = await getDocs(getUserCollRef)

    docSnap.forEach((doc) => {

        var trade = {
            tradeId: doc.id,
            posType: doc.data().posType,
            entryPrice: doc.data().entryPrice,
            takeProfit: doc.data().takeProfit,
            stopLoss: doc.data().stopLoss,
            date: doc.data().date,
            time: doc.data().time,
            cryptoCoin: doc.data().cryptoCoin
        }
        //fetches old to new trades 
        trades.push(trade)
    })

    //we have to reverse the trades so new -> old
    trades = trades.reverse();
   

    return trades


}

export const addTradeDatabase = async (tradeInfo,uniqueId) => {
    console.log(tradeInfo, uniqueId)
    //add a trade
    await addDoc(collection(db, 'user', uniqueId, 'trade'), {
        posType: tradeInfo.posType,
        entryPrice: tradeInfo.entryPrice,
        takeProfit: tradeInfo.takeProfit,
        stopLoss: tradeInfo.stopLoss,
        date: tradeInfo.date,
        time: tradeInfo.time,
        cryptoCoin: tradeInfo.cryptoCoin

    })
}

//used to fetch and delete a trade (this could be used to edit in the future)
export const fetchTradeDataBase =async (tradeDate,tradeTime, uniqueId) => {
    const userColl = collection(db, "user", uniqueId, 'trade');
    // Create a query against the collection.
    const trade = query(userColl, where("date", "==", tradeDate),where("time","==",tradeTime));

    const tradeSnapshot = await getDocs(trade);
    tradeSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    


}
