import React from 'react';

const Output = props => {
  const {
    apiKey,
    apiSecret,
    inPostID,
    playlistID,
    collapsibleID,
    importTotal,
    importing,
  } = props;

  return (
    <ul className="list-group col-6">
      <div id="outputCard" className="card-body">
        <li className="list-group-item">
          <strong>API Key:</strong>&nbsp;
          <code>{apiKey || ''}</code>
        </li>
        <li className="list-group-item">
          <strong>API Secret:</strong>&nbsp;
          <code>{apiSecret || ''}</code>
        </li>
        <li className="list-group-item">
          <strong>In-Post Player ID:</strong>&nbsp;
          <code>{inPostID || ''}</code>
        </li>
        <li className="list-group-item">
          <strong>Playlist ID:</strong>&nbsp;
          <code>{playlistID || ''}</code>
        </li>
        <li className="list-group-item">
          <strong>Collapsible Player ID:</strong>&nbsp;
          <code>{collapsibleID || ''}</code>
        </li>
        <li className="list-group-item">
          {importing ? (
            <>
              <div
                className="spinner-border spinner-border-sm text-success"
                role="status"
              ></div>
              <strong>&nbsp;Importing...<br />This may take a few minutes. Please leave the window open.</strong>
            </>
          ) : (
            <strong>Total Videos Imported:</strong>
          )}
          {importTotal && <div>🎉 {importTotal} videos imported</div>}
        </li>
      </div>
    </ul>
  );
};

export default Output;
