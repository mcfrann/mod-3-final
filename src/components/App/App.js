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

  fetchUrls() {
    getUrls().then((newUrls) => this.setState({ urls: newUrls.urls }))
  }

  addUrl(newUrl) {
    postUrl(newUrl)
      .then((response) => response.json())
      .then((res) => this.setState({ urls: [...this.state.urls, res] }))
  }

  render() {
    return (
      <main className='App'>
        <header>
          <h1 className='page-title'>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls} />
      </main>
    )
  }
}

export default App
