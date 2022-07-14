import { db } from "./Firebase";
import { collection, setDoc, doc, getDoc, getDocs, query, addDoc} from "firebase/firestore"; 



//create a user database
export const createUserDataBase=async(userId)=>{
    //get specific user 
    //collection
    const getUserRef = doc(db,'test',userId);
    //doc snap
    const docSnap = await getDoc(getUserRef);
    //check if user exists
    if(docSnap.exists()){

        console.log(docSnap)
        console.log('avaliable')
    //if no existence create one 
    }else{
        console.log('not available')
        
        //get collection of all users 
        await setDoc(doc(db,'test',userId),{})
    }
}
//add trade 
export const createUserTradeDataBase=async()=>{
    
    // display all trades
    // const getUserCollRef = collection(db,'test','Lle06OUXy7WdlscUd12TsxMCmfI3','trade');
    // //const docSnap = query(getUserCollRef)
    // const docSnap = await getDocs(getUserCollRef)
    // docSnap.forEach((doc)=>{
    //     console.log(doc.data(),doc.id)
    // })

    //add a trade
    // await addDoc(collection(db,'test','Lle06OUXy7WdlscUd12TsxMCmfI3','trade'),{
    //     long:21000,
    //     short:23000,
    //     posType:'long',
    //     limitOrder:null,
    //     filled:true,

    // })


    

    

}

