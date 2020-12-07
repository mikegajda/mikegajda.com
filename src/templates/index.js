import {graphql, Link} from 'gatsby'
import React from 'react'

import {Post} from 'templates/Post'
import {LinkPost} from 'templates/LinkPost'
import {Image} from 'templates/Image'
import {Gallery} from 'templates/Gallery'
import {OGLink} from 'templates/OGLink'
import {Youtube} from 'templates/Youtube'
import Layout from 'components/Layout'
import Meta, {getHostName} from 'components/Meta'

const NavLink = props => {
  if (props.next) {
    return (
      <Link
        className={
          'btn btn-primary float-right ' +
          (props.test ? 'disabled btn-secondary' : '')
        }
        to={props.url}
      >
        {props.text} <i class="fa fa-arrow-right ml-1" aria-hidden="true"/>
      </Link>
    )
  } else {
    return (
      <Link
        className={
          'btn btn-primary float-left ' +
          (props.test ? 'disabled btn-secondary' : '')
        }
        to={props.url}
      >
        <i class="fa fa-arrow-left mr-1" aria-hidden="true"/> {props.text}
      </Link>
    )
  }
}

export function getPathPrefixSentenceCase(pathPrefix) {
  return pathPrefix.charAt(0).toUpperCase() + pathPrefix.substring(1)
}

export function getIndexPageTitleFromPathPrefixAndIndex(pathPrefix, index) {
  if (pathPrefix && index) {
    return `${getPathPrefixSentenceCase(pathPrefix)} | Page ${index}`
  } else if (!pathPrefix && index) {
    return `Page ${index}`
  } else if (pathPrefix && !index) {
    return `${getPathPrefixSentenceCase(pathPrefix)}`
  } else {
    return undefined
  }
}

const BlogIndex = ({data, pathContext}) => {
  const posts = pathContext.group

  const {group, index, first, last, pageCount, pathPrefix} = pathContext

  const pathPrefixRelative = pathPrefix === '' ? '/' : `/${pathPrefix}/`
  const previousUrl =
    index - 1 === 1
      ? `${pathPrefixRelative}`
      : `${pathPrefixRelative}${index - 1}`
  const nextUrl = `${pathPrefixRelative}${index + 1}`

  return (
    <Layout location={'/'}>
      <div className="px-0">
        {posts.map(function (post) {
          switch (post.node.remark.frontmatter.layout) {
            case 'Post':
              return Post(post.node)
            case 'Image':
              return Image(post.node)
            case 'Gallery':
              return Gallery(post.node)
            case 'Youtube':
              return Youtube(post.node)
            default:
              return Post(post.node)
          }
        })}

        <Meta
          title={`${getIndexPageTitleFromPathPrefixAndIndex(
            pathPrefix,
            index
          )}`}
          description={
            pathPrefix
              ? `All ${pathPrefix} on ${getHostName()}`
              : `A collection of articles, essays, links, photos and videos.`
          }
          url={`/${pathPrefix}`}
        />
        <div className="container px-0 page-navigation clearfix">
          <NavLink
            next={false}
            test={first}
            url={previousUrl}
            text="Previous Page"
          />
          <NavLink next={true} test={last} url={nextUrl} text="Next Page"/>
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex
export const pageQuery = graphql`
  query IndexPosts {
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
  }
`
