import React, {useEffect, useState} from 'react';
import './OpenGraphInfo.scss';
import Img from "gatsby-image";

const svgToMiniDataURI = require('mini-svg-data-uri');

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

export const OGPicture = props => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  let imageId = props.hash.split("_")[0];
  let imageWidth = parseInt(props.hash.split("_")[1].slice(0, -1))
  let imageHeight = parseInt(props.hash.split("_")[2].slice(0, -1))
  console.log(props.hash, imageId, imageWidth, imageHeight)
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      display: "block",
      margin: "0 auto"
    }}>
      <div aria-hidden="true" style={{
        width: "100%",
        paddingBottom: `${(imageHeight / imageWidth) * 100}%`
      }}></div>
      <img
        onLoad={() => {
          setImageIsLoaded(true)
        }}
        className={props.isLoaded ? "opacity-1 position-absolute"
          : "opacity-0 position-absolute"}
        src={`https://d13wavrzg1e7kd.cloudfront.net/${props.hash}`}
        loading={"lazy"}

      />
      <SvgInline url={`https://d13wavrzg1e7kd.cloudfront.net/${imageId}.svg`}
                 className={props.isLoaded ? "opacity-0 position-absolute"
                   : "svg opacity-1 position-absolute"}/>
    </div>

  )
}

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  // remove www. if it exists
  if (hostname.indexOf("www.") > -1) {
    hostname = hostname.split('www.')[1];
  }

  return hostname;
}

export const OpenGraphInfo = props => {
  let ogInfo = props.ogInfo
  return (
    <div className="border overflow-hidden my-4 container p-0 rounded">
      <div className={"card-img-top"}>
        {ogInfo.processedImageHash ? <OGPicture
          hash={ogInfo.processedImageHash}/> : ""}
      </div>
      <div className="bg-light p-2 px-3  oglink-title">
        <a href={ogInfo.ogUrl} target="_blank" className="">
          {ogInfo.ogTitle ? <div className="h3 mb-0">{ogInfo.ogTitle}</div>
            : ""}

          <div className="text-muted" style={{fontSize: '1rem'}}>
            <small>
              <i
                className="fa fa-external-link mr-1"
                style={{fontSize: '.75rem'}}
                aria-hidden="true"
              />
            </small>
            {extractHostname(ogInfo.ogUrl)}
          </div>
        </a>
      </div>
    </div>
  )
}

function fetchOgInfo(ogImageHash, setOgInfo, setIsLoaded, setIsLoading,
  setHasError) {
  fetch(
    `https://d13wavrzg1e7kd.cloudfront.net/${ogImageHash.split("_")[0]}.json`,
  )
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response
  })
  .then(response => {
    response.text().then(response => {
      setOgInfo(JSON.parse(response))
      setIsLoaded(true)
      setIsLoading(false)
    })
  })
  .catch((error) => {
    console.error(error)
    setHasError(true)
    setIsLoading(false)
  })
}

export const OpenGraphInfoContainer = props => {

  return (
    <div className="border overflow-hidden container p-0 rounded">
      <div className={"card-img-top"}>
          {props.ogImage && props.ogImage.childImageSharp && props.ogImage.childImageSharp.fluid ? (
            <a target="_blank" href={props.ogInfo.ogUrl}>
              <Img fluid={props.ogImage.childImageSharp.fluid} />
            </a>
          ) : ''}
      </div>
      {props.ogInfo && props.ogInfo.ogUrl ? (
        <div className="bg-light p-2 px-3 oglink-title">
          <a href={props.ogInfo.ogUrl} target="_blank" className="">
            {<div className="h4 mb-0">{props.ogInfo.ogTitle}</div>}

            <div className="text-muted" style={{fontSize: '.75rem'}}>
              <small>
                <i
                  className="fa fa-external-link mr-1"
                  style={{fontSize: '.55rem'}}
                  aria-hidden="true"
                />
              </small>
              {extractHostname(props.ogInfo.ogUrl)}
            </div>
          </a>
        </div>
      ) : ""}

    </div>
  )
}
