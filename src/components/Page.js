import React from 'react'
import emergence from '../../node_modules/emergence.js/src/emergence'
import PropTypes from 'prop-types'

import NavigationBar from 'components/NavigationBar'

import 'modern-normalize/modern-normalize.css'
import 'prismjs/themes/prism.css'
import 'scss/gatstrap.scss'
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.css'
import Metadata from 'components/Metadata'

class Page extends React.Component {
  componentDidMount() {
    emergence.init()
  }

  componentDidUpdate() {
    emergence.init()
  }

  render() {
    return (
      <div className="pb-4">
        <Metadata title={this.props.title} />
        <NavigationBar title={this.props.title} />
        {this.props.children}
      </div>
    )
  }
}
Page.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Page
