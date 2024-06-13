import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction
} from '@solana/web3.js';

import {
    TOKEN_PROGRAM_ID,
    createMint,
    createAccount,
    mintTo,
    getOrCreateAssociatedTokenAccount
} from '@solana/spl-token';

const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed',
);

const mintAuthority = Keypair.generate();

const decimals = 6;

const mintAddress = await createMint(
    connection,
    mintAuthoruty,
    mintAuthority.publicKey,
    decimals
)