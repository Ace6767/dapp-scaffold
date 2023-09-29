import { Connection, PublicKey} from '@solana/web3.js';



export interface TransactionDetails {
  walletAddress: string;
  amount: number;
  time: Date;
}

export async function viewDonors(address: string): Promise<TransactionDetails[]> {
  const endpoint = 'https://api.devnet.solana.com';
  const solanaConnection = new Connection(endpoint);

  const transactionDetails: TransactionDetails[] = [];

  const publicKey = new PublicKey(address);
  const txs = await solanaConnection.getConfirmedSignaturesForAddress2(publicKey);
  for (let i = 0; i < txs.length; i++) {
    const transaction = txs[i];
    const currentRecord = await solanaConnection.getParsedTransaction(transaction.signature);
    const date = new Date(transaction.blockTime * 1000);
    const postBalance = currentRecord.meta.postBalances[0]
    const preBalance = currentRecord.meta.preBalances[0]
    const fee = currentRecord.meta.fee;
    const amountTransferred = (preBalance - postBalance - fee) / 1000000000;
    const donor = currentRecord.transaction.message.accountKeys[0].pubkey.toBase58();

    if (address !== donor) {
      const transactionDetail: TransactionDetails = {
        walletAddress: donor,
        amount: amountTransferred,
        time: date,
      };

      transactionDetails.push(transactionDetail);
    }
  }

  return transactionDetails;
}

