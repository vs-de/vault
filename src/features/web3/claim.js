import { earnContractABI } from "../configure";
import { fetchGasPrice } from '.';

export const claim = async ({web3, address, contractAddress}) => {
  // console.log(`=====================================approval begin=====================================`)
  const gasPrice = await fetchGasPrice();
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  //   gasPrice:${gasPrice}\n
  // `)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  const data = await _claim({web3, contract, address, gasPrice});
  // console.log(`=====================================approval success=====================================`)
  return data;
}

const _claim = ({web3, contract, address, gasPrice}) => {
  return new Promise((resolve, reject) => {
    contract.methods.claim().send({ from: address, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
        console.log(hash)
        resolve(hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        console.log(error)
        reject(error)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}