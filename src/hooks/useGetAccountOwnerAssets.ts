import { useRequest } from 'ahooks'
import { useEffect, useMemo, useState } from 'react'
import { ChainId } from 'constants/chainId'
import { getAlchemy } from 'utils/alchemy'
import { useActiveWeb3React } from 'hooks'

export interface Token721 {
  address: string
  chainId: number
  decimals?: number | undefined
  name?: string | undefined
  symbol?: string | undefined
  tokenId?: string | undefined
  tokenUri?: string | undefined
  uri?: string | undefined
}
export interface Token1155 {
  address: string
  chainId: number
  tokenType: string
  decimals?: number | undefined
  name?: string | undefined
  symbol?: string | undefined
  tokenId?: string | undefined
  tokenUri?: string | undefined
  uri?: string | undefined
  useType?: string | undefined
  amount?: string | number | undefined
}

export enum AWNSPartsType {
  Background = 'Background',
  Expression = 'Expression',
  Cap = 'Cap',
  Clothing = 'Clothing',
}

export enum TokenTYPE {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}
export const avatarNFTAddress: { [x in number]: string } = {
  [ChainId.BASE]: process.env.NEXT_PUBLIC_BASE_PICTURE_TOKEN || '',
  [ChainId.GÖRLI]: '0xBbD3C2417EFd8666d30Eeb19c39259254B57d0e9',
  [ChainId.MAINNET]: '',
}

export function useToken721BalanceTokens(
  token0Address: string,
  chainId: ChainId,
): {
  loading: boolean
  availableTokens: undefined | Array<Token721> | undefined
} {
  const { account } = useActiveWeb3React()

  const { data, loading } = useRequest(
    async () => {
      if (!chainId || !account || !token0Address) return undefined
      const res = await getAlchemy(chainId).nft.getNftsForOwner(account, {
        contractAddresses: [token0Address],
      })

      const tokens: Token721[] = res.ownedNfts.map((item) => ({
        chainId,
        address: item.contract.address,
        tokenId: item.tokenId,
        name:
          item?.name ??
          item.collection?.name ??
          item.contract.openSeaMetadata.collectionName ??
          item.contract.name,
        symbol: item.contract?.symbol ?? item.collection?.slug,
        tokenUri: item.tokenUri,
        uri: item.contract.openSeaMetadata.imageUrl ?? undefined,
      }))

      return tokens
    },
    {
      refreshDeps: [chainId, account, token0Address],
    },
  )

  const res = useMemo(() => {
    return { loading, availableTokens: data }
  }, [loading, data])

  return res
}

export function useAccountToken721List(account: string, chainId: number) {
  const [loading, setLoading] = useState<boolean>(false)
  const [Nfts, setNfts] = useState<Token721[]>()

  useEffect(() => {
    if (!chainId || !account) {
      return
    }
    setLoading(true)
    ;(async () => {
      try {
        const res = await getAlchemy(chainId).nft.getNftsForOwner(account)
        const res1 = await getAlchemy(chainId).nft.getContractsForOwner(account)
        console.log('🚀 ~ ; ~ res1:', res1)

        const tokens: Token721[] = res1.contracts
          .filter((val) => val.tokenType === (TokenTYPE.ERC721 as any))
          .map((item) => ({
            chainId,
            address: item.address,
            tokenId: item.displayNft.tokenId,
            name: item.name ?? item.openSeaMetadata.collectionName,
            symbol: item.symbol ?? item.openSeaMetadata.collectionSlug,
            tokenUri: res.ownedNfts.find((v) => v.contract.address === item.address)?.tokenUri,
            uri: item.openSeaMetadata.imageUrl ?? undefined,
          }))

        setNfts(tokens)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])

  return { loading, data: Nfts }
}

export function useAccountToken1155List(account: string, chainId: number) {
  const [loading, setLoading] = useState<boolean>(false)
  const [Nfts, setNfts] = useState<Token1155[]>()

  useEffect(() => {
    if (!chainId || !account) {
      return
    }
    setLoading(true)
    ;(async () => {
      try {
        const res = await getAlchemy(chainId).nft.getNftsForOwner(account)
        const res1 = await getAlchemy(chainId).nft.getContractsForOwner(account)
        console.log('🚀 ~ ; ~ res1:', res1)

        const tokens: Token1155[] = res1.contracts
          .filter((val) => val.tokenType === (TokenTYPE.ERC1155 as any))
          .map((item) => ({
            chainId,
            tokenType: item.tokenType,
            address: item.address,
            tokenId: item.displayNft.tokenId,
            name: item.name ?? item.openSeaMetadata.collectionName,
            symbol: item.symbol ?? item.openSeaMetadata.collectionSlug,
            tokenUri: res.ownedNfts.find((v) => v.contract.address === item.address)?.tokenUri,
            uri: item.openSeaMetadata.imageUrl ?? undefined,
          }))

        setNfts(tokens)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId])

  return { loading, data: Nfts }
}

export function useToken1155BalanceTokens(
  account: string | `0x${string}` | undefined,
  token0Address: string,
  chainId: ChainId,
  refresh?: number,
): {
  loading: boolean
  availableTokens: undefined | Token1155[]
} {
  const { data, loading } = useRequest(
    async () => {
      if (!chainId || !account || !token0Address) return undefined
      const res = await getAlchemy(chainId).nft.getNftsForOwner(account, {
        contractAddresses: [token0Address],
      })
      console.log('🚀 ~ res ~ res:', res)

      const tokens: Token1155[] = res.ownedNfts.map((item) => ({
        chainId,
        tokenType: item.tokenType,
        address: item.contract.address,
        tokenId: item.tokenId,
        name:
          item?.name ??
          item.collection?.name ??
          item.contract.openSeaMetadata.collectionName ??
          item.contract.name,
        symbol: item.contract?.symbol ?? item.collection?.slug,
        tokenUri: item.tokenUri,
        uri:
          item.contract.openSeaMetadata.imageUrl ??
          item.raw.metadata?.image ??
          item.image.originalUrl ??
          undefined,
        useType:
          item.raw.metadata?.attributes.find(
            (v: any) =>
              v?.value === AWNSPartsType.Background ||
              v?.value === AWNSPartsType.Cap ||
              v?.value === AWNSPartsType.Clothing ||
              v?.value === AWNSPartsType.Expression,
          )?.value ??
          item.raw.metadata?.name ??
          undefined,
        amount: item?.balance || 0,
      }))

      return tokens
    },
    {
      pollingInterval: 60_000,
      refreshDeps: [chainId, account, token0Address, refresh],
    },
  )

  const res = useMemo(() => {
    return { loading, availableTokens: data }
  }, [loading, data])

  return res
}
