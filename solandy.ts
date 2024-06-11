import {createMint} from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";
import dotenv from "dotenv";

import fs from "fs";

const importedKey = process.env.SECRET_KEY

console.log(importedKey);


async function createMintTransaction(){
    const connection = new Connection(clusterApiUrl("devnet"));

    if (!importedKey) {
        throw new Error("SECRET_KEY environment variable is not set.");
    }
    const secret = JSON.parse(fs.readFileSync('7ot5KYoyZjy992zwef2zzVr64HVSJszTYi5uQH5tv15i').toString()) as number[];
    // const secret = JSON.parse(importedKey.publicKey.toBase58());
    const secretKey = Uint8Array.from(secret);
    const payer = Keypair.fromSecretKey(secretKey);

    const secretT = JSON.parse(fs.readFileSync('MTmFdShBgABAKwawvpgPMzNpJWqrwiqLSUKPZC6wkdH.json').toString()) as number[];
    const secretKeyT = Uint8Array.from(secretT);
    const tokenKeypair = Keypair.fromSecretKey(secretKeyT);
    console.log(secretKeyT);
    console.log(secretT);
    


   const tokenMintAddress = await createMint(connection, payer, payer.publicKey, payer.publicKey, 9, tokenKeypair )
    console.log(`tokenMintAddress: ${tokenMintAddress.toBase58()}`);

   
    


}

// '7ot5KYoyZjy992zwef2zzVr64HVSJszTYi5uQH5tv15i'



// import "dotenv/config";
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";


// const keypair = getKeypairFromEnvironment("SECRET_KEY");

// const publicKey = keypair.publicKey.toBase58();

// console.log(publicKey)