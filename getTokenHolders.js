const axios = require('axios');
const ethers = require("ethers");
var fs = require('fs');
let abi = require('./res/abi.json');
require('dotenv').config(); 
class TokenHolders {

    constructor(){

    }

    async getTokenHolders() {
        const network = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/v1/8e20b375b7c0e265eb7196d605215105ea0f267b");

    
        let lastestBlock = await network.getBlockNumber()
        let logDecoder = new ethers.utils.Interface(abi);
        let balanceSheet = {};
        for(let i = parseInt(process.env.CONTRACT_BLOCK); i<= lastestBlock; i=i+40000 ){
            
           let url = 'https://api-testnet.polygonscan.com/api';
        let response = await axios({
            method:'get',
            url,
            params:{"module":"logs","action":"getLogs","fromBlock":i,"toBlock":(i+40000),
                    "address":process.env.CONTRACT_ADDRESS,"topic0":process.env.TOPIC,
                    "topic0_1_opr":"and","apikey":process.env.API_KEY,}
        })
            let log_data = response.data.result; 
            log_data.forEach((log)=>{
                let d_log = logDecoder.decodeEventLog("Transfer",log.data,log.topics);
                let obj = {};
                obj["from"] = d_log[0];
                obj["to"] = d_log[1];
                obj["value"] = parseFloat(ethers.utils.formatEther(d_log[2]));
                if(!balanceSheet[obj.from]){
                    balanceSheet[obj.from] = 0.00000000;
                }if(!balanceSheet[obj.to]){
                    balanceSheet[obj.to] = 0.00000000;
                } 
                balanceSheet[obj.from] -= obj.value;
                balanceSheet[obj.to] += obj.value;
                
            });
        }
        let holders = [];
        let keys = Object.keys(balanceSheet);
       let values = Object.values(balanceSheet);
       for(let i=0;i<keys.length;i++){
           if(values[i]<=0) continue;
        let entry = {"holder": keys[i], "amount":values[i]};
        holders.push(entry);
       }
       holders.sort(function(a, b) {
        return b.amount - a.amount;
      });
        fs.writeFile ("./res/TokenHolders.json", JSON.stringify(holders), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );

        return holders;    
    }
}


module.exports = TokenHolders;
