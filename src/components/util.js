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

export function Line(){
  return <div className='section-line'><div className='line'/></div>
}
