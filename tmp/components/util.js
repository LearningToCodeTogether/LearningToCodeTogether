global.jsRequire ? global.jsRequire.push('./tmp/components/util.js') : global.jsRequire = ['./tmp/components/util.js'];
import React from 'react'
import './util.scss'

export function Title(props){
  return props.title.map((text, index) => {
    const space = index < props.title.length ? ' ' : ''
    if(text[0] === '!'){
      return <span className='font-weight-bold'>{text.replace(/^!/g, '')}{space}</span>
    }
    return <span>{text}{space}</span>
  })
}

export function Line(props){
  return <div className='section-line'><div className={['line', props.maskTop && ' mask-top'].join(' ')}/></div>
}

export function TitleBadge(props){
  return <React.Fragment>
    <div className='title-badge'>
      <div className='title-badge-title'>{props.title}</div>
    </div>
    {props.subTitle && <div className='title-badge-subtitle'>{props.subTitle}</div>}
  </React.Fragment>
}
