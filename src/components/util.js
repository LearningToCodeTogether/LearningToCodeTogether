import React from 'react'
import './util.scss'

export function Title(props){
  return <div className={['component-title', props.className].join(' ')}>
    {props.title.map((text, index) => {
      const space = index < props.title.length ? ' ' : ''
      if(text[0] === '!'){
        return <span className='font-weight-bold'>{text.replace(/^!/g, '')}{space}</span>
      }
      return <span>{text}{space}</span>
    })}
  </div>
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

export function PageHeader(props){
  return <div className='component-page-header'>
    <img className='header-image' src={props.image}/>
    <h1><Title title={props.title}/></h1>
    <span className='text'>{props.description}</span>
  </div>
}

export function SectionHeader(props){
  return <div className='component-section-header'>
    {props.badge && <TitleBadge title={props.badge}/>}
    <h2><Title title={props.title}/></h2>
    {props.description && <div className='description'>{props.description}</div>}
  </div>
}

export function USPRow(props){
  return <div className='component-usp-row'>
    {props.items.map((item, index) => (
      <div className='item team' key={index}>
        <img className='image' style={item.imageStyle} src={item.image}/>
        <Title className='title' title={item.title}/>
        {item.description && <div className='description'>{item.description}</div>}
      </div>
    ))}
  </div>
}
