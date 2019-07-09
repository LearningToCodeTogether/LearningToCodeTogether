import React from 'react'
import './Navigation.scss'
import config from '../config'

export default (props) => (
  <React.Fragment>
    <header id='header' className='section-header'>
      <a href='./'>
        <img className='icon' src='./assets/icon.svg'/>
      </a>
      <a href={config.links.meetup}>
        <img className='meetup-icon' src='./assets/meetup-icon.svg'/>
      </a>
      <nav>
        {/*<a href='/about.html'>About us</a>*/}
        {/*<a href='/meetup.html'>The Meetup</a>*/}
        <a href='/courses.html'>Our Courses</a>
        {/*<a href='/resouces.html'>Resources</a>*/}
      </nav>
      <script dangerouslySetInnerHTML={{__html: `
          var header = document.getElementById('header');
          window.addEventListener('scroll', function(event){
            if(this.scrollY > 50 && header.className.indexOf('scroll') === -1){
              header.className = header.className + ' scroll'
            }else if(this.scrollY <= 50 && header.className.indexOf('scroll') !== -1){
              header.className = header.className.replace('scroll', '')
            }
          })
      `}}/>
    </header>
    <div className='section-header-spacer'/>
  </React.Fragment>
)
