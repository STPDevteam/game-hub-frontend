import { useCallback, useEffect, useState } from "react"
import gameData from '../GameList.json';

export function useGameDetail(id: string): any{
  const [data, setData] = useState<any>({});
  const fetchData = useCallback(async () => {
    const loadData: any = JSON.parse(JSON.stringify(gameData));
    for(let i =0; i < loadData.length; i++){
      if(loadData[i].id === id){
        setData(loadData[i])
        return
      }
    }
  }, [id])

  useEffect(() => {
    if(id){
      fetchData()
    }
  }, [id])
  return data
}