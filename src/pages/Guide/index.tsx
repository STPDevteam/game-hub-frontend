import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Input } from 'antd';
import { useHistory } from 'react-router-dom'
import { useGames } from 'pages/Guide/hooks';
import { useActiveWeb3React } from '../../hooks'
import './index.less'

const { Search } = Input;

export default function Guide() {
  const { account, chainId, library } = useActiveWeb3React()
  const onSearch = (value: string) => console.log(value);
  const history = useHistory();
  const games = useGames()

  return (
    <div className="container-guide">
      <div className='section1'>
        <h1>Guide</h1>
        <p>All you need to know to start your gaming adventures!</p>
        {/* <Search placeholder="Enter the game name or question" onSearch={onSearch} style={{ width: 538 }} /> */}
      </div>
      <div className='section2'>
        <div className='games'>
          {games.map((game: any) => 
            <div className='card' key={game.id} onClick={() => {window.open(`${game.guide}`)}}>
              <img src={game.card} alt="" />
              <div className='name'>
                <h3>{game.name}</h3>
              </div>
            </div>
          )}
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
