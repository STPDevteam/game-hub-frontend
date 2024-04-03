import { ChainId } from 'constants/chainId';
import React, { useState, useEffect, useContext } from "react";
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { NavLink, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router'
import { MenuOutlined } from '@ant-design/icons';
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
  z-index: 2;
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
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
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
      border-radius: 6px!important;
      height: 44px!important;
      border-radius: 8px;
      padding: 0 10px;
      background-color: ${({ theme }) => theme.bg2}!important;
      .ant-select-selection-item{
        line-height: 44px;
      }
    }
    .ant-select-arrow{
      right: 11px!important;
    }
  }
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const NetworkBox = styled.div`
  width: fit-content;
  border-radius: 12px;
  display: flex;
  align-items: center;
  img{
    width: 20px;
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

  // if(typeof(chainId) !== 'undefined' && account !== null && chainId === 42220){
  //   window.location.href = 'https://swap-celo.spacefi.io'
  // }
  // if(typeof(chainId) !== 'undefined' && account !== null && chainId === 44787){
  //   window.location.href = 'https://swap-celoalfa.spacefi.io'
  // }
  // if(typeof(chainId) !== 'undefined' && account !== null && chainId === 9000){
  //   window.location.href = 'https://swap-tevmos.spacefi.io'
  // }
  // if(typeof(chainId) !== 'undefined' && account !== null && chainId === 9001){
  //   window.location.href = 'https://swap-evmos.spacefi.io'
  // }
  // if(typeof(chainId) !== 'undefined' && account !== null && chainId === 324){
  //   window.location.href = 'https://swap-zksync.spacefi.io'
  // }

  useEffect(() => {
    if(chainId){
      switchNetwork(chainId)
    }
  }, [chainId])

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
    <HeaderFrame>
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
            onClick={() => {setNavVisibility(false)}} 
            to={'/dashboard'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/dashboard')
            }
            >
            Dashboard
          </StyledNavLink>
          <StyledNavLink
            to={'/game'}
            onClick={() => {setNavVisibility(false)}}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/game')
            }
          >
            Game
          </StyledNavLink>
          <StyledNavLink
            onClick={() => {setNavVisibility(false)}}
            to={'/marketplace'}
          >
            Marketplace
          </StyledNavLink>
          <StyledNavLink
            onClick={() => {setNavVisibility(false)}}
            to={'/guide'}
          >
            Guide
          </StyledNavLink>
          <StyledNavLink
            onClick={() => {setNavVisibility(false)}}
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
