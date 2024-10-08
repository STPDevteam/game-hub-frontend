import { ChainId } from '../chainId'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  [ChainId.POLYGON]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [ChainId.BASE]: '0xaB049175cBA373Cdf038e5bef7746B4403717220',
  [ChainId.BASE_GOERLI]: '0x8e7DB24eB395BD2965E0701b364ACdB67b9Dea8f',
  [ChainId.PZT]: '0x1bfE161a20DF40dA5d7f5806C1586C066e4cdC20',
  [ChainId.PZ]: '0x67Cb3599580d03544bbC04c497c636e668aeabad',
  [ChainId.ZKSYNCTEST]: '0x4801E3B33B55b5a5d2614c17855C2Ed337162809',
  [ChainId.ZKSYNC]: '0xf0c1B3733e843EAaC66b7373aAb029980877cC98',
  [ChainId.LOOT]: '0x7D40C46CaD2C6Ade6440008f74dFb66b3FC947E4',
  [ChainId.TAIKO]: '0xcdCe9e57CB1cA1e7EA129bC211e8F3741C4dC898',
  [ChainId.BNB_TEST]: '0x6e5bb1a5ad6f68a8d7d6a5e47750ec15773d6042',
  [ChainId.KLAY_TEST]: '0xca11bde05977b3631167028862be2a173976ca11'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
