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

function createS3ObjectMap(allS3Object) {
  console.log("allS3Object=", allS3Object)
  let s3ObjectMap = {}
  allS3Object.forEach((s3Object) => {
    s3ObjectMap[s3Object.node.Key] = s3Object.node.localFile
  })
  return s3ObjectMap;
}

const BlogIndex = ({data, pathContext}) => {
  const posts = pathContext.group

  console.log('pathContext = ', pathContext)
  let s3ObjectMap = createS3ObjectMap(pathContext.allS3Object)
  console.log("s3ObjectMap", s3ObjectMap)

  let s3ImageMap = createS3ObjectMap(pathContext.allS3Images)
  console.log("s3ImageMap", s3ImageMap)

  const {group, index, first, last, pageCount, pathPrefix} = pathContext
  console.log('group=', group)
  console.log('index=', index)
  console.log('first=', first)
  console.log('last=', last)
  console.log('pageCount=', pageCount)
  console.log('pathPrefix=', pathPrefix)
  const pathPrefixRelative = pathPrefix === '' ? '/' : `/${pathPrefix}/`
  const previousUrl =
    index - 1 === 1
      ? `${pathPrefixRelative}`
      : `${pathPrefixRelative}${index - 1}`
  const nextUrl = `${pathPrefixRelative}${index + 1}`
  console.log('previousUrl=', previousUrl)
  console.log('nextUrl=', nextUrl)

  return (
    <Layout location={'/'}>
      <div className="px-0">
        {posts.map(function (post) {
          switch (post.node.remark.frontmatter.layout) {
            case 'Post':
              return Post(post.node)
            case 'LinkPost':
              return LinkPost(post.node)
            case 'Image':
              return Image(post.node)
            case 'Gallery':
              return Gallery(post.node)
            case 'OGLink':
              return OGLink(post.node, false, s3ObjectMap, s3ImageMap)
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
