import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Meta from '../../components/Meta/index'
import Layout from 'components/Layout'
import './style.scss'

import URL from 'url-parse'

export const Youtube = node => {
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

  let prettyLink = link.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '')

  let youtubeKey = new URL(link, true).query.v

  if (youtubeKey) {
    return (
      <React.Fragment>
        <Meta title={title} url={link} />
        <article
          className="container container-wide p-0 card my-4 shadow rounded"
          key={node.absolutePath}
        >
          <div className="embed-responsive embed-responsive-16by9 card-img-top rounded">
            <iframe
              className="embed-responsive-item"
              src={`https://www.youtube.com/embed/${youtubeKey}`}
              allowFullScreen
            />
          </div>

          {html ? (
            <div className="card-body">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          ) : (
            ''
          )}
        </article>
      </React.Fragment>
    )
  } else {
    return ''
  }
}

const YoutubeContainer = ({ data, options }) => {
  const {
    category,
    tags,
    description,
    title,
    path,
    date,
    image,
    link,
  } = data.post.edges[0].node.remark.frontmatter
  const isIndex = false
  // const { isIndex, adsense } = options
  const html = get(data.post.edges[0].node.remark, 'html')
  // const fixed = get(image, 'childImageSharp.fixed')

  let node = data.post.edges[0].node
  return (
    <Layout
      location={`${data.post.edges[0].node.sourceInstanceName}/${data.post.edges[0].node.relativeDirectory}/${data.post.edges[0].node.name}`}
    >
      <Meta site={get(data, 'site.meta')} />
      <div className="container px-0">{Youtube(node)}</div>
    </Layout>
  )
}

export default YoutubeContainer

export const pageQuery = graphql`
  query YoutubeQueryByPath($absolutePath: String!) {
    site {
      meta: siteMetadata {
        title
        description
        url: siteUrl
        author
        twitter
        adsense
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
