import React from 'react'
import { SectionHeader, Title, USPRow } from '../components'

export default () => (
  <div className='section section-courses-usp'>
    <SectionHeader
      badge='Courses'
      title={['Our', '!Courses']}
      description='We have created courses to help you learn, with easy to follow steps and some sparks of fun!'/>

    <USPRow
      items={[
        {
          title: ['!Learn', 'new', '!skills', 'and', '!expand', 'your', '!horizon'],
          image: './assets/expand-horizon.svg',
        },
        {
          title: ['!Follow', '!courses', 'created', 'by', 'experienced', '!developers'],
          image: './assets/developers.svg',
        },
        {
          title: ['!Fun,', '!hands on', 'and', '!easy', 'to', '!follow'],
          image: './assets/step-by-step.svg',
          imageStyle: { width: 200},
        }
      ]}/>
  </div>
)
