import React from 'react'
import 'scss/gatstrap.scss'
import 'animate.css/animate.css'
import 'prismjs/themes/prism-okaidia.css'
import 'font-awesome/css/font-awesome.css'
import { getTitleFromHostname } from 'components/NavigationBar'

export default class HTML extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: 'Mike Gajda' }
  }

  componentDidMount() {
    this.setState({
      title: getTitleFromHostname('Mike Gajda'),
    })
  }
  render() {
    return (
      <html lang="en">
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
