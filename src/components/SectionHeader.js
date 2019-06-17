import React from 'react'
import { Title, TitleBadge } from './index'
import './SectionHeader.scss'

export default (props) => (
  <div className='section-section-header'>
    {props.badge && <TitleBadge title={props.badge}/>}
    <h2><Title title={props.title}/></h2>
    {props.description && <div className='description'>{props.description}</div>}
  </div>
)
