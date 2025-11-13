// This file should only be imported on the server (API routes, Server Actions, etc.)

export const ONECHAIN_SERVER_CONFIG = {
  // OneChain RPC endpoint
  rpcUrl: process.env.ONECHAIN_RPC_URL || "https://rpc.onechain.network",

  // OneChain contract addresses - SENSITIVE, server-only
  gameContract: process.env.GAME_CONTRACT_ADDRESS || "",
  tokenContract: process.env.TOKEN_CONTRACT_ADDRESS || "",

  // Chain configuration
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
