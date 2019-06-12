global.jsRequire ? global.jsRequire.push('./tmp/Template.js') : global.jsRequire = ['./tmp/Template.js'];
import React from 'react'

export default function(props){
  return (
    <html>
      <head>
        <title>{props.title}</title>
        {(props.stylesheets || []).map(i => <link key={i} rel='stylesheet' type='text/css' href={i}/>)}
      </head>
      <body>
        {props.children || ''}
      </body>
    </html>
  )
}
