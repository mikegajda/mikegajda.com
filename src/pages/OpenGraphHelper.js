import React, {useState} from 'react'
import Layout from "components/Layout";
import {OpenGraphInfo, OGPicture} from "components/OpenGraphInfo";
import Img from "gatsby-image";

function fetchInfo(url, breakCache, setOgInfo, setIsLoaded, setIsLoading,
  setHasError) {
  fetch(
    `https://opengraph-helper.netlify.app/.netlify/functions/app/opengraph-info?url=${url}&breakCache=${breakCache}`,
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

export default function OpenGraphHelper() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shouldBreakCache, setShouldBreakCache] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [ogInfo, setOgInfo] = useState()
  const [url, setUrl] = useState("")

  let ogInfoCard = isLoaded ? <OpenGraphInfo ogInfo={ogInfo}/>
    : ""
  let loadingIndicator = (
    isLoading ?
      <div className="spinner-border float-right" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      : ""
  )

  return (
    <Layout
      location={`OGInfo`}
    >
      <div className={"container mt-2"}>
        <div className={"form-group"}>
          <label htmlFor="exampleInputPassword1">Url</label>
          <input
            className={"form-control"}
            name="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="row form-group">
          <div className="col">
            <button className={"btn btn-primary"}
                    onClick={() => {
                      setIsLoaded(false)
                      setIsLoading(true)
                      fetchInfo(url, shouldBreakCache, setOgInfo, setIsLoaded,
                        setIsLoading,
                        setHasError)
                    }}>Submit
            </button>
            <label className={"ml-4"}>
              Break Cache:
              <input
                name="shouldBreakCache"
                type="checkbox"
                checked={shouldBreakCache}
                className={"ml-2"}
                onChange={() => {
                  setShouldBreakCache(!shouldBreakCache)
                }}/>
            </label>
          </div>
          <div className="col">
            {loadingIndicator}
          </div>
        </div>
        <hr />

        <div>Error: {`${hasError}`}</div>
        <div>ImageSlug: {`${isLoaded ? ogInfo.processedImageHash : ""}`}</div>

        {isLoaded ? (
          <div>
            <h4>OpenGraphContainer</h4>
            <div className="border overflow-hidden container p-0 rounded mt-2">
              <div className={"card-img-top"}>
                <a target="_blank" href={ogInfo.ogUrl}>
                  {ogInfo.processedImageHash ? (
                    <img className={"m-0 p-0 "}
                         src={`https://d13wavrzg1e7kd.cloudfront.net/${ogInfo.processedImageHash}`}/>
                  ) : ""}

                </a>
              </div>
              <div className="bg-light p-2 px-3 oglink-title">
                <a href={ogInfo.ogUrl ? ogInfo.ogUrl : ""} target="_blank" className="">
                  {<div className="h4 mb-0">{ogInfo.ogTitle ? ogInfo.ogTitle : "NO TITLE"}</div>}

                  <div className="text-muted" style={{fontSize: '.75rem'}}>
                    <small>
                      <i
                        className="fa fa-external-link mr-1"
                        style={{fontSize: '.55rem'}}
                        aria-hidden="true"
                      />
                    </small>
                    {ogInfo.ogUrl ? ogInfo.ogUrl : ""}
                  </div>
                </a>
              </div>
            </div>
            <hr />
            <h4>Title</h4>
            {ogInfo.ogTitle ? (<p>{ogInfo.ogTitle}</p>) : "" }
            <h4>Description/Excerpt</h4>
            {ogInfo.ogDescription ? (<p>{ogInfo.ogDescription}</p>) : ""}
            <h4>IG Feed</h4>
            {ogInfo.processedImageHash ? (
              <img width={"500px"}src={`https://d13wavrzg1e7kd.cloudfront.net/${ogInfo.processedImageHash.split(".")[0]}_ig_feed.jpg`} />
            ) : ""}

            <h4>IG Story</h4>
            {ogInfo.processedImageHash ? (
              <img width={"500px"} src={`https://d13wavrzg1e7kd.cloudfront.net/${ogInfo.processedImageHash.split(".")[0]}_ig_story.jpg`} />
            ) : ""}


          </div>

        ) : ''}

      </div>


    </Layout>
  )
}
