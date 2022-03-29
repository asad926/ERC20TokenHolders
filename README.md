# ERC20TokenHolders
  This is nodejs apis which get ERC20 token holders and their balances.
  it is develop in express.js framework which respond all holders in form of json.
# How_It_Works
  I have write the script which get all the contract "TRANSFER" events logs from the initial block of the contract deployment to the lastest block of the network.
  Then I have filter all the logs decrypt it using the erc20 ABI which give me the decrypted log from which I can get the "TO" , "FROM" and "VALUE" which transfered. 
  From these derypted log I have create a balance sheet of all addresses and calculate these balances from the logs. This will give me holdeers with their balances then I have filter the 0 balance addresses.
  and return as responce of the APIs in form of json.
  
# TESTING
  Clone this repository and run "NPM INSTALL" command after the run the "NPM START" 
  APIs server starts on local host at "3000" port.
  There are two apis routes "/get_holders" and "/sync_holders".
  Open browser and load "localhost:3000/get_holders" this will load the data from the server store beasue I have create the file on server to make the process fast.
  When "localhost:3000/sync_holders" it will takes a little time to getting logs and filters thats why I make the file to responce fast and when "/sync_holders" calls it will update the file to lastest results.
  
