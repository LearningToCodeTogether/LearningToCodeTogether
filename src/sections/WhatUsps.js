import React from 'react'
import { SectionHeader, Title, USPRow } from '../components'

export default () => (
  <div className='section section-what-usp'>
    <SectionHeader
      badge='Do you want to'
      title={['!Learn', 'how', 'to', '!code']}
      description='Awesome! Let’s do this together. We are here to support you in your coding jounery.'/>

      <USPRow
        items={[
          {
            title: ['Get', '!help', '!from', 'experienced', '!developers'],
            image: './assets/team.svg',
          },
          {
            title: ['!Learn', '!&', '!share', 'with', 'our', '!community'],
            image: './assets/community.svg',
          },
          {
            title: ['!Personal', '&', 'at', 'your', '!own', '!speed'],
            image: './assets/personal-speed.svg'
          }
        ]}/>
  </div>
)
