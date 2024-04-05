import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Tabs, Tag, Progress } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useActiveWeb3React } from '../../hooks'
import Awns from 'assets/images/awns.png'
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


export default function Reward() {
  const { account, chainId, library } = useActiveWeb3React()
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
    <div className="container-reward">
      <div className='section1'>
        <h1>Rewards</h1>
        <p>Join Clique early access and earn NFTs</p>
        <div className='info'>
          <div className='card'>
            <img src={Awns} alt="" />
            <div className='name'>
              <div>tatanick.aw</div>
              <div><Tag color="#A7F46A">Level 1</Tag></div>
            </div>
          </div>
          <div>
            <div className='header'>
              <div>Current Level: <span>3</span></div>
              <div>Points: <span>3,300</span></div>
              <div>1,700 points short of promotion. <button>Boost</button></div>
            </div>
            <div className='body'>
              <div>100px</div>
              <div>2,000px</div>
              <div>3,000px</div>
              <div>5,000px</div>
              <div>{'>8,000px'}</div>
            </div>
            <div className='footer'>
              <Progress
                strokeColor={{
                  '0%': '#0C0E29',
                  '100%': '#3E5ED0',
                }}
                strokeWidth={58}
                percent={60}
                showInfo={false}
              />
              <div className='levels'>
                <div>Level 1</div>
                <div>Level 2</div>
                <div className='active'>Level 3</div>
                <div>Level 4</div>
                <div>Level 5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section2'>
        <Tabs defaultActiveKey="1" >
          <Tabs.TabPane tab="Level 1" key="1">
            <div className='games'>
              <div className='card2'>
                <img src={Game1} alt="" />
                <div className='name'>
                  <div>Eternal Legacy</div>
                </div>
              </div>
              <div className='card2'>
                <img src={Game2} alt="" />
                <div className='name'>
                  <div>NFT Name#2</div>
                </div>
              </div>
              <div className='card2'>
                <img src={Game3} alt="" />
                <div className='name'>
                  <div>NFT Name#3</div>
                </div>
              </div>
              <div className='card2'>
                <img src={Game4} alt="" />
                <div className='name'>
                  <div>NFT Name#4</div>
                </div>
              </div>
              <div className='card2'>
                <img src={Game5} alt="" />
                <div className='name'>
                  <div>NFT Name#5</div>
                </div>
              </div>
              <div className='card2'>
                <img src={Game6} alt="" />
                <div className='name'>
                  <div>NFT Name#6</div>
                </div>
              </div>
              <div className='card2'>
                <img src={Game7} alt="" />
                <div className='name'>
                  <div>NFT Name#7</div>
                </div>
              </div>
              <div className='card2'>
                <img src={Game8} alt="" />
                <div className='name'>
                  <div>NFT Name#8</div>
                </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Level 2" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Level 3" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
          <Tabs.TabPane tab="Level 4" key="4">
            Content of Tab Pane 3
          </Tabs.TabPane>
          <Tabs.TabPane tab="Level 5" key="5">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
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
