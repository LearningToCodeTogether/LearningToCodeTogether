import React from 'react'
import { Header } from '../components'

class Home extends React.Component {
  static config = {
    title: 'Learning to code - together',
  }
  render(){
    return (
      <div className='content'>
        <Header/>
        <h1>{this.props.title || `I'm working, yeah!`}</h1>
      </div>
    )
  }
}

export default Home;
