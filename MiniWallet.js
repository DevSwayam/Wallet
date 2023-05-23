// For Dot Env Usage
require('dotenv').config();

//Importing Web3 package
const Web3 = require('web3');
//Importing Api Key from Env
const apiKey = process.env['Api_Key'];
//Setting up network
const network = 'testnet'

// Final Api Key which will be inetracting
const node = `https://bsc.getblock.io/${apiKey}/${network}/`;

//Taking Web3 Object
const web3 = new Web3(node);

// testing if Object is returning propoer params
//console.log(web3Obj)

// Creating a random account that will receive BSC value
const AccountTo = web3.eth.accounts.create();
console.log('Address is ' + AccountTo.address);
console.log(AccountTo);

// Importing metamask account via Private Key
const Priavte_Key = process.env['private_Key'];
const AccountFrom = web3.eth.accounts.privateKeyToAccount(Priavte_Key);
console.log(AccountFrom);

//FUNBCTION FOR Creating tjhe signed transaction that will be sent 
const createSignTx = async(rawTx)=>{
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await AccountFrom.signTransaction(rawTx);
}

// FUNCTION FOR SENDING THE SIGNED TRANSACTION
const SendsignedTx = async(signedTx)=>{
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
}

// DEFRINING VALUES
const amount = "0.01"
const rawTx = {
    to:AccountTo.address,
    value:web3.utils.toWei(amount),
}

// CALLING THE SIGNING FUNCTION THEN SENFING FUNCTION
createSignTx(rawTx).then(SendsignedTx);