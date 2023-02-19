import { MerkleTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

  const getWasTxMined = async (e) => {

    const btc_TXID = '1a5b9c6c279bd807aec9923495b8b913aab210e7b9b7bfbe3b0fc1e3281c8fbb';
    const blockhash = (await axios.get(`https://btc.getblock.io/rest/tx/1015a8d3-1f41-4d2b-9bdc-0f4c917ae94d/${btc_TXID}.json`)).data;
    const block = (await axios.get(`https://btc.getblock.io/rest/block/1015a8d3-1f41-4d2b-9bdc-0f4c917ae94d/${blockhash.blockhash}.json`)).data;
    
    const txids = block.tx.map(t => t.txid);
    const txIndex = txids.findIndex(id => id === btc_TXID);
    console.log(txIndex);
    const tree = new MerkleTree(txids, SHA256, { isBitcoinTree: true });
    console.log(tree);
    const treeDepth = tree.getDepth();
    const proof = tree.getProof(btc_TXID, txIndex);

    const blockCV = tupleCV({
      version: bufferCV(hexToBytes(block.versionHex)),
      parent: bufferCV(hexToBytes(block.previousblockhash)),
      "merkle-root": bufferCV(hexToBytes(block.merkleroot)),
      timestamp: bufferCV(hexToBytes(block.time.toString(16).padStart(8, "0"))),
      nbits: bufferCV(hexToBytes(block.bits.toString(16).padStart(8, "0"))),
      nonce: bufferCV(hexToBytes(block.nonce.toString(16).padStart(8, "0"))),
      height: uintCV(block.height),
    });
    
    const proofCV = tupleCV({
      'tx-index': uintCV(txIndex),
      hashes: listCV(proof.map(po => { ; return bufferCV(po.data) })),
      'tree-depth': uintCV(treeDepth),
    });
    const options = {
      contractAddress: 'STT4SQP5RC1BFAJEQKBHZMXQ8NQ7G118F0XRWTMV',
      contractName: 'clarity-bitcoin',
      functionName: 'was-tx-mined',
      functionArgs: [blockCV, bufferCV(hexToBytes(btc_TXID)), proofCV],
      network: new StacksMainnet(),
      senderAddress: userSession.loadUserData().profile.stxAddress.mainnet,
    };

    try {
      callReadOnlyFunction(options)
        .then(result => {
          console.log('Smart-Contract result', result);
        });

    } catch (error) {
      console.log(error);
    }

  }

const ContractCall = () => {
  return (
    <div>{result}</div>
  )
}

export default ContractCall