import React, { useCallback } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import { useGames } from 'pages/Guide/hooks';
import EternaLegacyImg from 'assets/images/EternaLegacyImg.png'
import Forest1 from 'assets/images/forest1.png'
import UpcomingGame1 from 'assets/images/upcoming_game_1.jpg'
import UpcomingGame2 from 'assets/images/upcoming_game_2.png'
import UpcomingGame3 from 'assets/images/upcoming_game_3.png'
import { ReactComponent as NextIcon } from  'assets/images/next.svg'
import './index.less'


export default function Game() {
  const history = useHistory();
  const games = useGames()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container-game">
      <div className='section1'>
        <h1></h1>
        <Slider {...settings}>
          <div className='intro'>
            <div>
              <img src={EternaLegacyImg} alt="EternaLegacy" />
            </div>
            <div>
              <h2>Eternal Legacy</h2>
              <p>
              Riveting AI-powered card game where you uniquely build a deck generated by your own NFTs to battle friends and foes in the ultimate onchain strategy game.
              </p>
              <button onClick={() => {history.push('/game/eternallegacy')}}>View</button>
            </div>
          </div>
          <div className='intro'>
            <div>
              <img src={Forest1} alt="Forest" />
            </div>
            <div>
              <h2>ANCIENT FOREST</h2>
              <p>
              The forest is full of temptations and traps, use your wits to travel through this ancient forest, there will be unexpected rewards.            </p>
              <button onClick={() => {history.push('/game/ancientforest')}}>View</button>
            </div>
          </div>
        </Slider>
      </div>
      <div className='section4'>
        <h2>All Games</h2>
        <div>
          {games.map((game: any) => 
            <div className='card' key={game.id} onClick={() => {history.push(`/game/${game.id}`)}}>
              {game.tag && <img className='tag' src={game.tag} alt="" />}
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
