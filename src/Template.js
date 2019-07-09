import React from 'react'
import './styles/main.scss'
import { Navigation, Footer } from './sections'

export default function(props){
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap" rel="stylesheet"/>
        {(props.stylesheets || []).map(i => <link key={i} rel='stylesheet' type='text/css' href={i}/>)}
      </head>
      <body>
        <Navigation/>
        {props.children || ''}
        <Footer/>
      </body>
    </html>
  )
}
