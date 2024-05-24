import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import WalletProvider from 'contexts/AppContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Game from './Game'
import Dashboard from './Dashboard'
import GameDetail from './Game/GameDetail'
import Reward from './Reward'
import Guide from './Guide'
import GuideDetail from './Guide/GuideDetail'
import './App.less'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  @media (max-width: 768px) {
    padding-top: 74px;
  }
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
                    <Route exact strict path="/game/:name" component={GameDetail} />
                    <Route exact strict path="/dashboard" component={Dashboard} />
                    <Route exact strict path="/reward" component={Reward} />
                    <Route exact strict path="/guide" component={Guide} />
                    <Route exact strict path="/guide/:name" component={GuideDetail} />
                  </Switch>
                </Web3ReactManager>
                <Marginer />
              </BodyWrapper>
              <Footer/>
            </AppWrapper>
          </WalletProvider>
      </HashRouter>
    </Suspense>
  )
}
