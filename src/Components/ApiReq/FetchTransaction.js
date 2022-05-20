
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import './FetchTransaction.css';


function addTrailingZeros(num, totalLength) {
    return String(num).padEnd(totalLength, '0');
}



function FetchTransation(){

    
    
    const [balance, setBalance] = useState(()=>{
        return[];
    });

    var [logo, addLogo] = useState(()=>{
        return[];
    });

    
  

    function GetLogo(contAddress){
        
        useEffect(()=>{
          
            axios({
                "method": "GET",
                "url": "https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/0x3019bf2a2ef8040c242c9a4c5c4bd4c81678b2a1",
                "params": {
                    "contract_addresses": contAddress,
                    "vs_currencies": "usd"
                }
            })
    
            .then((responce)=>{
            
               
            
                var imgUrl=responce.data.image.small
                console.log(imgUrl)
                
            })
       
            
        },[])
        
    }
    

    
    

    
    
  

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY
        console.log(apiKey);

        axios({
            "method": "GET",
            "url": "https://api.bscscan.com/api",
            "params": {
                "module": "account",
                "action": "tokentx",
                //"contractaddress": "0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51",
                "address": "0xb8f6bE82647053298B60546Ce0e612EACbCC8E0F",
                "page": "1",
                "offset": "5",
                "startblock": "0",
                "endblock": "999999999",
                "sort": "desc",
                "apikey": "CJE4YFKDC1WV865X6RVQAZDXFHZBRWHZIH"
            }
        })

        .then((responce)=>{
        
            setBalance(responce.data.result)
            //console.log(responce)
            const contAddress = responce.data.contractAddress;
            GetLogo(contAddress);
        })
        
    },[])



    var total=0;

    return(

        <div className='displayTransactionBox'>
            <table>
            
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>



                {balance.map((bal, key)=>{

                    //get value
                    var getTranferAmount = bal.value;
                    //get token decimal and tranfer gwei to normal amount 
                    var getDecimal = bal.tokenDecimal;
                    var getGwei = addTrailingZeros(1,getDecimal) * 10
                    getTranferAmount = getTranferAmount/getGwei;
                    getTranferAmount = getTranferAmount.toFixed(2)
                    

                    //sum up total
                    total = total+bal.value;

                    return(

                        <tr>
                            <td>{getTranferAmount}</td>
                            <td></td>
                            <td>Germany</td>
                        </tr>

                    
                    );
                    
                })}


            </table>

            total is {total}
           
        </div>
    );
       
}



export default FetchTransation;