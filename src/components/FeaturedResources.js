import React from 'react'
import { SectionHeader, FeatureRow } from './index'
import './FeaturedResources.scss'
import data from '../data'

export default () => (
  <div className='section-featured-resources'>
    <SectionHeader
      badge='Resources'
      title={['!There is more!']}
      description='The Internet is filled with great resources for learning how to code. We have created a list to help you find them!'/>
      <img className='illustration' src='./assets/illustration-resources.svg'/>
      <div className='item-container'>
        {data.featuredResources.map((item, index) => (
          <a href={item.link}>
            <div className='item'>
              <div className='title'>{item.title}</div>
              <div className='description'>{item.description}</div>
            </div>
          </a>
        ))}
      </div>
      <a href='/resources.html'>
        <div className='button'>
          See all our resources
        </div>
      </a>
  </div>
)
