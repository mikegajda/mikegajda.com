import React from 'react'
import emergence from '../../node_modules/emergence.js/src/emergence'

import NavigationBar from 'components/NavigationBar'
import { siteMetadata } from '../../gatsby-config'

import 'modern-normalize/modern-normalize.css'
import 'prismjs/themes/prism.css'
import 'scss/gatstrap.scss'
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.css'

class Layout extends React.Component {
  componentDidMount() {
    emergence.init()
  }

  componentDidUpdate() {
    emergence.init()
  }

  render() {
    const { children } = this.props
    return (
      <div className="pb-4">
        <NavigationBar title={siteMetadata.title} {...this.props} />
        {children}
      </div>
    )
  }
}

export default Layout
