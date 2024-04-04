import { ChainId } from 'constants/chainId';
import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { NavLink, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { MenuOutlined, SwapOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { Select, Space } from 'antd';
import { getChain } from 'constants/index'
import Logo from '../../assets/images/logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { injected, walletconnect, walletlink, fortmatic, portis } from '../../connectors'

import { YellowCard } from '../Card'

import Row, { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import './index.less'

const RowBetweenDiv = styled(RowBetween)`
  padding: 1rem 8rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
  `};
`

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 1000;
  &.sticky{
    background: var(--background);
    position: fixed;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 12px;
    width: calc(100%);
    position: relative;
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
  height: 44px;
  border-radius: 8px;
  gap: 20px;
  padding: 0 20px;
  background-color: rgba(255,255,255, 0.08);
  border: 1px solid rgba(255,255,255, 0.14);
  border-radius: 20px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img{
    width: 30px;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
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
    border-radius: 20px;
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

const NETWORKS: any = [
  {
    value: ChainId.MAINNET,
    label: (
      <NetworkBox>
        <img src={getChain(ChainId.MAINNET)?.icon} />
      </NetworkBox>
    )
  },
  {
    value: ChainId.BASE,
    label: (
      <NetworkBox>
        <img src={getChain(ChainId.BASE)?.icon} />
      </NetworkBox>
    )
  }
]

export default function Header() {
  const location = useLocation()
  const history = useHistory();
  const { account, chainId } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isNavVisible, setNavVisibility] = useState(false);
  const [networkValue, setNetworkValue] = useState(chainId)
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
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

  return (
    <HeaderFrame ref={headerRef} className={`${isNavbarSticky ? 'sticky' : ''}`}>
      <RowBetweenDiv>
        <button onClick={toggleNav} className="Burger">
          <MenuOutlined />
        </button>
        <HeaderLogoDiv>
          <Title href="https://app.rai.finance/#/">
            <UniIcon>
              <img className="screen" style={{ width: '158px', height: '50px' }} src={Logo} alt="logo" />
              <img className="mobile" style={{ width: '158px', height: '50px' }} src={Logo} alt="logo" />
            </UniIcon>
            {/* <TitleText> */}
              {/* Soswap */}
              {/* <img style={{ marginLeft: '4px', marginTop: '0px', width: '130px' }} src={Wordmark} alt="logo" /> */}
            {/* </TitleText> */}
          </Title>
        </HeaderLogoDiv>

        <HeaderNavBox className={`${isNavVisible ? 'show': 'hide'}`}>
          <StyledNavLink 
            // onClick={() => {setNavVisibility(false)}} 
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
            // onClick={() => {setNavVisibility(false)}}
            isActive={(match: any, { pathname }: any) =>
              Boolean(match) ||
              pathname.startsWith('/game')
            }
          >
            Game Console
          </StyledNavLink>
          <StyledNavLink
            // onClick={() => {setNavVisibility(false)}}
            to={'/marketplace'}
          >
            Marketplace
          </StyledNavLink>
          <StyledNavLink
            // onClick={() => {setNavVisibility(false)}}
            to={'/guide'}
          >
            Guide
          </StyledNavLink>
          <StyledNavLink
            // onClick={() => {setNavVisibility(false)}}
            to={'/reward'}
          >
            Reward
          </StyledNavLink>
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
                <Select
                  style={{borderRadius: '6px', marginRight: '10px'}}
                  onChange={switchNetwork}
                  options={NETWORKS}
                  value={chainId}
                  className='chainSelect'
                  dropdownStyle={{minWidth: '130px'}}
                  suffixIcon={<SwapOutlined style={{color: '#fff', fontSize: '9px'}} />}
                />
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
  )
}
