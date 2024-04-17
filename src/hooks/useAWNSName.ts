import packet from 'dns-packet'
import { useEffect, useState } from 'react'
import { useUniversalResolverContract } from './useContract'
import { UniversalResolver_contract_address } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
//@ts-ignore
const hexEncodeName = (name: string) => `0x${packet.name.encode(name).toString('hex')}`

export const useAWNSName = (addr: string | undefined) => {
    const { chainId } = useActiveWeb3React()
  const contract = useUniversalResolverContract(UniversalResolver_contract_address[chainId || '1'])
  const [name, setName] = useState<string>()

  useEffect(() => {
    if (contract && addr){
    const args = `${addr.toLowerCase().substring(2)}.addr.reverse`
    contract
      .reverse(hexEncodeName(args))
      .then((res: any) => {
        setName(res?.[0])
      })
      .catch((err: any) => {
        console.error('🚀 ~ useEffect ~ err:', err)
        setName(undefined)
      })
    }
  }, [addr, contract])

  return name
}