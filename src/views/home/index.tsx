// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
//import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';
import { CandyMint } from '../../components/CandyMint';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

//Logo
import imageToAdd from '../../collection.png'

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
        <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>v{pkg.version}</div>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          American NFT
        </h1>
        </div>
        <img src='../../collection.png' alt="Image" />
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
          <p>True face of a patroit holding $USA on Solana </p>
          <p>CA: 69kdRLyP5DTRkpHraaSZAQbWmAwzF9guKjZfzMXzc</p>
          <p className='text-slate-500 text-2x1 leading-relaxed'>Mint with 1.776M $USA tokens plus gas fees.</p>
        </h4>
        
        <div className="flex flex-col mt-2">
           <CandyMint />
          <h4 className="md:w-full text-2xl text-slate-300 my-2">
          {wallet &&
          <div className="flex flex-row justify-center">
            <div>
              {(balance || 0).toLocaleString()}
              </div>
              <div className='text-slate-600 ml-2'>
                SOL
              </div>
          </div>
          }
          </h4>
        </div>
      </div>
    </div>
  );
};
