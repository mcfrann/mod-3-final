import React, { Component } from 'react'
import './App.css'
import { getUrls, postUrl } from '../../apiCalls'
import UrlContainer from '../UrlContainer/UrlContainer'
import UrlForm from '../UrlForm/UrlForm'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    this.fetchUrls()
  }

  componentDidUpdate() {
    this.fetchUrls()
  }

  fetchUrls() {
    getUrls().then((newUrls) => this.setState(newUrls))
  }

  addUrl(newUrl) {
    postUrl(newUrl)
  }

  render() {
    return (
      <main className='App'>
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls} />
      </main>
    )
  }
}

export default App
