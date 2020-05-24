import React, {useState} from 'react'
import Layout from "components/Layout";
import {OGInfo, OGPicture} from "components/OGInfo";

function fetchInfo(url, setOgInfo, setIsLoaded, setIsLoading, setHasError) {
  fetch(
    `https://opengraph-helper.netlify.app/.netlify/functions/app/opengraph-info?url=${url}`,
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

export function OGInfoCard(ogInfo) {
  console.log("ogInfo=", ogInfo)
  if (ogInfo.ogInfo.response) {
    return (
      <OGInfo response={ogInfo.ogInfo.response} />
    )
  }
}

export default function OGInfoPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [ogInfo, setOgInfo] = useState()
  const [url, setUrl] = useState("")

  let ogInfoCard = isLoaded ? <OGInfoCard ogInfo={ogInfo}/> : ""
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
        <div className="row">
          <div className="col">
            <button className={"btn btn-primary"}
                    onClick={() => {
                      setIsLoaded(false)
                      setIsLoading(true)
                      fetchInfo(url, setOgInfo, setIsLoaded, setIsLoading,
                        setHasError)
                    }}>Submit
            </button>
          </div>
          <div className="col">
            {loadingIndicator}
          </div>
        </div>




        <div>Error: {`${hasError}`}</div>
        <article className="card my-4 container">
          {ogInfoCard}
        </article>

      </div>


    </Layout>
  )
}
