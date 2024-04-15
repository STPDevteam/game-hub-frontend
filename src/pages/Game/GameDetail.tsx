import React, { useCallback } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { getChain } from 'constants/index'
import { useGameDetail } from './hooks'
import Game1 from 'assets/images/game_1.png'
import Game2 from 'assets/images/game_2.png'
import Game3 from 'assets/images/game_3.png'
import Game4 from 'assets/images/game_4.png'
import BaseChain from 'assets/svg/base.svg'
import MainnetChain from 'assets/svg/eth.png'
import { ReactComponent as WebsiteIcon } from  'assets/images/website.svg'

import './GameDetail.less'


export default function GameDetail(props: RouteComponentProps<{ name: string }>) {
  const {
    match: {
      params: { name }
    }
  } = props
  const data = useGameDetail(name);
  const history = useHistory();

  return (
    <div className="container-gamedetail" style={{background: `linear-gradient(180deg, rgba(0, 2, 40, 0) 0%, #000228 100%), top / contain url(${data?.bg}) no-repeat`}}>
      <div className='section1'>
        <h1><span>Games</span> / {data.name}</h1>
        <div className='intro'>
          <div>
            <img src={data?.images && data?.images[0]} alt="" />
          </div>
          <div>
            <div className='head'>
              <h2>{data.name}</h2>
              <a href={data.website} target='_blank'><WebsiteIcon/> Website</a>
            </div>
            <p>
            {data.description}
            </p>
            <div className='info'>
                <div>
                    Support Chains: 
                    {data?.supportedChain && data?.supportedChain.length > 0 ? data?.supportedChain.map((chain: number) => 
                      <img src={getChain(chain)?.icon} alt="Base"/>
                    ): '--'}
                </div>
                <div>
                    {/* Players: <span>2,300</span> */}
                </div>     
            </div>
            <button onClick={() => {window.open(data.website)}}>Play Now</button>
          </div>
        </div>
      </div>
      {/* <div className='section2'>
        <div>
            <h2>Points rule</h2>
            <ol>
                <li>Ancient Forest Points Redeemed for XCOIN</li>
                <li>1 XCOIN = 100 Points</li>
            </ol>
        </div>
      </div> */}
      <div className='section3'>
        <div>
          {data?.images && data.images.map((img: string) => <div className='more-img'>
            <img src={img} alt="" />
          </div>)}
        </div>
      </div>
      <div className='section4'>
        <h2>Featured Games</h2>
        <div>
          {data.name !== 'Eternal Legacy' && <div className='card' onClick={() => {history.push('/game/eternallegacy')}}>
            <img src={Game1} alt="" />
            <div className='name'>
              <h3>Eternal Legacy</h3>
            </div>
          </div>}
          {data.name !== 'Dynamic avatar(Beta)' && <div className='card' onClick={() => {history.push('/game/dynamicavatar')}}>
            <img src={Game2} alt="" />
            <div className='name'>
              <h3>Dynamic avatar(Beta)</h3>
            </div>
          </div>}
          {data.name !== 'Dice' && <div className='card' onClick={() => {history.push('/game/dice')}}>
            <img src={Game3} alt="" />
            <div className='name'>
              <h3>DICE</h3>
            </div>
          </div>}
          {data.name !== 'Ancient Forest' && <div className='card' onClick={() => {history.push('/game/ancientforest')}}>
            <img src={Game4} alt="" />
            <div className='name'>
              <h3>Ancient Forest</h3>
            </div>
          </div>}
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
