import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import map from 'lodash/map'
import Img from 'gatsby-image'

import Page from 'components/Page'
import './Gallery.scss'

import Swiper from 'react-id-swiper'

export const Gallery = (node) => {
  const html = node.remark.html
  const {
    category,
    tags,
    description,
    title,
    path,
    date,
    images,
    link,
    captions,
  } = node.remark.frontmatter
  const url = `${node.sourceInstanceName}/${node.relativeDirectory}/${node.name}`

  const params = {
    navigation: {
      nextEl: '.swiper-button-next.swiper-button-black',
      prevEl: '.swiper-button-prev.swiper-button-black',
    },
    // pagination: {
    //   el: '.swiper-pagination.swiper-pagination-black',
    //   type: 'bullets',
    // },
    spaceBetween: 10,
    zoom: false,
    centeredSlides: true,
    keyboard: true,
    onlyInViewport: true,
  }

  return (
    <article className="container container-wide p-0 card my-4 shadow">
      <div className="card-header">
        <Link
          className="text-muted"
          to={`${node.sourceInstanceName}/${node.relativeDirectory}/${node.name}`}
        >
          {title}
        </Link>
        <time className="text-muted float-right" dateTime={date}>
          {date}
        </time>
      </div>
      <div className="">
        <Swiper {...params}>
          {images.map((image, index) => (
            <div className="">
              <Img sizes={image.childImageSharp.fixed} />
              <div className="p-3 pb-0 text-center text-muted">
                {' '}
                {captions[index] ? captions[index] : '...'}
              </div>
            </div>
          ))}
        </Swiper>
      </div>
      <div
        className="card-body pt-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}

const GalleryContainer = ({ data, options }) => {
  let node = data.post.edges[0].node

  return (
    <Page
      title={node.title}
      url={`${data.post.edges[0].node.sourceInstanceName}/${data.post.edges[0].node.relativeDirectory}/${data.post.edges[0].node.name}`}
    >
      <div className="container px-0">{Gallery(node)}</div>
    </Page>
  )
}

export default GalleryContainer

export const pageQuery = graphql`
  query GalleryByPath($absolutePath: String!) {
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
