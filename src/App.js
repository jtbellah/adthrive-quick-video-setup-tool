import React, { useState } from "react";
import Form from "./components/Form";
import Output from "./components/Output";

function App() {
  // state vars
  const [siteName, setSiteName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [playlistID, setPlaylistID] = useState("");
  const [inPostID, setInPostID] = useState("");
  const [collapsibleID, setCollapsibleID] = useState("");

  async function handleForm() {
    // proxy url
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    // get jw api
    const JWPlatformAPI = require("jwplatform");

    // create new api instance
    const jwApiInstance = new JWPlatformAPI({
      apiKey: apiKey,
      apiSecret: apiSecret
    });

    // update api url
    jwApiInstance._client.baseUrl = proxyUrl + "https://api.jwplatform.com/v1/";

    // create playlist
    await jwApiInstance.channels
      .create({
        type: "dynamic",
        title: "Sidebar",
        description: `${siteName}'s Videos.`
      })
      .then(res => {
        setPlaylistID(res.channel.key);
        // update playlist
        // note: it doesn't look like the jw api supports adding these props when creating playlists, so you have to update the playlist directly to get them added.
        jwApiInstance.channels
          .update({
            channel_key: res.channel.key,
            tags: "Sidebar",
            tags_mode: "any",
            sort_order: "views-asc",
            videos_max: 30
          })
          .then(res => console.log(res));
      });

    // create in-post player
    await jwApiInstance.players
      .create({
        name: `${siteName} - In Post`,
        responsive: "true",
        repeat: "none",
        preload: "none",
        sharing: "screen",
        sharing_heading: "Share My Videos!",
        sharing_sites: '["facebook", "twitter", "email", "pinterest"]',
        related_videos: "show"
      })
      .then(res => setInPostID(res.player.key));

    // create collapsible player
    await jwApiInstance.players
      .create({
        name: `${siteName} - Collapsible`,
        responsive: "true",
        repeat: "none",
        preload: "none"
      })
      .then(res => setCollapsibleID(res.player.key));
  }

  function handleFormReset() {
    // clear state
    setSiteName("");
    setApiKey("");
    setApiSecret("");
    setPlaylistID("");
    setInPostID("");
    setCollapsibleID("");
  }

  return (
    <div className="App container">
      {/* app header */}
      <header className="App-header p-5">
        <h1 className="text-center font-weight-lighter">
          AdThrive Quick Video Setup Tool
          <span role="img" aria-label="lightning bolt emoji">
            &nbsp;⚡️
          </span>
        </h1>
        <p className="figure-caption text-center">v2.0</p>
      </header>

      {/* form & output display */}
      <div className="container">
        <div className="row">
          <Form
            siteName={siteName}
            setSiteName={setSiteName}
            apiKey={apiKey}
            setApiKey={setApiKey}
            apiSecret={apiSecret}
            setApiSecret={setApiSecret}
            handleForm={handleForm}
            handleFormReset={handleFormReset}
          />
          <div className="col-1"></div>
          <Output
            apiKey={apiKey}
            apiSecret={apiSecret}
            playlistID={playlistID}
            inPostID={inPostID}
            collapsibleID={collapsibleID}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
