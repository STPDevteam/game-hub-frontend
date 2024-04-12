import { useRequest } from 'ahooks'
import { useCallback, useState } from 'react'
// import { useQuery } from 'wagmi'

import { getAlchemy } from 'utils/alchemy'
// import { useQueryKeys } from 'utils/cacheKeyFactory'

// import { AWNSPartsType } from './useGetAccountOwnerAssets'


export enum AWNSPartsType {
  Background = 'Background',
  Expression = 'Expression',
  Cap = 'Cap',
  Clothing = 'Clothing',
}
// export type TChainId = 1 | 56 | 137 | 324

type TErcType = 'erc721' | 'erc1155' | ''
export const getNftSupportChainId = [1, 56, 137, 324]
interface Params {
  chainId?: number
  ercType?: TErcType
  account: string
  contractAddress?: string
  cursor?: number
  limit?: number
}

export interface NftProps {
  address: string
  chainId: number
  tokenType: string
  name?: string | undefined
  symbol?: string | undefined
  tokenId?: string | undefined
  tokenUri?: string | undefined
  uri?: string | undefined
  useType?: string | undefined
  amount?: string | number | undefined
  description?: string | undefined
}

export enum ERCTYPE {
  ERC6551 = 'ERC6551',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

type HookParams = Omit<Params, 'account'> & { name: string }
interface IResult {
  total: number
  content: any[]
  next: string
}
const BaseUrl = `${process.env.NEXT_PUBLIC_BASE_URL_V3}`

// const useGetUserNFT = ({
//   name,
//   chainId = 1,
//   ercType = 'erc721',
//   contractAddress,
//   cursor = 1,
//   limit = 10,
// }: HookParams) => {
//   const { accountAddress: account } = useGetNftAddress(name)
//   const [loading, setLoading] = useState<boolean>(false)
//   const params: Params = {
//     chainId,
//     ercType,
//     cursor,
//     limit,
//     account: account || '',
//   }
//   if (contractAddress) {
//     params.contractAddress = contractAddress
//   }
//   const queryKey = useQueryKeys().getUserNFTList
//   const { data } = useQuery(
//     queryKey(name),
//     async () => {
//       setLoading(true)
//       try {
//         const result = await fetchGetUserNFT(params)
//         setLoading(false)
//         return result.data
//       } catch {
//         setLoading(false)
//         return undefined
//       }
//     },
//     {
//       enabled: !!name && !!account,
//     },
//   )
//   return { data, loading }
// }

export function useGetUserAllNFT(account: string, chainId: number | undefined, refresh?: number) {
  const { data, loading } = useRequest(
    async () => {
      if (!chainId || !account) return
      try {
        const NftsForOwner = await getAlchemy(chainId).nft.getNftsForOwner(account)
        console.log('🚀 ~ ; ~ NftsForOwner:', NftsForOwner)

        const tokens: NftProps[] = NftsForOwner.ownedNfts.map((item) => ({
          tokenType: item.tokenType,
          chainId,
          address: item.contract.address,
          tokenId: item.tokenId,
          name: item?.name || item?.collection?.name || item?.contract?.name,
          symbol: item?.contract?.symbol ?? item?.collection?.slug,
          tokenUri: item?.tokenUri || item?.raw?.tokenUri,
          uri:
            item?.image?.originalUrl ||
            item?.contract?.openSeaMetadata?.imageUrl ||
            item?.raw?.metadata?.image,
          useType:
            item?.raw?.metadata?.attributes?.find(
              (v: any) =>
                v?.value === AWNSPartsType.Background ||
                v?.value === AWNSPartsType.Cap ||
                v?.value === AWNSPartsType.Clothing ||
                v?.value === AWNSPartsType.Expression,
            )?.value ?? undefined,
          amount: item?.balance || 0,
        }))

        return tokens
      } catch (error) {
        console.error(error)
        return
      }
    },
    {
      refreshDeps: [account, chainId, refresh],
    },
  )

  return { loading, data }
}

export interface IRefreshParams {
  contractAddress: string
  tokenId: string
}
// const refreshNFT = (params: IRefreshParams) => {
//   const url = `${BaseUrl}/user/nftscan/refresh`
//   return fetch(url, { method: 'POST', body: JSON.stringify(params) }).then((res) =>
//     res.json<{ code: number; data: { status: string }; msg: string }>(),
//   )
// }
// export const useRefreshNFTScan = () => {
//   const refresh = useCallback((params: IRefreshParams) => {
//     return refreshNFT(params)
//   }, [])
//   return refresh
// }
// export default useGetUserNFT
