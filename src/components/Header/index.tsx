import { ChainId } from 'constants/chainId';
import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { NavLink, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { MenuOutlined, SwapOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styled from 'styled-components'
import { Button, Dropdown, Tooltip } from 'antd';
import { getChain } from 'constants/index'
import Logo from '../../assets/images/logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { injected, walletconnect, walletlink, fortmatic, portis } from '../../connectors'
import { ReactComponent as StarIcon } from  'assets/images/star.svg'

import { YellowCard } from '../Card'

import Row, { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import './index.less'

const RowBetweenDiv = styled(RowBetween)`
  max-width: 1240px;
  margin: 0 auto;
  padding: 2rem 4rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 1rem;
  `};
`

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 71px;
  @media (max-width: 768px) {
    top: 0;
  }
  &.sticky{
    background: var(--background);
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 12px;
    width: calc(100%);
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderLogoDiv = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
`
const HeaderNavBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 8px;
  gap: 20px;
  padding: 0 20px;
  background-color: rgba(255,255,255, 0.08);
  border: 1px solid rgba(255,255,255, 0.14);
  border-radius: 25px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    background-color: var(--background);
    padding: 10px 0;
    width: 100%;
    height: auto;
    position: absolute;
    top: 64px;
    left: 0;
    z-index: 100;
    &.show{
      display: flex;
    }
    &.hide{
      display: none;
    }
  `};
  a{
    outline: none;
    cursor: pointer;
    text-decoration: none;
    color: ${({ theme }) => theme.text3};
    font-size: 1rem;
    width: fit-content;
    font-weight: 500;
    :hover,
    :focus {
      color: #fff;
    }
  }
`
const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  white-space: nowrap;
  width: 100%;
  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
  .chainSelect{
    .ant-select-selector{
      border-radius: 25px!important;
      height: 50px!important;
      width: 50px!important;
      background-color: rgba(0, 0, 0, 0.4)!important;
      border: 1px solid var(--border-color)!important;
      .ant-select-selection-item{
        line-height: 45px;
        padding-right: 0!important;
      }
    }
    .ant-select-arrow{
      display: flex;
      justify-content: center;
      top:auto;
      bottom: 8px;
      left: 36px;
      height: 15px;
      width: 15px;
      border-radius: 20px;
      background: #0049C6;
    }
  }
`


const NetworkBox = styled.div`
  height: 100%;
  width: 100%;
  img{
    width: 30px;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  .mobile{
    display: none;
  }
  .screen{
    display: inline-block;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 4.5rem;
    }
    .mobile{
      display: inline-block;
    }
    .screen{
      display: none;
    }
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 300px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: auto;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  padding: 15px 12px;
  height: 100%;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    justify-content: center;
  `};
  &.${activeClassName} {
    font-weight: 600;
    background: #0049C6;
    color: #fff;
    border-radius: 25px;
    :hover,
    :focus {
      color: #fff;
    }
  }

  :hover,
  :focus {
    color: #fff;
  }
`

export default function Header() {
  const location = useLocation()
  const history = useHistory();
  const { account, chainId } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isNavVisible, setNavVisibility] = useState(false);
  const [networkValue, setNetworkValue] = useState(chainId)
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isTopClose, setIsTopClose] = useState(false);
  const headerRef: any = useRef(null);

  const fixNavBar = () => {
    if (headerRef.current) {
        setIsNavbarSticky(window.pageYOffset > headerRef.current.offsetTop)
    }
}

  useEffect(() => {
    if(chainId){
      switchNetwork(chainId)
    }
  }, [chainId])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', fixNavBar);
    return () => {
      window.removeEventListener('scroll', fixNavBar);
    }
  },[])

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };


  const switchNetwork = async (chainId: ChainId) => {
    setNetworkValue(chainId);
    const chain = getChain(chainId);
    injected.getProvider().then((provider: any) => {
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x' + chainId.toString(16),
        }]
      }).catch((err: Error) => {
        if (!/Unrecognized chain ID/i.test(err.message)) {
          return;
        }
        provider.request({
          method: 'wallet_addEthereumChain',
          params: [
              {
                chainId: '0x' + chainId.toString(16),
                rpcUrls: [chain?.rpcUrl],
                chainName: chain?.name,
                nativeCurrency: {
                    name: chain?.tokenSymbol,
                    symbol: chain?.tokenSymbol,
                    decimals: 18,
                },
                blockExplorerUrls: [chain?.scanUrl],
              },
          ],
        }) 
      })
    })
  };

  const items: MenuProps['items'] = [
    {
      key: ChainId.MAINNET,
      label: getChain(ChainId.MAINNET)?.name,
      icon: <img src={getChain(ChainId.MAINNET)?.icon} />
    },
    {
      key: ChainId.BASE,
      label: getChain(ChainId.BASE)?.name,
      icon: <img src={getChain(ChainId.BASE)?.icon} />
    }
  ]

  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    switchNetwork(Number(e.key))
  };
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  

  return (
    <div className={`header ${isTopClose ? 'close' : ''}`}>
      {!isTopClose && <div className='top'>
        <div>
          <div>
          <StarIcon/><StarIcon/><StarIcon/>&nbsp;&nbsp;&nbsp;Clique’s Flagship Game: Eternal Legacy is Now in Beta with Bounty Rewards&nbsp;&nbsp;&nbsp;<StarIcon/><StarIcon/><StarIcon/>
          </div>
          <div>
            <Button onClick={() => {window.open('https://eternallegacy.xyz/')}}>Battle Now</Button>
            <Button onClick={() => {setIsTopClose(true)}}>Close</Button>
          </div>
        </div>
      </div>}
    <HeaderFrame ref={headerRef} className={`${isNavbarSticky ? 'sticky' : ''}`}>
      <RowBetweenDiv>
        <button onClick={toggleNav} className="Burger">
          <MenuOutlined />
        </button>
        <HeaderLogoDiv>
          <Title href="/">
            <UniIcon>
              <img className="screen" style={{ width: '158px', height: '50px' }} src={Logo} alt="logo" />
              <img className="mobile" style={{ width: '94px', height: '30px' }} src={Logo} alt="logo" />
            </UniIcon>
            {/* <TitleText> */}
              {/* Soswap */}
              {/* <img style={{ marginLeft: '4px', marginTop: '0px', width: '130px' }} src={Wordmark} alt="logo" /> */}
            {/* </TitleText> */}
          </Title>
        </HeaderLogoDiv>

        <HeaderNavBox className={`${isNavVisible ? 'show': 'hide'}`}>
          <StyledNavLink 
            onClick={() => {setNavVisibility(false)}} 
            to={'/dashboard'}
            isActive={(match: any, { pathname }: any) =>
              Boolean(match) ||
              pathname.startsWith('/dashboard')
            }
            >
            Dashboard
          </StyledNavLink>
          <StyledNavLink
            to={'/game'}
            onClick={() => {setNavVisibility(false)}}
            isActive={(match: any, { pathname }: any) =>
              Boolean(match) ||
              pathname.startsWith('/game')
            }
          >
            Game Console
          </StyledNavLink>
          <Tooltip title="Coming Soon" color={'#0049C6'}>
            <a
              onClick={() => {setNavVisibility(false)}}
              href={'javascript:void(0)'}
            >
              Marketplace
            </a>
          </Tooltip>
          <StyledNavLink
            onClick={() => {setNavVisibility(false)}}
            to={'/guide'}
          >
            Guide
          </StyledNavLink>
          <Tooltip title="Coming Soon" color={'#0049C6'}>
            <a
              onClick={() => {setNavVisibility(false)}}
              href={'javascript:void(0)'}
            >
              Reward
            </a>
          </Tooltip>
        </HeaderNavBox>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {/* {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>} */}
              {/* {!isMobile && chainId && <NetworkBox>
                {chainId === ChainId.ZKSYNC && <img src={ZKNet} />}
                {chainId === ChainId.ZKSYNCTEST && <img src={ZKNet} />}
                {chainId === ChainId.LOOT && <img src={LootChain} />}
                <span style={{ fontWeight: 'bold', marginLeft: 8, color: '#000'}}>{NETWORK_LABELS[chainId]}</span>
              </NetworkBox>
              } */}
              {
                !isMobile && chainId && getChain(chainId)?.name && 
                <Dropdown menu={menuProps} className='chainDropdown'>
                  <Button>
                    <img src={getChain(chainId)?.icon} />
                      <SwapOutlined style={{color: '#fff', fontSize: '9px'}} />
                  </Button>
                </Dropdown>
              }
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {/* {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)}
                </BalanceText>
              ) : null} {!isMobile && chainId && NETWORK_TOKEN[chainId] && <Text>{NETWORK_TOKEN[chainId]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>} */}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          {/* <HeaderElementWrap>
            <VersionSwitch />
            <Settings />
            <Menu />
          </HeaderElementWrap> */}
        </HeaderControls>
      </RowBetweenDiv>
    </HeaderFrame>
    </div>
  )
}
