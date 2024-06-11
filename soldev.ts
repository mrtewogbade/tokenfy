import * as web3 from '@solana/web3.js'
import * as token from '@solana/spl-token';

async function buildCreateMintTransaction(
    connection: web3.Connection,
    payer: web3.PublicKey,
    decimals: number
) : Promise<web3.Transaction> {

    const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
    // const mint = web3.Keypair.generate();
    const accountKeypair = web3.Keypair.generate();
    // console.log(accountKeypair.publicKey.toBase58());
    
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
            payer,
            programId,
        )

    );
    return transaction;

}