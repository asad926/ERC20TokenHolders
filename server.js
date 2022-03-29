const express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const path = require('path')
const TokenHolders = require('./getTokenHolders')
const port = "3000";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/get_holders',(req,res)=>{
    reqPath = "./res/TokenHolders.json"
    fs.readFile(reqPath , 'utf8', function (err, data) {
       if(!err) {
          var jsonObj = JSON.parse(data)
          res.json( jsonObj );
        }else {
           res.end("Error: "+err )
        }
   });
});

app.get('/sync_holders',async (req,res)=>{
    let tokenHolders = new TokenHolders();
    let result = await tokenHolders.getTokenHolders();
    res.send(result);
});

app.listen(port);
console.log('server is listing on 3000 port');