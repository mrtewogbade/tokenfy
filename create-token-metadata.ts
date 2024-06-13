// This uses "@metaplex-foundation/mpl-token-metadata@2" tokens

import "dotenv/config";
import { getKeypairFromEnvironment, getExplorerLink, } from "@solana-developers/helpers";

import {
    Connection,
    clusterApiUrl,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

console.log(`Loaded our keypair, ${user.publicKey.toBase58()}, from the environment`);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const tokenMintAccount = new PublicKey("7ot5KYoyZjy992zwef2zzVr64HVSJszTYi5uQH5tv15i");

const metadataData = {
    name: "SuperTeam Lagos Token",
    symbol: "SUPERTEAM",

    // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data

    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
);

const metaDataPDA = metadataData[0];

const transaction = new Transaction();

const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metaDataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey,
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true,
        },
    }
);

transaction.add(createMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
);

const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
)

console.log(`Finished! Created token metadata: ${transactionLink}`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
)

console.log(`Look at the token mint again: ${tokenMintLink}`);




// import "dotenv/config";
// import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
// import {
//     Connection,
//     clusterApiUrl,
//     Keypair,
//     PublicKey,
//     SystemProgram,
//     Transaction,
//     sendAndConfirmTransaction,
// } from "@solana/web3.js";
// import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

// const user = getKeypairFromEnvironment("SECRET_KEY");
// const connection = new Connection(clusterApiUrl("devnet"));

// console.log(`Loaded our keypair, ${user.publicKey.toBase58()}, from the environment`);

// const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

// const tokenMintAccount = new PublicKey("7ot5KYoyZjy992zwef2zzVr64HVSJszTYi5uQH5tv15i");

// const metadataData = {
//     name: "SuperTeam Lagos Token",
//     symbol: "SUPERTEAM",
//     // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
//     uri: "https://arweave.net/1234",
//     sellerFeeBasisPoints: 0,
//     creators: null,
//     collection: null,
//     uses: null,
// };

// const [metadataPDA] = PublicKey.findProgramAddressSync(
//     [
//         Buffer.from("metadata"),
//         TOKEN_METADATA_PROGRAM_ID.toBuffer(),
//         tokenMintAccount.toBuffer(),
//     ],
//     TOKEN_METADATA_PROGRAM_ID
// );

// const transaction = new Transaction();

// const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
//     {
//         metadata: metadataPDA,
//         mint: tokenMintAccount,
//         mintAuthority: user.publicKey,
//         payer: user.publicKey,
//         updateAuthority: user.publicKey,
//     },
//     {
//         createMetadataAccountArgsV3: {
//             data: metadataData,
//             isMutable: true,
//             collectionDetails: null,
//         },
//     }
// );

// transaction.add(createMetadataAccountInstruction);

// const transactionSignature = await sendAndConfirmTransaction(
//     connection,
//     transaction,
//     [user]
// );

// const transactionLink = getExplorerLink(
//     "transaction",
//     transactionSignature,
//     "devnet"
// );

// console.log(`Finished! Created token metadata: ${transactionLink}`);

// const tokenMintLink = getExplorerLink(
//     "address",
//     tokenMintAccount.toString(),
//     "devnet"
// );

// console.log(`Look at the token mint again: ${tokenMintLink}`);
