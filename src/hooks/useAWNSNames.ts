import { ENS, graphURIEndpoints } from '@myclique/awnsjs'
import type { Name } from '@myclique/awnsjs/functions/getNames'
import { useEffect, useMemo, useState } from 'react'
import { isValidName, mergeNames } from '../utils/utils'
import { useBlockNumber } from 'state/application/hooks'
import { useActiveWeb3React } from 'hooks'

export function useAWNSNames(account: string | undefined) {
  const [rawNames, setRawNames] = useState<Name[]>()
  const { chainId }  = useActiveWeb3React();
  const blockTimestamp = useBlockNumber()

  const awns = useMemo(() => {
    if (!chainId || !graphURIEndpoints[chainId]) return undefined
    const _awns = new ENS()
    _awns.gqlInstance.setUrl(graphURIEndpoints[chainId])
    return _awns
  }, [chainId])

  useEffect(() => {
    if (!awns?.getNames || !account) return
    awns
      .getNames({
        address: account,
        type: 'all',
        orderBy: 'labelName',
        orderDirection: 'desc'
      })
      .then((res: Name[]) => {
        setRawNames(res)
      })
      .catch((err: any) => {
        console.error('🚀 ~ useEffect ~ err:', err)
      })
  }, [account, awns])

  const searchNames = useMemo(() => {
    if (!rawNames || !blockTimestamp) return undefined
    return mergeNames(rawNames).filter(name => isValidName(Number(blockTimestamp))(name))
  }, [blockTimestamp, rawNames])

  return searchNames
}
