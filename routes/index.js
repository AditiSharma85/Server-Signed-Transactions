var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', async function (req, res, next) {
  const Web3 = require('web3');
  var Tx = require('ethereumjs-tx').Transaction;

  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  const accounts = await web3.eth.getAccounts(console.log);
  console.log("Account: ", accounts);
  const contractAddress = '0x4CEe341E0E90896a34ddbDc1068E6bB1Dd5aA79c';
  const ABI = require('./test.abi.json');
  const account = '0x26c8ab5693a81557bB4b3E9C2a50928Ce3f7E37a';
  const privateKey = Buffer.from('81d625a02381545475cf5fb35e732286c13c4dbbd95df4310740702315d7268c', 'hex');
  const num = 2210;
  var TestContract = new web3.eth.Contract(ABI, contractAddress);
  const _data = TestContract.methods.store(num).encodeABI();
  _nonce = await web3.eth.getTransactionCount(account)
  var rawTx = {
    nonce: _nonce,
    gasPrice: '0x20000000000',
    gasLimit: '0x27511',
    to: contractAddress,
    value: 0,
    data: _data
  }
  var tx = new Tx(rawTx);
  tx.sign(privateKey);
  var serializedTx = tx.serialize();
  var _receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log("Receipt: ", _receipt);


  res.render('index', { title: 'Express', receipt: JSON.stringify(_receipt) });
});

module.exports = router;
