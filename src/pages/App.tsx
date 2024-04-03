import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import WalletProvider from 'contexts/AppContext'
import Header from '../components/Header'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Game from './Game'
// import Predict from './Predict'
// import PredictDetail from './Predict/PredictDetail'
// import Transactions from './Predict/Transactions'
import './App.less'
import Dashboard from './Dashboard'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Route component={DarkModeQueryParamReader} />
          <WalletProvider>
            <AppWrapper>
              <Header />
              <BodyWrapper>
                <Popups />
                <Web3ReactManager>
                  <Switch>
                    <Route exact strict path="/" component={Game} />
                    <Route exact strict path="/game" component={Game} />
                    <Route exact strict path="/dashboard" component={Dashboard} />
                  </Switch>
                </Web3ReactManager>
                <Marginer />
              </BodyWrapper>
            </AppWrapper>
          </WalletProvider>
      </HashRouter>
    </Suspense>
  )
}
