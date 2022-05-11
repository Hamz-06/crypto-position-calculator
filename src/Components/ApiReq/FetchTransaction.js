import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';



function FetchTransation(){
    
    
    const [balance, setBalance] = useState(()=>{
        return[];
    });

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY
        console.log(apiKey);

        axios({
            "method": "GET",
            "url": "https://api.bscscan.com/api",
            "params": {
                "module": "account",
                "action": "txlist",
                "address": "0xb8f6bE82647053298B60546Ce0e612EACbCC8E0F",
                "startblock": "0",
                "endblock": "99999999",
                "page": "1",
                "offset": "10",
                "sort": "dsc",
                "apikey": process.env.REACT_APP_API_KEY
            }
        })

       .then((responce)=>{
        
            setBalance(responce.data.result)
        })
        
    },[])
    
    return(

        <>
        {balance.map((bal, key)=>
            <div key={key}>{bal.value/1000000000000000000}</div>

        )}
        </>
    );
       
}

function getPosts(){
    
}

  





export default FetchTransation;