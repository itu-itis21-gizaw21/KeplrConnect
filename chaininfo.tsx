interface ChainInfo {
    chainId: string;
    chainName: string;
    rpc: string;
    rest: string;
    bip44: {
      coinType: number;
    };
    bech32Config: {
      bech32PrefixAccAddr: string;
      bech32PrefixAccPub: string;
      bech32PrefixValAddr: string;
      bech32PrefixValPub: string;
      bech32PrefixConsAddr: string;
      bech32PrefixConsPub: string;
    };
    currencies: {
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
      coinGeckoId: string;
    }[];
    feeCurrencies: {
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
      coinGeckoId: string;
      gasPriceStep: {
        low: number;
        average: number;
        high: number;
      };
    }[];
    stakeCurrency: {
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
      coinGeckoId: string;
    };
    coinType: number;
   
  }
  
  type Chains = {
    [key: string]: ChainInfo;
  };
  
  const chains: Chains = {
    "theta-testnet-001": {
      chainId: "cosmos-testnet",
      chainName: "Cosmos",
      rpc: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
      rest: "https://rest.sentry-01.theta-testnet.polypore.xyz",
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "cosmosvalconspub",
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
          gasPriceStep: {
            low: 0.01,
            average: 0.02,
            high: 0.1,
          },
        }
      ],
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
      },
      coinType: 118,
     
    },
    "cosmoshub-4": {
      chainId: "cosmoshub-4",
      chainName: "Cosmos",
      rpc: "https://cosmos-rpc.publicnode.com:443",
      rest: "https://cosmos-rest.publicnode.com",
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "cosmosvalconspub",
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
          gasPriceStep: {
            low: 0.01,
            average: 0.02,
            high: 0.1,
          },
          
        }
      ],
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
      },
      coinType: 118,
    },
    
    "celestia" :  {
      chainId: "celestia",
      chainName: "Celestia",
      rpc: "https://celestia-rpc.publicnode.com:443",
      rest: "https://celestia-rest.publicnode.com",
      bip44: {
          coinType: 118,
      },
      bech32Config: {
          bech32PrefixAccAddr: "celestia",
          bech32PrefixAccPub: "celestia" + "pub",
          bech32PrefixValAddr: "celestia" + "valoper",
          bech32PrefixValPub: "celestia" + "valoperpub",
          bech32PrefixConsAddr: "celestia" + "valcons",
          bech32PrefixConsPub: "celestia" + "valconspub",
        },
      currencies: [
          {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia"
          },
      ],
      feeCurrencies: [
          {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
              gasPriceStep: {
                low: 0.01,
                average: 0.02,
                high: 0.1,
            },
            },
      ],
      stakeCurrency: {
          
          coinDenom: "TIA",
          coinMinimalDenom: "utia",
          coinDecimals: 6,
          coinGeckoId: "celestia",

      },
      coinType: 118,
     
  },
  "osmosis" : {
      chainId: "osmosis-1",
      chainName: "Osmosis",
      rpc: "https://osmosis-rpc.publicnode.com:443",
      rest: "https://osmosis-rest.publicnode.com",
      bip44: {
        coinType: 118
      },
      bech32Config: {
        bech32PrefixAccAddr: "osmosis",
        bech32PrefixAccPub: "osmosispub",
        bech32PrefixValAddr: "osmosisvaloper",
        bech32PrefixValPub: "osmosisvaloperpub",
        bech32PrefixConsAddr: "osmosisvalcons",
        bech32PrefixConsPub: "osmosisvalconspub"
      },
      currencies: [
        {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          coinGeckoId: "osmosis"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "OSMO",
          coinMinimalDenom: "uosmo",
          coinDecimals: 6,
          coinGeckoId: "osmosis",
          gasPriceStep: {
            "low": 0.01,
            "average": 0.025,
            "high": 0.03
          }
        }
      ],
      stakeCurrency: {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinGeckoId: "osmosis"
      },
      coinType: 118,
    }
  };
  
  export default chains;
  
