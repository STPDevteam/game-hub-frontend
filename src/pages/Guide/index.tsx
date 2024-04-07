import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Input } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useActiveWeb3React } from '../../hooks'
import Game1 from 'assets/images/game_1.png'
import Game2 from 'assets/images/game_2.png'
import Game3 from 'assets/images/game_3.png'
import Game4 from 'assets/images/game_4.png'
import Game5 from 'assets/images/game_5.png'
import Game6 from 'assets/images/game_6.png'
import Game7 from 'assets/images/game_7.png'
import Game8 from 'assets/images/game_8.png'
import { ReactComponent as NextIcon } from  'assets/images/next.svg'
import './index.less'

const { Search } = Input;

export default function Guide() {
  const { account, chainId, library } = useActiveWeb3React()
  const onSearch = (value: string) => console.log(value);

  return (
    <div className="container-guide">
      <div className='section1'>
        <h1>Guide</h1>
        <p>All you need to know to start your gaming adventures!</p>
        <Search placeholder="Enter the game name or question" onSearch={onSearch} style={{ width: 538 }} />
      </div>
      <div className='section2'>
        <div className='games'>
          <div className='card'>
            <img src={Game1} alt="" />
            <div className='name'>
              <h3>Eternal Legacy</h3>
            </div>
          </div>
          <div className='card'>
            <img src={Game2} alt="" />
            <div className='name'>
              <h3>NFT Name#2</h3>
            </div>
          </div>
          <div className='card'>
            <img src={Game3} alt="" />
            <div className='name'>
              <h3>NFT Name#3</h3>
            </div>
          </div>
          <div className='card'>
            <img src={Game4} alt="" />
            <div className='name'>
              <h3>NFT Name#4</h3>
            </div>
          </div>
          <div className='card'>
            <img src={Game5} alt="" />
            <div className='name'>
              <h3>NFT Name#5</h3>
            </div>
          </div>
          <div className='card'>
            <img src={Game6} alt="" />
            <div className='name'>
              <h3>NFT Name#6</h3>
            </div>
          </div>
          <div className='card'>
            <img src={Game7} alt="" />
            <div className='name'>
              <h3>NFT Name#7</h3>
            </div>
          </div>
          <div className='card'>
            <img src={Game8} alt="" />
            <div className='name'>
              <h3>NFT Name#8</h3>
            </div>
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
