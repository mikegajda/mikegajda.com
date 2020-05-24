import React, {useState} from 'react'
import Layout from "components/Layout";
import {OpenGraphInfo, OGPicture} from "components/OpenGraphInfo";

function fetchInfo(url, breakCache, setOgInfo, setIsLoaded, setIsLoading, setHasError) {
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

  let ogInfoCard = isLoaded ?  <OpenGraphInfo ogInfo={ogInfo} />
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
                      fetchInfo(url, shouldBreakCache, setOgInfo, setIsLoaded, setIsLoading,
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
                }} />
            </label>
          </div>
          <div className="col">
            {loadingIndicator}
          </div>
        </div>

        <div>Error: {`${hasError}`}</div>
        <div>ImageSlug: {`${isLoaded ? ogInfo.processedImageHash : ""}`}</div>

          {ogInfoCard}

      </div>


    </Layout>
  )
}
