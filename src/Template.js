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
