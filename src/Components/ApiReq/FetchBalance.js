import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';



function FetchBalance(){
    
    
    const [balance, setBalance] = useState(()=>{
        return [];
    });

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY
        console.log(apiKey);

        axios({
           "method": "GET",
           "url": "https://api.bscscan.com/api",
           "params": {
               "module": "account",
               "action": "balance",
               "address": "0xb8f6bE82647053298B60546Ce0e612EACbCC8E0F",
               "apikey": process.env.REACT_APP_API_KEY
           }
        })
        
        .then((responce)=>{
            
            setBalance(responce.data.result)
        })
        
    },[])
    
    console.log("");
    return(
        <h1>{balance}</h1>
    );
       
}


  





export default FetchBalance;