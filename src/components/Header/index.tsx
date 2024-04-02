import { ChainId } from 'constants/chainId'
import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Select } from 'antd';
import { NavLink, useHistory } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { ButtonGray } from '../Button'
import { getChain } from 'constants/index'
import Logo from '../../assets/images/logo.png'
import { useActiveWeb3React } from '../../hooks'
import { injected } from '../../connectors'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import './index.less'

const RowBetweenDiv = styled(RowBetween)`
  padding: 1rem 4rem;
  max-width: 1240px;
  display: grid;
  grid-template-columns: 200px 1fr 299px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
  `};
`

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  position: fixed;
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
  gap: 1rem;
`

const HeaderLogoDiv = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
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
  .chainSelect {
    .ant-select-selector {
      border-radius: 6px !important;
      height: 44px !important;
      border-radius: 8px;
      padding: 0 10px;
      background-color: ${({ theme }) => theme.bg2}!important;
      .ant-select-selection-item {
        line-height: 44px;
      }
    }
    .ant-select-arrow {
      right: 11px !important;
    }
  }
`


const NetworkBox = styled.div`
  img {
    width: 20px;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  .mobile {
    display: none;
  }
  .screen {
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


const Btn = styled(ButtonGray)`
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
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
  const history = useHistory()
  const { account, chainId } = useActiveWeb3React()
  const [isNavVisible, setNavVisibility] = useState(false)
  const [networkValue, setNetworkValue] = useState(chainId)


  useEffect(() => {
    if (chainId) {
      switchNetwork(chainId)
    }
  }, [chainId])

  const toggleNav = () => {
    setNavVisibility(!isNavVisible)
  }

  const switchNetwork = async (chainId: ChainId) => {
    setNetworkValue(chainId)
    const chain = getChain(chainId)
    injected.getProvider().then(provider => {
      provider
        .request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x' + chainId.toString(16)
            }
          ]
        })
        .catch((err: Error) => {
          if (!/Unrecognized chain ID/i.test(err.message)) {
            return
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
                  decimals: 18
                },
                blockExplorerUrls: [chain?.scanUrl]
              }
            ]
          })
        })
    })
  }

  return (
    <HeaderFrame>
      <RowBetweenDiv>
        <button onClick={toggleNav} className="Burger">
          <MenuOutlined />
        </button>
        <HeaderLogoDiv>
          <Title href="">
            <UniIcon>
              <img className="screen" style={{ width: '158px', height: '50px' }} src={Logo} alt="logo" />
              <img className="mobile" style={{ width: '158px', height: '50px' }} src={Logo} alt="logo" />
            </UniIcon>
          </Title>
        </HeaderLogoDiv>
        <div className='nav'>
          <ul>
            <li>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="game">Game</NavLink>
            </li>
            <li>
              <NavLink to="marketplace">Marketplace</NavLink>
            </li>
            <li>
              <NavLink to="guide">Guide</NavLink>
            </li>
            <li>
              <NavLink to="reward">Reward</NavLink>
            </li>
          </ul>
        </div>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
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
