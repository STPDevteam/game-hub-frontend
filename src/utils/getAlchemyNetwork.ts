import { Alchemy, Network } from 'alchemy-sdk'

const getAlchemyNetwork = (chainId: number) => {
  if (chainId === 1) return Network.ETH_MAINNET
  if (chainId === 137) return Network.MATIC_MAINNET
  if (chainId === 10) return Network.OPT_MAINNET
  if (chainId === 420) return Network.OPT_GOERLI
  if (chainId === 5) return Network.ETH_GOERLI
  if (chainId === 80001) return Network.MATIC_MUMBAI
  if (chainId === 11155111) return Network.ETH_SEPOLIA
  if (chainId === 8453) return Network.BASE_MAINNET
  return Network.ETH_MAINNET
}

export const getAlchemy = (chainId: number) => {
  const network = getAlchemyNetwork(chainId)
  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network,
  }
  const alchemy = new Alchemy(config)
  return alchemy
}


export default getAlchemyNetwork
