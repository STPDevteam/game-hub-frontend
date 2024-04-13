import React, { useCallback } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useGuideDetail } from './hooks'
import EternaLegacyAvatorImg from '../../assets/images/EternalLegacy/avatar.png'
import { ReactComponent as WebsiteIcon } from  'assets/images/website.svg'

import './GuideDetail.less'


export default function GameDetail(props: RouteComponentProps<{ name: string }>) {
  const {
    match: {
      params: { name }
    }
  } = props
  const data = useGuideDetail(name);
  const history = useHistory();
  return (
    <div className="container-guidedetail">
      <div className='section1'>
        <h1><span>Guide</span> / {data.name}</h1>
        <div className='intro'>
            <div>
              <img src={EternaLegacyAvatorImg} alt="EternaLegacy" />
              <h2>{data.name}</h2>
            </div>
            <div><a href={data.website}><WebsiteIcon/> Website</a></div>
        </div>
        <p>
            {data.description}
        </p>
      </div>
      <div className='section2'>
        <h2>Quick Start</h2>
        <div className='steps'>
           <div>
              <h3>Step 1. Connect Your Wallet</h3>
              <p>Start by logging into our platform using your digital wallet. Our site supports major wallets, ensuring a secure and seamless connection. Once logged in, your NFT collection will be displayed in your personal dashboard.</p>
           </div>
           <div>
              <h3>Step 2. Select Your NFT</h3>
              <p>Browse through your NFTs and choose the one you'd like to see transformed into a unique game element. Click on the NFT to select it and proceed to the next step.</p>
           </div>
           <div>
              <h3>Step 3. Auth Grant</h3>
              <p>After selecting your NFT, you‘ll have the option to grant auth, e.g., copyright, for its use in the game. This process is secure and respects your ownership rights.</p>
           </div>
           <div>
              <h3>Step 4. AI-Generated Customization</h3>
              <p>Our advanced AI will then generate various styles and appearances for your NFT, ensuring it fits perfectly within the game's aesthetic. You can review and choose the style that appeals to you the most.</p>
           </div>
           <div>
              <h3>Step 5. Integration into the Game</h3>
              <p>Your NFT is now ready to become a part of the gaming world! For the first phase, it will be transformed into a card or game element in our MTG-style game. You'll get to see how your NFT enhances the gameplay.</p>
           </div>
           <div>
              <h3>Step 6. Play and Earn</h3>
              <p>With everything set, jump into the game with your new, unique game card. Compete against other players, complete challenges, and earn tokens and rewards. Your journey in the NFT-integrated gaming universe begins!</p>
           </div>
        </div>
      </div>
    </div>
  )
}

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`
