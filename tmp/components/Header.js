global.jsRequire ? global.jsRequire.push('tmp/components/Header.js') : global.jsRequire = ['tmp/components/Header.js'];
import React from 'react'
import './Header.scss'

export default (props) => (
  <header className='header'>
    <div>Header!</div>
    <div class='nav'>
      <a href='http://google.nl'>Google</a>
    </div>
  </header>
)
