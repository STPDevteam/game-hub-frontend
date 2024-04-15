
import { useMemo } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { TokenboundClient } from '@tokenbound/sdk'
//@ts-ignore
import { getContractAddress } from '@myclique/awnsjs/dist/cjs/contracts/getContractAddress.js'
//@ts-ignore
import { labelhash } from '@myclique/awnsjs/dist/cjs/utils/labels'
import { useActiveWeb3React } from 'hooks'

/**
 * @param name awns name
 * @returns {
 *  tokenBoundAccount: tokenBoundAccount is 6551 account
 *  nftAddress: nft contract nftAddress
 *  tokenId: nft tokenId
 * }
 */
export function useAccountByName(name: string | undefined) {
  const { chainId }= useActiveWeb3React()

  const { nftAddress, tokenId } = useMemo(() => {
    const _contractAddress = chainId
      ? getContractAddress(chainId as any)?.('BaseRegistrarImplementation') || undefined
      : undefined
    if (!_contractAddress || !name) return { nftAddress: undefined, tokenId: undefined }
    const _hex = labelhash(name.split('.')[0])
    const _tokenId = BigNumber.from(_hex).toString()
    return { nftAddress: _contractAddress, tokenId: _tokenId }
  }, [chainId, name])

  const tokenboundClient = useMemo(() => new TokenboundClient({ chainId }), [])
  return useMemo(() => {
    if (!tokenId || !nftAddress) return { tokenBoundAccount: undefined, nftAddress, tokenId }
    const tokenBoundAccount = tokenboundClient.getAccount({
      tokenContract: nftAddress as `0x${string}`,
      tokenId
    })
    return { tokenBoundAccount, nftAddress, tokenId }
  }, [nftAddress, tokenId, tokenboundClient])
}
