import { WETH } from 'gamehubsdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId } from './chainId'
import { injected } from '../connectors'
import BaseChain from 'assets/svg/base.svg'
import MainnetChain from 'assets/svg/eth.png'
import LootChain from 'assets/svg/loot.svg'
import BSCChain from 'assets/svg/bsc.svg'
import SCROLLChain from 'assets/svg/Scroll.png'
import ZKSYNCChain from 'assets/svg/zkSync.jpg'
import POLYGONChain from 'assets/svg/polygon.svg'

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
    id: ChainId.MAINNET,
    name: 'Mainnet',
    tokenSymbol: 'ETH',
    token: WETH[ChainId.MAINNET],
    wrappedTokenSymbol: 'WETH',
    wrappedToken: WETH[ChainId.MAINNET],
    icon: MainnetChain,
    scanUrl: 'https://etherscan.io/',
    scanName: 'EtherScan',
    vmType: 'EVM',
    rpcUrl: 'https://mainnet.infura.io/v3/1d8efe3c81f6403fac6633ef69479a73',
  },
  {
    id: ChainId.BASE,
    name: 'Base',
    tokenSymbol: 'ETH',
    token: WETH[ChainId.BASE],
    wrappedTokenSymbol: 'WETH',
    wrappedToken: WETH[ChainId.BASE],
    icon: BaseChain,
    scanUrl: 'https://basescan.org/',
    scanName: 'base scan',
    vmType: 'EVM',
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  },
  {
    id: ChainId.LOOT,
    name: 'Loot Chain',
    tokenSymbol: 'AGLD',
    token: WETH[ChainId.LOOT],
    wrappedTokenSymbol: 'WAGLD',
    wrappedToken:  WETH[ChainId.LOOT],
    icon: LootChain,
    scanUrl: 'https://explorer.lootchain.com/',
    scanName: 'Lootscan',
    vmType: 'EVM',
    rpcUrl: 'https://rpc.lootchain.com/http',
  },{
    id: ChainId.BSC,
    icon: BSCChain,
    name: 'BSC',
    token: '',
    tokenSymbol: 'BSC',
    scanUrl: '',
    scanName:'',
    vmType: '',
    rpcUrl: ''
  },
  {
    id: ChainId.SCROLL,
    icon: SCROLLChain,
    name: 'Scroll',
    token: '',
    tokenSymbol: 'Scroll',
    scanUrl: '',
    scanName:'',
    vmType: '',
    rpcUrl: ''
  },
  {
    id: ChainId.ZKSYNC,
    icon: ZKSYNCChain,
    name: 'zkSync',
    token: '',
    tokenSymbol: 'zkSync',
    scanUrl: '',
    scanName:'',
    vmType: '',
    rpcUrl: ''
  },
  {
    id: ChainId.POLYGON,
    icon: POLYGONChain,
    name: 'Polygon',
    token: '',
    tokenSymbol: 'Matic',
    scanUrl: '',
    scanName:'',
    vmType: '',
    rpcUrl: ''
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

export const UniversalResolver_contract_address: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0xaAD4A484AA1E810ffebc5152CeB0B87c5dfA25F0',
  [ChainId.BASE]: '0xFd1Eb46EfEAf0134B4d21502930Fb330447f1d79'
}

