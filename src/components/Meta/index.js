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
      case 'localhost':
        return 'Mike Gajda LOCAL'
      default:
        return defaultTitle
    }
  } catch {
    return defaultTitle
  }
}

export const defaultTitlePrefix = 'Mike Gajda'
export default class Meta extends React.Component {
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
    let title = ''
    if (this.props.title) {
      title = ` | ${this.props.title}`
    }
    return (
      <Helmet
        title={`${this.state.titlePrefix}${title}`}
        meta={[
          { name: 'twitter:card', content: 'summary' },
          {
            name: 'twitter:site',
            content: `@mikendever`,
          },
          { property: 'og:title', content: this.state.title },
          { property: 'og:type', content: 'website' },
          {
            property: 'og:description',
            content: `${this.props.description}`,
          },
          {
            property: 'og:url',
            content: `${this.props.url}`,
          },
          {
            property: 'og:image',
            content: `${this.props.image}`,
          },
        ]}
      />
    )
  }
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
}

Meta.defaultProps = {
  description: 'No description available at this time.',
  url: '/',
  image: '/img/android-chrome-512x512.png',
}
