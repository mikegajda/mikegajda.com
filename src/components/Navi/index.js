import React from 'react'
import { Link } from 'gatsby'

function getTitleFromHostname(defaultTitle) {
  try {
    switch (window.location.hostname) {
      case 'mikegajda':
        return 'Mike Gajda'
      case 'michaelgajda':
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

class Navi extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: this.props.title }
  }

  componentDidMount() {
    this.setState({
      title: getTitleFromHostname(this.props.title),
    })
  }
  render() {
    const { location, title } = this.props

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container px-0">
          <Link className="text-center" to="/">
            <h1 className="navbar-brand mb-0">{this.state.title}</h1>
          </Link>
          <button
            class="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link className="nav-link" to="/posts">
                  Posts
                  <i
                    class="fa fa-file-text d-md-none ml-2"
                    aria-hidden="true"
                  />
                </Link>
              </li>
              <li class="nav-item active">
                <Link className="nav-link" to="/images">
                  Images
                  <i class="fa fa-camera d-md-none ml-2" aria-hidden="true" />
                </Link>
              </li>
              <li class="nav-item active">
                <Link className="nav-link" to="/videos">
                  Videos
                  <i
                    class="fa fa-video-camera d-md-none ml-2"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a className="nav-link" href="https://twitter.com/mikendever">
                  <span className="d-md-none mr-2">Twitter</span>
                  <i class="fa fa-twitter" aria-hidden="true" />
                </a>
              </li>
              <li class="nav-item active">
                <a className="nav-link" href="https://github.com/mikegajda">
                  <span className="d-md-none mr-2">Github</span>
                  <i class="fa fa-github" aria-hidden="true" />
                </a>
              </li>
              <li class="nav-item active">
                <a
                  className="nav-link"
                  href="https://www.linkedin.com/in/mgajda"
                >
                  <span className="d-md-none mr-2">LinkedIn</span>
                  <i class="fa fa-linkedin-square" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navi
