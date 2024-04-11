import { useCallback, useEffect, useState } from "react"
import guideData from './GuideList.json';

export function useGuideDetail(id: string): any{
  const [data, setData] = useState<any>({});
  const fetchData = useCallback(async () => {
    const loadData: any = JSON.parse(JSON.stringify(guideData));
    console.log('loadData', loadData)
    for(let i =0; i < loadData.length; i++){
      if(loadData[i].id = id){
        setData(loadData[i])
      }
    }
  }, [])

  useEffect(() => {
      fetchData()
  }, [])
  return data
}