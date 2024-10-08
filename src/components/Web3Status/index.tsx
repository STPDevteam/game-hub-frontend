import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken, lighten } from 'polished'
import React, { useMemo, useContext } from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAWNSName } from 'hooks/useAWNSName'
import { Activity } from 'react-feather'
import { useTranslation } from 'react-i18next'
import styled, { css, ThemeContext } from 'styled-components'
import { useImgData } from '../../pages/Dashboard/hook'
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
// import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
import PortisIcon from '../../assets/images/portisIcon.png'
import WalletIcon from '../../assets/images/wallet.svg'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { fortmatic, injected, portis, walletconnect, walletlink } from '../../connectors'
import { NetworkContextName } from '../../constants'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import { ButtonSecondary } from '../Button'

import Identicon from '../Identicon'
import Loader from '../Loader'

import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
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
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: #0049C6;
  border: none;
  color: #fff;
  font-weight: 500;
  height: 50px;
  border-radius: 25px;
  :hover,
  :focus {
    background-color: rgba(0, 73, 198, 0.9)!important;
    /* border: 1px solid ${({ theme }) => darken(0.05, theme.primary6)}; */
    color: ${({ theme }) => theme.primaryText2};
  }

  ${({ faded }) =>
    faded &&
    css`
      // background-color: rgba(0, 0, 0, 0.4);
      border: none;
      color: #fff;

      :hover,
      :focus {
        color: #fff;
      }
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-color);
  color: #fff;
  font-weight: 500;
  height: 50px;
  border-radius: 25px;
  :hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.4);

    :focus {
      border: 1px solid var(--border-color);
    }
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

const AvatorIcon = styled.div`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  overflow: hidden;
  img{
    width: 100%;
  }
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const SOCK = (
  <span role="img" aria-label="has socks emoji" style={{ marginTop: -4, marginBottom: -4 }}>
    🧦
  </span>
)

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return <Identicon />
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={''} />
      </IconWrapper>
    )
  } else if (connector === walletlink) {
    return (
      <IconWrapper size={16}>
        <img src={CoinbaseWalletIcon} alt={''} />
      </IconWrapper>
    )
  } else if (connector === portis) {
    return (
      <IconWrapper size={16}>
        <img src={PortisIcon} alt={''} />
      </IconWrapper>
    )
  }
  return null
}

const AWNSImg = ({name}: any) => {
  const isImg = (url: any) => {
    if(typeof url === 'string'){
      return /\.(jpg|jpeg|png|gif|webp)(?:\?.*)?$/i
    }else{
      return false
    }
  }
  const path = useImgData(name)
  return name && isImg(path) ? <img src={path} alt="" /> : <Avatar style={{background: '#282A54'}} size={28} icon={<UserOutlined />} />
}

function Web3StatusInner() {
  const { t } = useTranslation()
  const { account, connector, error } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)
  const AWNSName = useAWNSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)

  const hasPendingTransactions = !!pending.length
  const toggleWalletModal = useWalletModalToggle()
  const theme = useContext(ThemeContext)

  if (account) {
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        {/* {!hasPendingTransactions && connector && <WalletIconBox src={WalletIcon} />} */}
        {hasPendingTransactions ? (
          <RowBetween>
            <Text style={{ color: theme.text1 }}>{pending?.length} Pending</Text> <Loader stroke={theme.text1} />
          </RowBetween>
        ) : (
          <>
            {<AvatorIcon><AWNSImg name={AWNSName}/></AvatorIcon>}
            <Text>{ENSName || AWNSName || shortenAddress(account)}</Text>
          </>
        )}
        {/* {!hasPendingTransactions && connector && <StatusIcon connector={connector} />} */}
      </Web3StatusConnected>
    )
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Text>
      </Web3StatusError>
    )
  } else {
    return (
      <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <Text>{t('Connect Wallet')}</Text>
      </Web3StatusConnect>
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)
  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
