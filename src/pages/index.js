import React from 'react'
import { Header } from '../components'

class Home extends React.Component {
  render(){
    return (
      <div className='header'>
        <Header/>
        <h1>{this.props.title || `I'm working, yeah!`}</h1>
      </div>
    )
  }
}

export default Home;
