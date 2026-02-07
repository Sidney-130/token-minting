import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallet from "../turbin3-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// Load keypair
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection(
  "https://devnet.helius-rpc.com/?api-key=988203e5-650c-4004-9b18-da8631d7205e",
  commitment,
);

// NFT mint address
const mint = new PublicKey("BDHCKwaQCsHAgYjjyxtrFDAUvcQ6ejnHLeo51WT2iZMq");

// Recipient address
const to = new PublicKey("AQN99WXhgKyZyh5Xk31odRLhHKu5WqMKCug2z2cqUuLD");

(async () => {
  try {
    // Get your associated token account (ATA)
    const fromAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
    );
    console.log(`Your ATA: ${fromAta.address.toBase58()}`);

    // Get recipient ATA
    const toAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to,
    );
    console.log(`Recipient ATA: ${toAta.address.toBase58()}`);

    const tx = await transfer(
      connection,
      keypair,
      fromAta.address,
      toAta.address,
      keypair.publicKey,
      1,
    );
    console.log(`Transfer txid: ${tx}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
