import React from 'react';
import { Button } from 'antd';
import StartGroup from  'assets/images/star-group.png'
import './index.less'
export default function Footer() {
    return <div className='bottom'>
        <div>
            <div><img src={StartGroup}/></div>       
            <div>Eternal Legacy is Now in Beta with Bounty Rewards</div>
            <div>
            <Button onClick={window.open('https://eternallegacy.xyz/')}>Play Beta</Button>
            </div>
        </div>
    </div>
}