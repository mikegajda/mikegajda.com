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
    const { children } = this.props
    return (
      <div className="pb-4">
        <NavigationBar title={this.props.title} />
        <Metadata
          title={this.props.title}
          url={this.props.url}
          description={this.props.description}
          image={this.props.image}
        />
        {children}
      </div>
    )
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
}

Page.defaultPropTypes = {
  title: 'Mike Gajda',
  url: '/',
}

export default Page
