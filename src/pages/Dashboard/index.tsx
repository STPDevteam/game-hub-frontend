import React, { useCallback } from 'react'
import styled from 'styled-components'
import Slider from "react-slick";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useActiveWeb3React } from '../../hooks'
import EternaLegacyImg from 'assets/images/eterna_legacy.png'
import Awns from 'assets/images/awns.png'
import Console1 from 'assets/images/console1.png'
import Console2 from 'assets/images/console2.png'
import Console3 from 'assets/images/console3.png'
import Console4 from 'assets/images/console4.png'
import { ReactComponent as NextIcon } from  'assets/images/next.svg'
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

  const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

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
                    <h2>AWNS</h2>
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
                    <h2>Game Console</h2>
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
                <div>
                  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
            <div className='right-content'>
                <div>
                    <h2>FAQ</h2>
                    <ul>
                        <li>Ways to level up quickly</li>
                        <li>How to sell game assets?</li>
                        <li>What are the points for?</li>
                        <li>How to redeem Ancient Forest points?</li>
                    </ul>
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
