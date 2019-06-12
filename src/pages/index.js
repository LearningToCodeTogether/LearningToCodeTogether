import React from 'react'

class Home extends React.Component {
  static config = {
    title: 'Learning to code - together',
  }
  render(){
    return (
      <div className='content'>
        <h1>{this.props.title || `I'm working, yeah!`}</h1>
        <div style={{height: 10000, width: 100}}/>
      </div>
    )
  }
}

export default Home;
