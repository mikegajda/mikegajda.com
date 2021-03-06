import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import map from 'lodash/map'
import Img from 'gatsby-image'

import Page from 'components/Page'
import './Image.scss'

export const Image = (node) => {
  const html = node.remark.html
  const {
    category,
    tags,
    description,
    title,
    path,
    date,
    image,
    link,
  } = node.remark.frontmatter
  const url = `${node.sourceInstanceName}/${node.relativeDirectory}/${node.name}`

  const fluid = get(node, 'remark.frontmatter.image.childImageSharp.fluid')

  return (
    <article
      className="container container-wide p-0 card my-4 shadow"
      key={node.absolutePath}
    >
      <Img
        className="card-img-top"
        fluid={fluid}
        style={{ display: 'block', margin: '0 auto' }}
      />
      <div className="card-footer">
        <span className="text-muted">{title}</span>
        <time className="text-muted float-right" dateTime={date}>
          {date}
        </time>
      </div>
    </article>
  )
}

const ImageContainer = ({ data, options }) => {
  let node = data.post.edges[0].node

  return (
    <Page
      title={node.title}
      url={`${node.sourceInstanceName}/${node.relativeDirectory}/${node.name}`}
    >
      <div className="container px-0">{Image(node)}</div>
    </Page>
  )
}

export default ImageContainer

export const pageQuery = graphql`
  query ImagePostByPath($absolutePath: String!) {
    site {
      meta: siteMetadata {
        title
        description
        url: siteUrl
        author
        twitter
      }
    }
    post: allFile(filter: { absolutePath: { eq: $absolutePath } }) {
      edges {
        node {
          id: absolutePath
          relativePath
          relativeDirectory
          absolutePath
          sourceInstanceName
          name
          ext
          birthTime(formatString: "YYYY-MM-DD hh:mm:ss")
          changeTime(formatString: "YYYY-MM-DD hh:mm:ss")
          remark: childMarkdownRemark {
            id
            html
            frontmatter {
              layout
              title
              link
              date(formatString: "YYYY/MM/DD")
              publishDate: date
              category
              tags
              description
              captions
              image {
                childImageSharp {
                  fluid(maxWidth: 738) {
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
              images {
                childImageSharp {
                  fixed(width: 708, height: 555, cropFocus: ATTENTION) {
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
