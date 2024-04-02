import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA?.symbol === 'ETH' && currencyB?.symbol === 'AGLD') {
    return true
  }
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.POLYGON]: new Token(
    ChainId.POLYGON,
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.BASE]: new Token(ChainId.BASE, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped ETH'),
  [ChainId.BASE_GOERLI]: new Token(
    ChainId.BASE_GOERLI,
    '0x4FA214C9e33D481996bEc77C443245fBAeE85670',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.PZT]: new Token(ChainId.PZT, '0x4FA214C9e33D481996bEc77C443245fBAeE85670', 18, 'WETH', 'Wrapped ETH'),
  [ChainId.PZ]: new Token(ChainId.PZ, '0x4FA214C9e33D481996bEc77C443245fBAeE85670', 18, 'WETH', 'Wrapped ETH'),
  [ChainId.ZKSYNC]: new Token(ChainId.ZKSYNC, '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91', 18, 'WETH', 'Wrapped ETH'),
  [ChainId.ZKSYNCTEST]: new Token(
    ChainId.ZKSYNCTEST,
    '0x8a144308792a23AadB118286aC0dec646f638908',
    18,
    'WETH',
    'Wrapped ETH'
  ),
  [ChainId.LOOT]: new Token(ChainId.LOOT, '0x19e9338be738c7e51b2126A5e7B6A4c1ecB03DC2', 18, 'WAGLD', 'Wrapped AGLD'),
  [ChainId.TAIKO]: new Token(ChainId.TAIKO, '0x0011E559da84dde3f841e22dc33F3adbF184D84A', 18, 'WETH', 'Wrapped ETH'),
  [ChainId.BNB_TEST]: new Token(
    ChainId.BNB_TEST,
    '0x0011E559da84dde3f841e22dc33F3adbF184D84A',
    18,
    'WETH',
    'Wrapped ETH'
  )
}
