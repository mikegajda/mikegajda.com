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
      <Helmet>
        <meta charSet={"utf-8"} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>{this.props.title} | Mike Gajda</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/site.webmanifest"/>
        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#01bc84"
        />
        <link rel="shortcut icon" href="/img/favicon.ico"/>
        <meta name={"theme-color"} content={"#ffffff"} />
        <meta name="msapplication-TileColor" content="#01bc84"/>
        <meta name="msapplication-config" content="/img/browserconfig.xml"/>
        <link rel={"stylesheet"} href={"https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/css/swiper.min.css"} />
        <link integrity={"sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"}
              crossOrigin={"anonymous"}
              href={"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"} />
        <link integrity={"sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"}
              crossOrigin={"anonymous"}
              href={"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"} />
        <script integrity={"sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"}
              crossOrigin={"anonymous"}
              src={"https://code.jquery.com/jquery-3.2.1.slim.min.js"} />
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
