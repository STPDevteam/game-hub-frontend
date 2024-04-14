import { useCallback, useEffect, useState } from 'react'
import { ChainId } from 'constants/chainId'
import { useActiveWeb3React } from '../../hooks'
import { get } from '../../utils/request';

export function useImgData(name:string): any {
    const [data, setData] = useState<any>([]);
    const { chainId } = useActiveWeb3React()
    let baseUrl = `${process.env.REACT_APP_BASE_AWNS_URL}/${name}`
    if (chainId === ChainId.MAINNET) {
      baseUrl = `${process.env.REACT_APP_MAINNET_AWNS_URL}/${name}`
    }
    const fetchData = useCallback(async () => {
      get(`${baseUrl}`).then((res: any) => {
        if (res) {
          setData(res)
        }
      });
    }, [name])
  
    useEffect(() => {
      if (name) {
        fetchData();
      }
    }, [name])
    return data
  }