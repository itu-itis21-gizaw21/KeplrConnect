import React, { useState } from 'react';
import type { NextPage } from 'next'
import { SimpleUI, SimpleUIProps } from '../components/SimpleUI'
import chains from '../chaininfo';

const Home: NextPage = () => {
  const [rpcUrl, setRpcUrl] = useState<string>("https://rpc.sentry-01.theta-testnet.polypore.xyz");
  const [chainName, setChainName] = useState<string>("theta-testnet-001");

  const handleRpcUrlChange = (newRpcUrl: string) => {
    const chain = chains[newRpcUrl];
    if (chain) {
      setRpcUrl(chain.rpc);
    }
    setChainName(newRpcUrl);
  };

  return (
    <div>
      {/* Pass rpcUrl, chainName, and handleRpcUrlChange as props to SimpleUI */}
      <SimpleUI rpcUrl={rpcUrl} chainName={chainName} onRpcUrlChange={handleRpcUrlChange} />
    </div>
  );
};

export default Home;
