export const defaultSEO = {
  title: 'OnePlay - GameFi on OneChain',
  description: 'Experience next-generation blockchain gaming with wallet-integrated gameplay, tokenized assets, and true ownership on OneChain.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oneplay.game',
    siteName: 'OnePlay',
    images: [
      {
        url: 'https://oneplay.game/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OnePlay - GameFi on OneChain',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@oneplaygame',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'keywords',
      content: 'gamefi, blockchain, gaming, nft, onechain, web3, crypto games',
    },
  ],
};
