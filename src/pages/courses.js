import React from 'react'
import { PageHeader, Line, Courses, FeaturedResources } from '../components'

class Home extends React.Component {
  static config = {
    title: 'Learning to code - together',
  }
  render(){
    return (
      <div id='page-courses'>
        <PageHeader
          title={['!Welcome', 'to', '!our', '!courses']}
          description="Here you can find all our courses we have created to help you learn, with easy to follow steps and some sparks of fun! Let’s get coding!"
          image='./assets/header-image-our-courses.svg'/>
        <Courses/>
        <FeaturedResources/>
      </div>
    )
  }
}

export default Home;
