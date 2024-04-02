import { useCallback, useEffect, useState } from 'react'
import { APR_URL } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { get } from '../../utils/request';
import { ChainId } from '../../constants/chainId'

export interface Record {
  Event: string;
  Txid: number;
  Network: string;
  ChainId: number;
  Amount: number;
  Time: number;
  Token: string;
  Status: string;
}


export function useHistoryRecords(): any {
    const [records, setRecords] = useState<any>([]);
    const { account } = useActiveWeb3React()
    let _records = new Array<Record>();
    const fetchHistoryRecords = useCallback(async () => {
      get(`${APR_URL}/records?userAddress=${account}`).then((response: any) => {
        if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
                _records.push({
                    Event: "Swap",
                    Txid: response.data[i].submitTxHash,
                    Network: response.data[i].submitChainType,
                    Amount: response.data[i].submitTokenAmount,
                    Token: response.data[i].submitTokenAddress,
                    Time: response.data[i].submitTimestamp,
                    Status: "success",
                    ChainId: ChainId.KLAY_TEST
                })
                _records.push({
                    Event: "Distribute",
                    Txid: response.data[i].distributeTxHash,
                    Network: response.data[i].distributeChainType,
                    Amount: response.data[i].distributeTokenAmount,
                    Time: response.data[i].distributeTimestamp,
                    Token: response.data[i].distributeTokenAddress,
                    Status: response.data[i].distributeStatus,
                    ChainId: ChainId.BNB_TEST
                })
            }
            setRecords(_records)
        }
      });
    }, [account])
  
    useEffect(() => {
        if(account){
            fetchHistoryRecords()
        }
    }, [account])
    return records
  }
