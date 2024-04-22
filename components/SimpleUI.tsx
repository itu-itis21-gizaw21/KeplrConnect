// Import React
import React, { ChangeEvent, Component, MouseEvent } from "react";

// Import required types
import { coin, coins, AccountData, OfflineSigner } from "@cosmjs/proto-signing";
import { ChainInfo, Window as KeplrWindow } from "@keplr-wallet/types";
import { Coin, StargateClient, SigningStargateClient } from "@cosmjs/stargate";
import { MsgDelegate} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { MsgDelegateEncodeObject } from "@cosmjs/stargate";
// Import chain information
import chains from "../chaininfo";

// Define global interface
declare global {
  interface Window extends KeplrWindow {}
}

// Define interface for component state
interface SimpleUIState {
  chainID: string;
  denom: string;
  myAddress: string;
  myBalance: string;
  toAmount: string;
  toAddress: string;
}

// Define interface for component props
export interface SimpleUIProps {
  rpcUrl: string;
  chainName: string;
  onRpcUrlChange: (newRpcUrl: string) => void;
}

// Define SimpleUI component
export class SimpleUI extends Component<SimpleUIProps, SimpleUIState> {
  // Set the initial state
  constructor(props: SimpleUIProps) {
    super(props);
    this.state = {
      chainID: "",
      denom: "",
      myAddress: "",
      myBalance: "...",
      toAmount: "",
      toAddress: "",
    };
    setTimeout(this.init, 500);
  }

  // Initialize the component
  init = async () => {
    await this.getChainID(await StargateClient.connect(this.props.rpcUrl));
    this.printStuff();
  };

  // Get the ChainID
  getChainID = async (client: StargateClient) => {
    const c = await client.getChainId();
    this.setState({
      chainID: c,
    });
  };

  // Store changed token amount to state
  onToSendChanged = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      toAmount: e.currentTarget.value,
    });

  // Store changed toAddress amount to state
  onToAddressChanged = (e: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      toAddress: e.currentTarget.value,
    });

  // When the user clicks the "Send" button
  onSendClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    // Get the current state and amount of tokens that we want to transfer
    const { denom, toAmount, toAddress } = this.state;

    // Create the signing client
    const offlineSigner: OfflineSigner =
      window.getOfflineSigner!("theta-testnet-001");
    const signingClient = await SigningStargateClient.connectWithSigner(
      this.props.rpcUrl,
      offlineSigner
    );

    // Get the accountdata
    const account: AccountData = (await offlineSigner.getAccounts())[0];

    // Submit the transaction to send tokens to the faucet
/*     const sendResult = await signingClient.sendTokens(account.address, toAddress, [
      {
        denom: denom,
        amount: toAmount,
      },
    ]);

    // Print the result to the console
    console.log(sendResult); */
    // Update the balance in the user interface
    this.setState({
      myBalance: (
        await signingClient.getBalance(account.address, denom)
      ).amount,
    });
  };

  // Print rpcUrl and chainName
  printStuff = () => {
    console.log(this.props.rpcUrl);
    console.log(this.props.chainName);
  };

  // When the user clicks the "Connect Wallet" button
  onKeplrClicked = async (e: MouseEvent<HTMLButtonElement>) => {
    const { keplr } = window;
    if (!keplr) {
      alert("You need to install Keplr");
      return;
    }
    // Add the chain to Keplr in case it's not already added
    try {
      await keplr.experimentalSuggestChain(this.getTestnetChainInfo());
      console.log("Wallet connected!");
      console.log(this.props.chainName);
      await keplr.enable(this.props.chainName);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }

    // Create the signing client
    const offlineSigner: OfflineSigner =
      window.getOfflineSigner!(this.props.chainName);
    const signingClient = await SigningStargateClient.connectWithSigner(
      this.props.rpcUrl,
      offlineSigner
    );

    // Get the address and balance of your user
    const account: AccountData = (await offlineSigner.getAccounts())[0];
    this.setState({
      myAddress: account.address,
      myBalance: (
        await signingClient.getBalance(account.address, "uatom")
      ).amount,
    });
  };

  onDelegate = async (e:MouseEvent<HTMLButtonElement>) => {
    console.log("Haleeeeeeeee")
    const msg = MsgDelegate.fromPartial({
      delegatorAddress: "cosmos1nhzfugalfm29htfep7tx3y5fhm8jhks5cy48sl",
      validatorAddress: "cosmos1ytxzuwahjhssekxkk9sarlz05utvfev85j6n3z",
      amount: coin(100, "ustake"),
    });
    console.log(msg)
    const offlineSigner: OfflineSigner =
    window.getOfflineSigner!("cosmos");
    console.log("offline signer",offlineSigner)
    const signingClient = await SigningStargateClient.connectWithSigner(
    this.props.rpcUrl,
    offlineSigner
  );
    const msgAny: MsgDelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: msg,
    };
    const memo = "Use your power wisely";
    const fee = {
      amount: [
        {
          denom: "uatom",
          amount: "2000",
        },
      ],
      gas: "180000", // 180k
    };
/*     console.log(msgAny)
    const gasUsed = await signingClient.signAndBroadcast(
      "cosmos1nhzfugalfm29htfep7tx3y5fhm8jhks5cy48sl",+
      
      [msgAny],
      fee,
      memo
    );
    console.log("Gas used: ", gasUsed); */
  }

  // Get chain information for testnet
  getTestnetChainInfo = (): ChainInfo => ({
    chainId: "cosmos-hub",
    chainName: "Cosmos",
    rpc: "https://cosmos-rpc.publicnode.com:443",
    rest: "https://cosmos-rest.publicnode.com",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "cosmos",
      bech32PrefixAccPub: "cosmos" + "pub",
      bech32PrefixValAddr: "cosmos" + "valoper",
      bech32PrefixValPub: "cosmos" + "valoperpub",
      bech32PrefixConsAddr: "cosmos" + "valcons",
      bech32PrefixConsPub: "cosmos" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "ATOM",
        coinMinimalDenom: "cosmos",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
      },
    ],
    stakeCurrency: {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.02,
      high: 0.1,
    },
  });

  // The render function that draws the component at init and at state change
  render() {
    const { myAddress, myBalance, toAmount, toAddress } = this.state;
    const { chainName } = this.props;

    // The web page structure itself
    return (
      <div>
        <fieldset>
          <legend>Your Wallet</legend>
          <p>Address: {myAddress}</p>
          <p>Balance: {myBalance} {this.state.denom}</p>
        </fieldset>
        <fieldset>
          <legend>Send Tokens</legend>
          <input value={toAddress} type="text" onChange={this.onToAddressChanged} /> address
          <input value={toAmount} type="number" onChange={this.onToSendChanged}/> {this.state.denom}
          <button onClick={this.onSendClicked}>Send</button>
        </fieldset>
        <fieldset>
          <button onClick={this.onKeplrClicked}>Connect Wallet</button>
          {/* Buttons to change rpcUrl */}
          <button onClick={() => {this.props.onRpcUrlChange("cosmos");}}>Cosmos Hub</button>
          <button onClick={() => {this.props.onRpcUrlChange("celestia")}}>Celestia</button>
          <button onClick={() => {this.props.onRpcUrlChange("osmosis")}}>Osmosis</button>
          <button onClick={this.onDelegate}>Delegate</button>       
        </fieldset>
      </div>
    );
  }
}
