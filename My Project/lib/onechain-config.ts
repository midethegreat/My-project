export const ONECHAIN_CONFIG = {
  // Chain configuration only - truly public, non-sensitive values
  chainId: 1,
  chainName: "OneChain",
  nativeCurrency: {
    name: "ONE",
    symbol: "ONE",
    decimals: 18,
  },

  // Gas settings
  gasLimit: "300000",
  gasPrice: "20000000000", // 20 Gwei
}

export const ONECHAIN_CLIENT_CONFIG = {
  chainId: 1,
  chainName: "OneChain",
  nativeCurrency: {
    name: "ONE",
    symbol: "ONE",
    decimals: 18,
  },
  rpcUrl: "https://rpc.onechain.network",
}

// OneChain SDK imports (to be added)
// import { ethers } from "ethers"
// For wallet connection: import Web3Modal from "@web3modal/ethers"
// For contract interaction: import { Contract } from "ethers"
