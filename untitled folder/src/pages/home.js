import React from 'react'

class Home extends React.Component {
  static config = {
    css: ['../style.css'],
  }


  render(){
    return <h1>{this.props.title || `Hello there! I'm working, yeah!`}</h1>
  }
}

export default Home;
