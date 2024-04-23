import React, { useCallback } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import EternaLegacyImg from 'assets/images/EternaLegacyImg.png'
import Forest1 from 'assets/images/forest1.png'
import UpcomingGame1 from 'assets/images/upcoming_game_1.jpg'
import UpcomingGame2 from 'assets/images/upcoming_game_2.png'
import UpcomingGame3 from 'assets/images/upcoming_game_3.png'
import Game1 from 'assets/images/game_1.png'
import Game2 from 'assets/images/game_2.jpg'
import Game3 from 'assets/images/game_3.png'
import Game4 from 'assets/images/game_4.png'
import { ReactComponent as NextIcon } from  'assets/images/next.svg'
import './index.less'


export default function Game() {
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
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
              Enter the realm of "Eternal Legacy," where the echoes of a fallen empire set the stage for a groundbreaking adventure. Dive into a card game that merges strategic mastery with the revolutionary power of AI and blockchain technology.
              </p>
              <button onClick={() => {window.open('https://eternallegacy.xyz')}}>Play Now</button>
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
              <button onClick={() => {window.open('https://ancientforest.xyz')}}>Play Now</button>
            </div>
          </div>
        </Slider>
      </div>
      <div className='section3'>
        <div>
          <h2>Upcoming Games</h2>
          <div className='games'>
            {/* <Slider {...settings}> */}
              <div className='card'>
                <img src={UpcomingGame1} alt="" />
                <div className='name'>
                  <h3>ARCADE WORLD</h3>
                </div>
              </div>
              {/* <div className='card'>
                <img src={UpcomingGame2} alt="" />
                <div className='name'>
                  <h3>Adventure Forge</h3>
                </div>
              </div>
              <div className='card'>
                <img src={UpcomingGame3} alt="" />
                <div className='name'>
                  <h3>DICE</h3>
                </div>
              </div> */}
            {/* </Slider> */}
          </div>
        </div>
      </div>
      <div className='section4'>
        <h2>All Games</h2>
        <div>
          <div className='card' onClick={() => {history.push('/game/eternallegacy')}}>
            <img src={Game1} alt="" />
            <div className='name'>
              <h3>Eternal Legacy</h3>
            </div>
          </div>
          <div className='card' onClick={() => {history.push('/game/dynamicavatar')}}>
            <img src={Game2} alt="" />
            <div className='name'>
              <h3>Dynamic avatar(Beta)</h3>
            </div>
          </div>
          <div className='card' onClick={() => {history.push('/game/dice')}}>
            <img src={Game3} alt="" />
            <div className='name'>
              <h3>DICE</h3>
            </div>
          </div>
          <div className='card' onClick={() => {history.push('/game/ancientforest')}}>
            <img src={Game4} alt="" />
            <div className='name'>
              <h3>Ancient Forest</h3>
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
