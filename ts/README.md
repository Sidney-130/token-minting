# SPL Token - Janey (JAN)

## Mint Address
```
9V9P1Vkq4aeU7tmnEfcGnSZ99ivpWqSDFcsE5u21Bvhh
```

**Network:** Solana Devnet

## Token Details
- **Name:** Janey
- **Symbol:** JAN
- **Decimals:** 6

## Steps Completed

### 1. Generate Keypair
Created a Solana keypair and saved to `turbin3-wallet.json`

### 2. Initialize Mint (`spl_init.ts`)
Created the SPL token mint using `@solana/spl-token`:
```typescript
const mint = await createMint(
  connection,
  keypair,
  keypair.publicKey,
  null,
  6,
);
```

### 3. Mint Tokens (`spl_mint.ts`)
Created an Associated Token Account (ATA) and minted tokens:
```typescript
const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, 8444449);
```

### 4. Add Metadata (`spl_metadata.ts`)
Added token metadata using Metaplex Token Metadata program:
```typescript
let data: DataV2Args = {
    name: "Janey",
    symbol: "JAN",
    uri: "",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
}
```

## View Token
View on Solana Explorer:
https://explorer.solana.com/address/9V9P1Vkq4aeU7tmnEfcGnSZ99ivpWqSDFcsE5u21Bvhh?cluster=devnet
