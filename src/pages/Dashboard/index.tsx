import React, { useCallback } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { Tabs } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { useActiveWeb3React } from '../../hooks'
import Awns from 'assets/images/awns.png'
import Console1 from 'assets/images/console1.png'
import Console2 from 'assets/images/console2.png'
import Console3 from 'assets/images/console3.png'
import Console4 from 'assets/images/console4.png'
import Game1 from 'assets/images/game_1.png'
import Game2 from 'assets/images/game_2.png'
import Game3 from 'assets/images/game_3.png'
import Game4 from 'assets/images/game_4.png'
import Game5 from 'assets/images/game_5.png'
import Game6 from 'assets/images/game_6.png'
import Game7 from 'assets/images/game_7.png'
import Game8 from 'assets/images/game_8.png'
import PopularGame1 from 'assets/images/popular-game1.png'
import PopularGame2 from 'assets/images/popular-game2.png'
import PopularGame3 from 'assets/images/popular-game3.png'
import NFT1 from 'assets/images/nft1.png'
import NFT2 from 'assets/images/nft2.png'
import NFT3 from 'assets/images/nft3.png'
import NFT4 from 'assets/images/nft4.png'
import { ReactComponent as NextIcon } from  'assets/images/next.svg'
import { ReactComponent as LinkIcon } from  'assets/svg/link.svg'
import { ReactComponent as LikeIcon } from  'assets/svg/like.svg'
import './index.less'


export default function Dashboard() {
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
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    <div className="container-dashboard">
        <div>
            <div className='left-content'>
                <div className='section1'>
                    <h2>AWNS
                    <div className='extra-btn'>{'Register new AWNS  >>'}</div>
                    </h2>
                    <Slider {...settings}>
                        <div>
                        <img src={Awns} alt="" />
                        </div>
                        <div>
                        <img src={Awns} alt="" />
                        </div>
                        <div>
                        <img src={Awns} alt="" />
                        </div>
                    </Slider>
                </div>
                <div className='section1'>
                    <h2>Game Console
                      <div className='extra-btn'>{'Points Record  >>'}</div>
                    </h2>
                    <Slider {...settings2}>
                        <div>
                            <img src={Console1} alt="" />
                        </div>
                        <div>
                            <img src={Console2} alt="" />
                        </div>
                        <div>
                            <img src={Console3} alt="" />
                        </div>
                        <div>
                            <img src={Console4} alt="" />
                        </div>
                    </Slider>
                </div>
                <div className='section1'>
                  <h2>Assets</h2>
                  <Tabs defaultActiveKey="1" moreIcon={<DoubleRightOutlined style={{color: '#fff'}}/>}>
                    <Tabs.TabPane tab="All" key="1">
                      <div className='games'>
                        <div><img src={Game1} alt="" /></div>
                        <div><img src={Game2} alt="" /></div>
                        <div><img src={Game3} alt="" /></div>
                        <div><img src={Game4} alt="" /></div>
                        <div><img src={Game5} alt="" /></div>
                        <div><img src={Game6} alt="" /></div>
                        <div><img src={Game7} alt="" /></div>
                        <div><img src={Game8} alt="" /></div>
                      </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Ancient Forest (3)" key="2">
                      Content of Tab Pane 2
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Dynamic Avatar (5)" key="3">
                      Content of Tab Pane 3
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Adventure Forge (5)" key="4">
                      Content of Tab Pane 3
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Adventure Forge (5)" key="5">
                      Content of Tab Pane 3
                    </Tabs.TabPane>
                  </Tabs>
                </div>
            </div>
            <div className='right-content'>
                <div>
                    <h2>FAQ
                      <div className='extra-btn'>{'More  >>'}</div>
                    </h2>
                    <ul>
                        <li><a href=''>Ways to level up quickly<LinkIcon/></a></li>
                        <li><a href=''>How to sell game assets?<LinkIcon/></a></li>
                        <li><a href=''>What are the points for?<LinkIcon/></a></li>
                        <li><a href=''>How to redeem Ancient Forest points?<LinkIcon/></a></li>
                    </ul>
                </div>
                <div>
                  <h2>Popular Games
                    <div className='extra-btn'>{'More  >>'}</div>
                  </h2>
                  <div className='popular-games'>
                    <div>
                      <div>
                        <img src={PopularGame1} alt="Popular Game" />
                      </div>
                      <div>
                        <h3>Game Name 1</h3>
                        <p><LikeIcon/> 13,300</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={PopularGame2} alt="Popular Game" />
                      </div>
                      <div>
                        <h3>Game Name 2</h3>
                        <p><LikeIcon/> 13,300</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={PopularGame3} alt="Popular Game" />
                      </div>
                      <div>
                        <h3>Game Name 3</h3>
                        <p><LikeIcon/> 13,300</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2>Popular NFT
                    <div className='extra-btn'>{'More  >>'}</div>
                  </h2>
                  <div className='nfts'>
                    <div><img src={NFT1} alt="NFT" /></div>
                    <div><img src={NFT2} alt="NFT" /></div>
                    <div><img src={NFT3} alt="NFT" /></div>
                    <div><img src={NFT4} alt="NFT" /></div>
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
