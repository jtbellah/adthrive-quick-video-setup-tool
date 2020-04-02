/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

function Form(props) {
  const {
    siteName,
    setSiteName,
    apiKey,
    setApiKey,
    apiSecret,
    setApiSecret,
    handleForm,
    handleFormReset,
    sitemapUrl,
    setSitemapUrl,
    error,
    playersExist,
    playlistsExist,
    videosExist,
    loading,
  } = props;

  if (loading) {
    return (
      <div className="col-5">
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border text-primary"
            style={{ width: '3rem', height: '3rem' }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="col-5">
      {/* site name field */}
      {playersExist && (
        <div className="alert alert-warning">
          ⚠️ Players for this property already exist.
        </div>
      )}
      {playlistsExist && (
        <div className="alert alert-warning">
          ⚠️ Playlists for this property already exist.
        </div>
      )}
      {videosExist && (
        <div className="alert alert-warning">
          ⚠️ Videos for this property already exist.
        </div>
      )}
      <div className="form-group">
        <label htmlFor="siteNameInput" className="font-weight-bold">
          Site Name
        </label>
        <input
          type="text"
          className="form-control"
          id="siteNameInput"
          value={siteName}
          onChange={e => setSiteName(e.target.value)}
          placeholder="Site Name"
        ></input>
      </div>

      {/* api key field */}
      <div className="form-group">
        <label htmlFor="apiKeyInput" className="font-weight-bold">
          API Key
        </label>
        <input
          type="text"
          className="form-control"
          id="apiKeyInput"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="API Key"
        ></input>
      </div>

      {/* api secret field */}
      <div className="form-group">
        <label htmlFor="apiSecretInput" className="font-weight-bold">
          API Secret
        </label>
        <input
          type="text"
          className="form-control"
          id="apiSecretInput"
          value={apiSecret}
          onChange={e => setApiSecret(e.target.value)}
          placeholder="API Secret"
        ></input>
      </div>

      {/* sitemap url field */}
      <div className="form-group">
        <label htmlFor="sitemapUrlInput" className="font-weight-bold">
          Mediavine Sitemap Url
        </label>
        <input
          type="text"
          className="form-control"
          id="sitemapUrlInput"
          value={sitemapUrl}
          onChange={e => setSitemapUrl(e.target.value)}
          placeholder="Sitemap Url"
        ></input>
        {error && (
          <div className="alert alert-danger mt-1">
            ❗There was an error with the sitemap URL
          </div>
        )}
      </div>

      {/* submit btn */}
      <div className="form-group">
        {/* submit */}
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleForm}
          disabled={!siteName || !apiKey || !apiSecret}
        >
          Submit
        </button>

        {/* reset */}
        <button
          type="button"
          className="btn btn-danger mt-3 ml-3"
          onClick={handleFormReset}
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}

export default Form;
