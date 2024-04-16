import React, { useCallback } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import { getChain } from 'constants/index';
import { ChainId } from 'constants/chainId';
import EternaLegacyImg from 'assets/images/EternaLegacyImg.png'
import Forest1 from 'assets/images/forest1.png'
import Forest2 from 'assets/images/forest2.png'
import Forest3 from 'assets/images/forest3.png'
import Forest4 from 'assets/images/forest4.png'
import Forest5 from 'assets/images/forest5.png'
import UpcomingGame1 from 'assets/images/upcoming_game_1.png'
import UpcomingGame2 from 'assets/images/upcoming_game_2.png'
import UpcomingGame3 from 'assets/images/upcoming_game_3.png'
import Game1 from 'assets/images/game_1.png'
import Game2 from 'assets/images/game_2.jpg'
import Game3 from 'assets/images/game_3.png'
import Game4 from 'assets/images/game_4.png'
import Game5 from 'assets/images/game_5.png'
import Game6 from 'assets/images/game_6.png'
import Game7 from 'assets/images/game_7.png'
import Game8 from 'assets/images/game_8.png'
import { ReactComponent as NextIcon } from  'assets/images/next.svg'
import './index.less'


export default function Game() {
  const history = useHistory();
  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block", }}
        onClick={onClick}
      >
        <NextIcon/>
      </button>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
  };

  return (
    <div className="container-game">
      <div className='section1'>
        <h1></h1>
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
      </div>
      <div className='section2'>
        <h2>Popular Games</h2>
        <div className='popular-game' onClick={() => {history.push('/game/ancientforest')}}>
          <div><img src={Forest1} alt="Forest" /></div>
          <div>
            <div>
              <div><img src={Forest2} alt="Forest" /></div>
              <div>
                <div className='head'>
                  <h3>ANCIENT FOREST</h3>
                  <div>
                    <img src={getChain(ChainId.MAINNET)?.icon} alt="Base"/>
                    <img src={getChain(ChainId.BASE)?.icon} alt="Base"/>
                  </div>
                </div>
                <p>The forest is full of temptations and traps, use your wits to travel through this ancient forest, there will be unexpected rewards.</p>
              </div>
            </div>
            <div>
              <div><img src={Forest3} alt="Forest" /></div>
              <div><img src={Forest4} alt="Forest" /></div>
              <div><img src={Forest5} alt="Forest" /></div>
            </div>
          </div>
        </div>
      </div>
      <div className='section3'>
        <div>
          <h2>Upcoming Games</h2>
          <div>
            <Slider {...settings}>
              <div className='card'>
                <img src={UpcomingGame1} alt="" />
                <div className='name'>
                  <h3>HERO2</h3>
                </div>
              </div>
              <div className='card'>
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
              </div>
            </Slider>
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
