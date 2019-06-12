global.jsRequire ? global.jsRequire.push('./tmp/components/PageHeader.js') : global.jsRequire = ['./tmp/components/PageHeader.js'];
import React from 'react'
import { Title } from './index'
import './PageHeader.scss'

export default (props) => (
  <div className='section-page-header'>
    <img className='header-image' src={props.image}/>
    <h1><Title title={props.title}/></h1>
    <span className='text'>{props.description}</span>
  </div>
)
