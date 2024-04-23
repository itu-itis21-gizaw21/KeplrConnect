import React, { useState } from 'react';
import type { NextPage } from 'next'
import { SimpleUI, SimpleUIProps } from '../components/SimpleUI'
import chains from '../chaininfo';

const Home: NextPage = () => {
  const [rpcUrl, setRpcUrl] = useState<string>("https://cosmos-rpc.publicnode.com:443");
  const [chainName, setChainName] = useState<string>("cosmoshub-4");

  const handleRpcUrlChange = (newRpcUrl: string) => {
    const chain = chains[chainName];
    console.log("index.ts chain",chain);
   /*  if (chain) {
      setRpcUrl(chain.rpc);
    }
    setChainName(newRpcUrl); */
  };

  return (
    <div>
      {/* Pass rpcUrl, chainName, and handleRpcUrlChange as props to SimpleUI */}
      <SimpleUI rpcUrl={rpcUrl} chainName={chainName} onRpcUrlChange={handleRpcUrlChange} />
    </div>
  );
};

export default Home;
