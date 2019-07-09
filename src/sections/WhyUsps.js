import React from 'react'
import { SectionHeader, Title, USPRow } from '../components'
import './WhyUsps.scss'

export default () => (
  <div className='section section-why-usp'>
    <SectionHeader
      badge='Why?'
      title={['!Why', 'do', '!we', '!do', '!this']}
      description='It’s really simple actually. We just love to combine our passion for code with our love for teaching. Coding is so much fun when doing it together.'/>

      <USPRow
        items={[
          {
            title: ['!Technology'],
            image: './assets/technology.svg',
            description: 'We love to experiment and create awesome stuff from the comfort of our couch.',
          },
          {
            title: ['!People'],
            image: './assets/community.svg',
            description: 'It’s always fun to do things together, the excitement and the collaborations.',
          },
          {
            title: ['!Teaching'],
            image: './assets/personal-speed.svg',
            description: 'We like to learn and to teach others the stuff we know.'
          }
        ]}/>
  </div>
)
