import React from 'react'
import emergence from '../../node_modules/emergence.js/src/emergence'
import PropTypes from 'prop-types'

import NavigationBar from 'components/NavigationBar'
import { siteMetadata } from '../../gatsby-config'

import 'modern-normalize/modern-normalize.css'
import 'prismjs/themes/prism.css'
import 'scss/gatstrap.scss'
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.css'
import Metadata from 'components/Metadata'

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
        <NavigationBar title={this.props.title} />
        <Metadata title={this.props.title} />
        {children}
      </div>
    )
  }
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
}

Layout.defaultPropTypes = {
  title: 'Mike Gajda',
}

export default Layout
