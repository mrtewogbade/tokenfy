import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"


// Token Mint
// This program creates a new token mint



async function buildCreateMintTransaction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    mint: web3.PublicKey,
): Promise<web3.Transaction> {
    const mintState = await token.getMint(connection, mint)
   
    const accountKeypair = web3.Keypair.generate();
    const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
    const programId = token.TOKEN_PROGRAM_ID;

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: accountKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports,
            programId,
        }),

        token.createInitializeMintInstruction(
            accountKeypair.publicKey,
            decimals,
            payer,
            programId
        )
        
    );

    

    return transaction
}

async function buildMintToTransaction(
    authority: web3.PublicKey,
    mint: web3.PublicKey,
    amount: number,
    destination: web3.PublicKey,
): Promise<web3.Transaction> {
    const transaction = new web3.Transaction().signatures(
        token.createMintToInstruction(
            mint,
            destination,
            authority,
            amount
        )
    )

    return transaction;
}