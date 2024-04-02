import { WETH as UWETH } from 'gamehubsdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId } from './chainId'
import { injected } from '../connectors'
import BnbChain from 'assets/svg/bnb.svg'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  HALF_YEAR: '6 months',
  ALL_TIME: 'All time'
}

export const DEFAULT_API_URL = process.env.REACT_APP_API_URL

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
    /*
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
  */
}
export interface BaseChain {
  id: number
  name: string
  tokenSymbol: string
  token: any
  wrappedTokenSymbol?: string
  wrappedToken?: any
  icon: string
  scanUrl: string
  scanName: string
  vmType: string
  rpcUrl: string
  blockDelta?: number // time for producing a new block
  blockDeltaU?: number // time for producing a new block average
}

const initialChains: BaseChain[] = [
  {
    id: ChainId.KLAY_TEST,
    name: 'Klaytn Testnet Baobab',
    tokenSymbol: 'KLAY',
    token: 'KLAY',
    wrappedTokenSymbol: 'WKLAY',
    wrappedToken: '',
    icon: BnbChain,
    scanUrl: 'https://baobab.klaytnscope.com/',
    scanName: 'Klaytnscope',
    vmType: 'EVM',
    rpcUrl: 'https://public-en-baobab.klaytn.net'
  }
]

export const getChain = (chainId: ChainId) => {
  return initialChains.find(chain => {
    return chain.id === chainId
  })
}

export const NetworkContextName = 'NETWORK'


export const Token_swap_contract_address: { [chainId in ChainId]?: string } = {
  [ChainId.KLAY_TEST]: '0xe36c51451Cc72De3Da6EB3B3b98DF461D018108D'
}

export const WETH = {
  ...UWETH,
}

export const APR_URL = process.env.REACT_APP_API_URL || 'https://swap.dev.fish/'
