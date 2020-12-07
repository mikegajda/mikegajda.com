import {Link, graphql} from 'gatsby'
import get from 'lodash/get'
import React, {useEffect, useState} from 'react'
import map from 'lodash/map'
import Img from 'gatsby-image'
const stringHash = require("string-hash");
const urlParser = require('url');

const svgToMiniDataURI = require('mini-svg-data-uri');

import Meta from '../../components/Meta/index'

import Footer from 'components/Footer'
import Layout from 'components/Layout'
import './style.scss'
import {OpenGraphInfo, OpenGraphInfoContainer} from "components/OpenGraphInfo";

const SvgInline = props => {
  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    fetch(props.url)
    .then(res => {
      return res.text()
    })
    .then(res => {
      return res
    })
    .then(setSvg)
    .catch(setIsErrored)
    .then(() => setIsLoaded(true))
  }, [props.url]);

  return (
    isLoaded ?
      <img
        className={`${props.className}`}
        src={svgToMiniDataURI(svg)}
      />
      : ""
  );
}

const OGPicture = props => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      display: "block",
      margin: "0 auto"
    }}>
      <div aria-hidden="true" style={{
        width: "100%",
        paddingBottom: `${(props.height / props.width) * 100}%`
      }}></div>
      <img
        onLoad={() => {
          setImageIsLoaded(true)
        }}
        className={imageIsLoaded ? "opacity-1 position-absolute"
          : "opacity-0 position-absolute"}
        src={`https://d13wavrzg1e7kd.cloudfront.net/${props.id}.jpg`}
      />
      <SvgInline
        url={`https://d13wavrzg1e7kd.cloudfront.net/${props.id}_100w.svg`}
        className={imageIsLoaded ? "opacity-0 position-absolute"
          : "svg opacity-1 position-absolute"}/>
    </div>

  )
}

export const OGLink = (node, shouldShowPermalink, s3ObjectMap, s3ImagesMap) => {
  const html = node.remark.html
  const {
    category,
    tags,
    description,
    title,
    ogInfoId,
    ogImageHash,
    path,
    date,
    link,
    url
  } = node.remark.frontmatter

  let parsedUrl = urlParser.parse(url ? url : "https://mikegajda.com");
  let cleanUrl = parsedUrl.protocol + "//" + parsedUrl.host + parsedUrl.pathname

  let urlHashKey = stringHash(cleanUrl);

  s3ObjectMap = s3ObjectMap ? s3ObjectMap : {}
  s3ImagesMap = s3ImagesMap ? s3ImagesMap : {}

  return (
    <article className="container p-0 card my-4" key={node.absolutePath}>
      <div className="card-header">
        <span className="text-muted">Link</span>
        <time className="text-muted float-right" dateTime={date}>
          {date}
        </time>
      </div>
      <div className="card-body">
        <OpenGraphInfoContainer ogImage={`${urlHashKey}.jpg` in s3ImagesMap ? s3ImagesMap[`${urlHashKey}.jpg`] : null} ogInfo={`${urlHashKey}.json` in s3ObjectMap ? s3ObjectMap[`${urlHashKey}.json`]['content'] : null}/>
        <div className={"mt-4"}>        {html ? <div
          dangerouslySetInnerHTML={{__html: html}}/> : ''}
        </div>
      </div>
    </article>
  )
}

const OGLinkContainer = ({data, options}) => {
  let node = data.post.edges[0].node
  console.log("data=", data)
  console.log("options=", options)
  return (
    <Layout
      location={`${data.post.edges[0].node.sourceInstanceName}/${
        data.post.edges[0].node.relativeDirectory
      }/${data.post.edges[0].node.name}`}
    >
      <Meta site={get(data, 'site.meta')}/>
      <div className="container px-0">{OGLink(node, false)}</div>
    </Layout>
  )
}

export default OGLinkContainer

export const pageQuery = graphql`
  query LinkQueryByPath($absolutePath: String!) {
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
              remoteImage
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
