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

export const defaultTitlePrefix = 'Mike Gajda'
export default class Metadata extends React.Component {
  constructor(props) {
    super(props)
    this.state = { titlePrefix: defaultTitlePrefix }
  }

  componentDidMount() {
    this.setState({
      titlePrefix: getTitleFromHostname(defaultTitlePrefix),
    })
  }

  render() {
    let title = this.state.titlePrefix
    let ogTitle = this.state.titlePrefix
    if (this.props.title) {
      title = `${this.state.titlePrefix} | ${this.props.title}`
      ogTitle = this.props.title
    }

    return (
      <Helmet
        title={title}
        meta={[
          { name: 'twitter:card', content: `${this.props.twitterSummaryType}` },
          {
            name: 'twitter:site',
            content: `@mikendever`,
          },
          {
            name: 'twitter:creator',
            content: `@mikendever`,
          },
          { property: 'og:title', content: `${ogTitle}` },
          { property: 'og:type', content: `${this.props.ogType}` },
          {
            property: 'og:description',
            content: `${this.props.description}`,
          },
          {
            property: 'og:url',
            content: `https://${getHostName()}${this.props.url}`,
          },
          {
            property: 'og:image',
            content: `https://${getHostName()}${this.props.image}`,
          },
        ]}
      />
    )
  }
}

Metadata.propTypes = {
  title: PropTypes.string,
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