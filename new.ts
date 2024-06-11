import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';


async function buildCreateAssociatedTokenAccountJTransaction( payer: web3.PublicKey, mint: web3.PublicKey): Promise<web3.Transaction>{
    const associatedTokenAddress = await token.getAssociatedTokenAddress(mint, payer, false);

    const transaction = new web3.Transaction().add(
        token.createAssociatedTokenAccountInstruction(
            payer,
            associatedTokenAddress,
            payer,
            mint
        )
    )

    return transaction;

}


const transactionSignature = await token.mintTo()