import React from "react";

function Form(props) {
  return (
    <form className="col-5">
      {/* site name field */}
      <div className="form-group">
        <label htmlFor="siteNameInput" className="font-weight-bold">
          Site Name
        </label>
        <input
          type="text"
          className="form-control"
          id="siteNameInput"
          value={props.siteName}
          onChange={e => props.setSiteName(e.target.value)}
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
          value={props.apiKey}
          onChange={e => props.setApiKey(e.target.value)}
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
          value={props.apiSecret}
          onChange={e => props.setApiSecret(e.target.value)}
          placeholder="API Secret"
        ></input>
      </div>

      {/* submit btn */}
      <div className="form-group">
        {/* submit */}
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={props.handleForm}
          disabled={!props.siteName || !props.apiKey || !props.apiSecret}
        >
          Submit
        </button>

        {/* reset */}
        <button
          type="button"
          className="btn btn-danger mt-3 ml-3"
          onClick={props.handleFormReset}
          disabled={!props.siteName || !props.apiKey || !props.apiSecret}
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}

export default Form;
