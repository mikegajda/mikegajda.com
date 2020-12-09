import { Link } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Img from 'gatsby-image'
import Page from 'components/Page'
import './Post.scss'
import { graphql } from 'gatsby'

export const Post = (node) => {
  const html = node.remark.html
  const {
    category,
    tags,
    description,
    title,
    path,
    date,
    image,
  } = node.remark.frontmatter

  const link = `/posts/${node.name}`

  const fluid = get(node, 'remark.frontmatter.image.childImageSharp.fluid')

  return (
    <React.Fragment>
      <article
        className="container p-0 card my-4 shadow"
        key={node.absolutePath}
      >
        <div className="card-header">
          <span className="text-muted">{category}</span>
          <time className="text-muted float-right" dateTime={date}>
            {date}
          </time>
        </div>
        {fluid ? <Img fluid={fluid} /> : ''}
        <div className="card-body">
          <h1 className="">
            <Link className="" to={link}>
              {title}
            </Link>
          </h1>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </React.Fragment>
  )
}

const PostContainer = ({ data, options }) => {
  let node = data.post.edges[0].node

  console.log('node=', node)
  return (
    <Page
      title={node.remark.frontmatter.title}
      url={`/posts/${node.name}`}
      description={node.remark.excerpt}
      image={get(node, 'remark.frontmatter.image.childImageSharp.fluid.src')}
    >
      <div className="container px-0">{Post(node)}</div>
    </Page>
  )
}

export default PostContainer

export const pageQuery = graphql`
  query PostByPath($absolutePath: String!) {
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
            excerpt: excerpt(pruneLength: 500)
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
