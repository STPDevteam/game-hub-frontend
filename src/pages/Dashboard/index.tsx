import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { useHistory } from 'react-router-dom'
import { Tabs, Avatar, Button, Spin, Empty } from 'antd';
import { DoubleRightOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { useActiveWeb3React } from '../../hooks'
import { ChainId } from 'constants/chainId';
import { useAWNSNames } from 'hooks/useAWNSNames'
import { useAccountByName } from 'hooks/useAccountByName'
import { useImgData } from './hook'
import { getChain } from 'constants/index';
import { useToken721BalanceTokens } from 'hooks/useGetAccountOwnerAssets'
import Game1 from 'assets/images/game_1.png'
import Game2 from 'assets/images/game_2.jpg'
import Game3 from 'assets/images/game_3.png'
import Game4 from 'assets/images/game_4.png'
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
  const { account, chainId } = useActiveWeb3React();
  const [currentName, setCurrentName] = useState<string>('')
  const names = useAWNSNames(account || '')
  const { tokenBoundAccount, nftAddress, tokenId } = useAccountByName(currentName);
  console.log('names:', names)
  console.log('nftAddress:', nftAddress)
  console.log('tokenId:', tokenId)

  const nftData = useToken721BalanceTokens(tokenBoundAccount || '', chainId || ChainId.MAINNET)
  console.log('nftData:', nftData)

  useEffect(() => {
    if(names && names?.length > 0){
      setCurrentName(names[0].name)
    }else{
      setCurrentName('')
    }
  }, [names?.length])

  const switchCurrentName = (name: string) => {
    setCurrentName(name)
  }

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
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
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
                    {(!names || names.length === 0) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    {names && names.length > 0 &&
                      <Slider {...settings}>
                        {names && names.map((data: any) => 
                          <div className='card2 awns-name'>
                            <div className='userImg'><AWNSImg name={data.name}/></div>
                            <div className='name'>
                              <div>{data.name}</div>
                              {/* <div><Tag color="#A7F46A">Level 1</Tag></div> */}
                            </div>
                            {currentName === data.name && <div className='current'>Current</div>}
                            <div className='view'>
                              <Button type='default' onClick={() =>{window.open(`https://awnsbase.stp.network/nameDetail?name=${data.name}`)}}>View</Button>
                              <Button type='primary' onClick={() =>{switchCurrentName(data.name)}}>Switch</Button>
                            </div>
                          </div>
                        )}
                      </Slider>
                    }
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
                      {nftData?.loading && <div className='loading'><Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} /></div>}
                      {!nftData?.loading && (!nftData?.availableTokens || nftData?.availableTokens.length === 0) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                      {!nftData?.loading && <div className='games'>
                        {nftData?.availableTokens && nftData?.availableTokens?.map((data: any)=>  
                        <div className='card2'>
                          <img src={data.tokenUri} alt="" />
                          <div className='name'>
                            <div>{data.name}</div>
                          </div>
                          <div className='chain'>
                            {chainId && <img src={getChain(chainId)?.icon} alt="" />}
                          </div>
                        </div>)}
                      </div>
                      }
                    </Tabs.TabPane>
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
