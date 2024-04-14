import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { Tabs, Avatar } from 'antd';
import { useHistory } from 'react-router-dom'
import { DoubleRightOutlined, UserOutlined } from '@ant-design/icons';
import { useActiveWeb3React } from '../../hooks'
import Awns from 'assets/images/awns.png'
import { useGetUserAllNFT } from 'hooks/useGetUserNFT'
import { useAWNSNames } from 'hooks/useAWNSNames'
import { useImgData } from './hook'
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


const AWNSImg = ({name}: any) => {
  const isImg = (url: any) => {
    if(typeof url === 'string'){
      return /\.(jpg|jpeg|png|gif|webp)(?:\?.*)?$/i
    }else{
      return false
    }
  }
  const path = useImgData(name)
  return name && isImg(path) ? <img src={path} alt="" /> : <Avatar style={{background: '#282A54'}} size={64} icon={<UserOutlined />} />
}

export default function Dashboard() {
  const history = useHistory();
  const [refresh, setRefresh] = useState<number>(-1)
  const { account, chainId } = useActiveWeb3React();
  const { loading: NftLoading, data: nftData } = useGetUserAllNFT(
    account || '',
    chainId,
    refresh,
  )

  const names = useAWNSNames(account || '')
  console.log('names:', names)
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
                    <div className='extra-btn' onClick={() => {window.open('https://awns.stp.network/')}}>{'Register new AWNS  >>'}</div>
                    </h2>
                    <Slider {...settings}>
                      {names && names.map((data: any) => 
                        <div className='card2'>
                          {/* <img src={Awns} alt="" /> */}
                         <div className='userImg'><AWNSImg name={data.name}/></div>
                          <div className='name'>
                            <div>{data.name}</div>
                            {/* <div><Tag color="#A7F46A">Level 1</Tag></div> */}
                          </div>
                        </div>
                      )}
                    </Slider>
                </div>
                <div className='section1'>
                    <h2>Game Console
                      {/* <div className='extra-btn'>{'Points Record  >>'}</div> */}
                    </h2>
                    <Slider {...settings2}>
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
                    </Slider>
                </div>
                <div className='section1'>
                  <h2>Assets</h2>
                  <Tabs defaultActiveKey="1" moreIcon={<DoubleRightOutlined style={{color: '#fff'}}/>}>
                    <Tabs.TabPane tab="All" key="1">
                      <div className='games'>
                        <div className='card2'>
                          <img src={Game1} alt="" />
                          <div className='name'>
                            <div>NFT Name#1</div>
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
                    {/* <Tabs.TabPane tab="Ancient Forest (3)" key="2">
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
                    </Tabs.TabPane> */}
                  </Tabs>
                </div>
            </div>
            <div className='right-content'>
                <div>
                    <h2>Learn More
                      <div className='extra-btn'>{'More  >>'}</div>
                    </h2>
                    <ul>
                        <li><a href='https://stpdao.gitbook.io/whitepaper/game-portal-awns/awns-aw-name-service/how-to-guide' target='_blank'>How to Create AWNS<LinkIcon/></a></li>
                        <li><a href='https://stpdao.gitbook.io/whitepaper/game-portal-awns/awns-aw-name-service/how-to-guide' target='_blank'>How to manipulate assets in the ERC-6551 account?<LinkIcon/></a></li>
                        <li><a href='https://stpdao.gitbook.io/whitepaper/stp/scaling-onchain-gaming' target='_blank'>Scaling Onchain Gaming?<LinkIcon/></a></li>
                        <li><a href='https://stpdao.gitbook.io/whitepaper/stp/pioneer-ai-gaming-on-base' target='_blank'>Pioneer AI Gaming on Base?<LinkIcon/></a></li>
                    </ul>
                </div>
                <div>
                  <h2>Popular Games
                    <div className='extra-btn'>{'More  >>'}</div>
                  </h2>
                  <div className='popular-games'>
                    <div onClick={() => {history.push('/game/dynamicavatar')}}>
                      <div>
                        <img src={Game2} alt="Popular Game" />
                      </div>
                      <div>
                        <h3>Dynamic avatar(Beta)</h3>
                        {/* <p><LikeIcon/> 13,300</p> */}
                      </div>
                    </div>
                    <div  onClick={() => {history.push('/game/dice')}}>
                      <div>
                        <img src={Game3} alt="Popular Game" />
                      </div>
                      <div>
                        <h3>DICE</h3>
                        {/* <p><LikeIcon/> 13,300</p> */}
                      </div>
                    </div>
                    <div onClick={() => {history.push('/game/ancientforest')}}>
                      <div>
                        <img src={Game4} alt="Popular Game" />
                      </div>
                      <div>
                        <h3>Ancient Forest</h3>
                        {/* <p><LikeIcon/> 13,300</p> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <h2>Popular NFT
                    <div className='extra-btn'>{'More  >>'}</div>
                  </h2>
                  <div className='nfts'>
                    <div className='card'>
                      <img src={NFT1} alt="NFT" />
                      <div className='name'>
                        <div>NFT Name#1</div>
                      </div>
                    </div>
                    <div className='card'>
                      <img src={NFT2} alt="NFT" />
                      <div className='name'>
                        <div>NFT Name#2</div>
                      </div>
                    </div>
                    <div className='card'>
                      <img src={NFT3} alt="NFT" />
                      <div className='name'>
                        <div>NFT Name#3</div>
                      </div>
                    </div>
                    <div className='card'>
                      <img src={NFT4} alt="NFT" />
                      <div className='name'>
                        <div>NFT Name#4</div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
