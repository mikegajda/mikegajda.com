import React from 'react'
import Helmet from 'react-helmet'
import * as PropTypes from 'prop-types'

export function getTitleFromHostname(defaultTitle) {
  try {
    switch (window.location.hostname) {
      case 'mikegajda.com':
        return 'Mike Gajda'
      case 'www.mikegajda.com':
        return 'Mike Gajda'
      case 'michaelgajda.com':
        return 'Michael Gajda'
      case 'www.michaelgajda.com':
        return 'Michael Gajda'
      case 'endeavorreport.com':
        return 'Endeavor Report'
      case 'www.endeavorreport.com':
        return 'Endeavor Report'
      case 'localhost':
        return 'Mike Gajda LOCAL'
      default:
        return defaultTitle
    }
  } catch {
    return defaultTitle
  }
}

export function getHostName() {
  try {
    return window.location.hostname
  } catch {
    return 'mikegajda.com'
  }
}

export default class Metadata extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {


    return (
      <Helmet
        title={this.props.title}
      />
    )
  }
}

Metadata.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  twitterSummaryType: PropTypes.string,
  ogType: PropTypes.string,
}

Metadata.defaultProps = {
  description: 'No description available at this time.',
  url: '/',
  image: '/img/android-chrome-512x512.png',
  twitterSummaryType: 'summary',
  ogType: 'website',
}
