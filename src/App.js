/* eslint-disable no-shadow */
import React, { useState } from 'react';
import JWPlatformAPI from 'jwplatform';
import Form from './components/Form';
import Output from './components/Output';

import sitemapFetch from './lib/import/sitemapFetch';

function App() {
  // state vars
  const [siteName, setSiteName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [playlistID, setPlaylistID] = useState('');
  const [inPostID, setInPostID] = useState('');
  const [collapsibleID, setCollapsibleID] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [importTotal, setImportTotal] = useState('');
  const [error, setError] = useState(false);
  const [importing, setImporting] = useState(false);
  const [playersExist, setPlayersExist] = useState(false);
  const [playlistsExist, setPlaylistsExist] = useState(false);
  const [videosExist, setVideosExist] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle form submission
  async function handleForm() {
    setLoading(true);

    // proxy url
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // create new api instance
    const jwApiInstance = new JWPlatformAPI({
      apiKey,
      apiSecret,
    });

    // update api url
    jwApiInstance._client.baseUrl = `${proxyUrl}https://api.jwplatform.com/v1/`;

    // get existing objects
    const existingPlayers = await jwApiInstance.players
      .list()
      .then(res => res.players.length > 0);

    const existingPlaylists = await jwApiInstance.channels
      .list()
      .then(res => res.channels.length > 0);

    const existingVideos = await jwApiInstance.videos
      .list()
      .then(res => res.videos.length > 0);

    // check if videos exist
    if (sitemapUrl && existingVideos) {
      setVideosExist(true);
    }

    // if sitemap url is added and no videos exist, start video import
    if (sitemapUrl && !existingVideos) {
      sitemapFetch(
        jwApiInstance,
        sitemapUrl,
        setError,
        setImportTotal,
        setImporting
      );
    }

    // check if players and playlists exist
    if (existingPlayers || existingPlaylists) {
      if (existingPlayers) {
        setPlayersExist(true);
      }

      if (existingPlaylists) {
        setPlaylistsExist(true);
      }

      // we can return here to prevent players and playlists from being setup
      return console.warn(
        '⚠️ Aborted player and playlist setup due to existing objects'
      );
    }

    // create playlist
    await jwApiInstance.channels
      .create({
        type: 'dynamic',
        title: 'Sidebar',
        description: `${siteName}'s Videos.`,
      })
      .then(res => {
        setPlaylistID(res.channel.key);
        // update playlist
        // note: it doesn't look like the jw api supports adding these props when creating playlists, so you have to update the playlist directly to get them added.
        jwApiInstance.channels.update({
          channel_key: res.channel.key,
          tags: 'Sidebar',
          tags_mode: 'any',
          sort_order: 'views-asc',
          videos_max: 30,
        });
      });

    // create in-post player
    await jwApiInstance.players
      .create({
        name: `${siteName} - In Post`,
        responsive: 'true',
        repeat: 'none',
        preload: 'none',
        sharing: 'screen',
        sharing_heading: 'Share My Videos!',
        sharing_sites: '["facebook", "twitter", "email", "pinterest"]',
        displaytitle: 'true',
        related_videos: 'show',
      })
      .then(res => setInPostID(res.player.key));

    // create collapsible player
    await jwApiInstance.players
      .create({
        name: `${siteName} - Collapsible`,
        responsive: 'true',
        repeat: 'none',
        preload: 'none',
        displaydescription: 'false',
      })
      .then(res => setCollapsibleID(res.player.key));

    setLoading(false);
  }

  function handleFormReset() {
    // clear state
    setSiteName('');
    setApiKey('');
    setApiSecret('');
    setPlaylistID('');
    setInPostID('');
    setCollapsibleID('');
    setSitemapUrl('');
    setImportTotal('');
    setError(false);
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
        <p className="figure-caption text-center">v2.1</p>
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
            sitemapUrl={sitemapUrl}
            setSitemapUrl={setSitemapUrl}
            error={error}
            playersExist={playersExist}
            playlistsExist={playlistsExist}
            videosExist={videosExist}
            loading={loading}
          />
          <div className="col-1"></div>
          <Output
            apiKey={apiKey}
            apiSecret={apiSecret}
            playlistID={playlistID}
            inPostID={inPostID}
            collapsibleID={collapsibleID}
            importTotal={importTotal}
            importing={importing}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
