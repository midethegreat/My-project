# OnePlay - GameFi on OneChain

A next-generation blockchain gaming platform built with Next.js, featuring wallet integration, tokenized assets, and true ownership on OneChain.

## Features

- 🎮 **Immersive Gameplay** - Play engaging games with real rewards
- 💰 **Earn Rewards** - Accumulate tokens and NFTs through gameplay
- 🔗 **Wallet Integration** - Connect your crypto wallet for seamless transactions
- 🎨 **NFT Gallery** - Collect and showcase your digital assets
- 📊 **Analytics** - Track your stats and progress in real-time
- 🌍 **OneChain Optimized** - Lightning-fast transactions on the OneChain blockchain

## Getting Started

### Prerequisites

- Node.js 16+ or pnpm
- A Web3 wallet (MetaMask, WalletConnect, etc.)
- OneChain testnet/mainnet setup

### Installation

1. Clone the repository:

\`\`\`bash
git clone <repository-url>
cd oneplay
\`\`\`

2. Install dependencies:

\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in the required environment variables:
- `NEXT_PUBLIC_ONECHAIN_RPC_URL` - Your OneChain RPC endpoint
- `NEXT_PUBLIC_ONECHAIN_CHAIN_ID` - OneChain chain ID
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID

4. Run the development server:

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Building for Production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## Deployment

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with one click

Or use the Vercel CLI:

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Docker Deployment

Build the Docker image:

\`\`\`bash
docker build -t oneplay .
docker run -p 3000:3000 oneplay
\`\`\`

### Self-Hosted Deployment

Ensure Node.js 16+ is installed on your server:

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## Project Structure

\`\`\`
oneplay/
├── app/
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/
│   ├── ui/              # UI components
│   ├── game-dashboard.tsx
│   ├── wallet-connect.tsx
│   └── ...
├── lib/
│   ├── onechain-config.ts
│   └── utils.ts
├── public/              # Static assets
└── styles/              # Additional styles
\`\`\`

## Technology Stack

- **Framework**: Next.js 16
- **Blockchain**: OneChain
- **UI**: shadcn/ui with Tailwind CSS
- **Wallet**: WalletConnect
- **State Management**: React Hooks
- **Forms**: React Hook Form with Zod validation

## API Endpoints

- `POST /api/wallet/connect` - Connect wallet
- `POST /api/game/place-bet` - Place a game bet

## Security

- Environment variables are never exposed to the client (except `NEXT_PUBLIC_*`)
- All sensitive operations require wallet signature verification
- Smart contract interactions are validated server-side

## Environment Variables

See `.env.example` for all available configuration options.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
