import React from 'react'
import { TitleBadge } from './index'
import './Courses.scss'
import data from '../data'

export default (props) => (
  <div className='section-courses'>
    {data.courses.map((category) => (
      <div className='category'>
        <TitleBadge title={category.title} subTitle={category.subTitle}/>
        <div className='item-container'>
          {category.items.map(i => (
            <a href={i.link}>
              <div className='item'>
                <div className='content'>
                  <div className='title'>{i.title}</div>
                  <div className='subTitle'>{i.subTitle}</div>
                  <div className='description'>{i.description}</div>
                </div>
                <div style={{ flex: 1 }}/>
                <div className='bar'>
                  {i.duration && (<React.Fragment>
                    <img className='time-icon' src='./assets/icon-stopwatch.svg'/>
                    <div className='time-text'>{i.duration}</div>
                  </React.Fragment>)}
                  {i.duration && i.type && <div className='line'/>}
                  {i.type && <div className='type-text'>{i.type}</div>}
                  <div style={{ flex: 1 }}/>
                  <div className='button'>
                    <img src='./assets/icon-arrow-right.svg'/>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>
)
