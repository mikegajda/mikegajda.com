import React from 'react'
import { Link } from 'gatsby'
import Metadata, {
  defaultTitlePrefix,
  getTitleFromHostname,
} from 'components/Metadata'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: this.props.title }
  }

  componentDidMount() {
    this.setState({
      title: getTitleFromHostname(defaultTitlePrefix),
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
            className="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/posts">
                  Posts
                  <i
                    className="fa fa-file-text d-md-none ml-2"
                    aria-hidden="true"
                  />
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/images">
                  Images
                  <i
                    className="fa fa-camera d-md-none ml-2"
                    aria-hidden="true"
                  />
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/videos">
                  Videos
                  <i
                    className="fa fa-video-camera d-md-none ml-2"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="https://twitter.com/mikendever">
                  <span className="d-md-none mr-2">Twitter</span>
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="https://github.com/mikegajda">
                  <span className="d-md-none mr-2">Github</span>
                  <i className="fa fa-github" aria-hidden="true" />
                </a>
              </li>
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="https://www.linkedin.com/in/mgajda"
                >
                  <span className="d-md-none mr-2">LinkedIn</span>
                  <i className="fa fa-linkedin-square" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavigationBar
