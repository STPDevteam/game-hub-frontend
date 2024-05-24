import React, { useState } from 'react';
import { Button } from 'antd';
import StartGroup from  'assets/images/star-group.png'
import './index.less'
export default function Footer() {
    const [close, setClose] = useState(false)
    return <>
    {!close && <div className='bottom'>
        <div>
            <div><img src={StartGroup}/></div>       
            <div>Clique’s Flagship Game: Eternal Legacy is Now in Beta with Bounty Rewards</div>
            <div>
            <Button onClick={() => {window.open('https://eternallegacy.xyz/')}}>Play Beta</Button>
            <Button onClick={() => {setClose(true)}}>close</Button>
            </div>
        </div>
    </div>}
    </>
}