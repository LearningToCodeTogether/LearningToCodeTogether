import React from 'react'
import { Line } from './index'
import './Footer.scss'

export default () => (
  <React.Fragment>
    <Line/>
    <div className='section-footer'>
      <img className='logo' src='./assets/logo.svg'/>
      <div className='title'>Created by</div>
      <div className='subtitle'>Rein Op't land & Danny van der Jagt</div>
      <div className='team-container'>
        <img className='team' src='./assets/danny&rein.svg'/>
      </div>
    </div>
  </React.Fragment>
)
