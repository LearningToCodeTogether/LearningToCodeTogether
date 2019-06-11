import React from 'react'

export default function(props){
  return (
    <html>
      <head>
        {props.style && <style>{props.css}</style>}
      </head>
      <body>
        {props.children || ''}
      </body>
    </html>
  )
}
