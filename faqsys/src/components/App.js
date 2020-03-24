import React from 'react'
import {ThemeWrapper} from './ThemeWrapperComponent'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Layout/Layout'

const App = () => (
  <BrowserRouter>
    <ThemeWrapper>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </ThemeWrapper>
  </BrowserRouter>
)

export default App
