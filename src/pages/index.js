import React from 'react'
import { Line } from '../components'
import { HomeHeader, WhatUsps, WhyUsps, CoursesUsps } from '../sections'

class Home extends React.Component {
  static config = {
    title: 'Learning to code - together',
  }
  render(){
    return (
      <div className='content'>
        {/* <HomeHeader/> */ }
        <WhatUsps/>
        <Line/>
        <CoursesUsps/>
        <Line/>
        <WhyUsps/>
      </div>
    )
  }
}

export default Home;
