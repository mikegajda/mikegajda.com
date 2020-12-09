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
    console.log("props=",this.props)
    return (
      <Helmet>
        <title>{this.props.title}</title>
        <meta property="og:url" content={'https://mikegajda.com' + this.props.url} />
        <meta property="og:title" content={this.props.title} />
        <meta property="og:description" content={this.props.description} />
        <meta property="og:image" content={this.props.image} />
      </Helmet>
    )
  }
}

Metadata.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
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
