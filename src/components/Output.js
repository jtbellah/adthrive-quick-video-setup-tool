import React from "react";

function Output(props) {
  return (
    <ul className="list-group col-6">
      <div id="outputCard" className="card-body">
        <li className="list-group-item">
          <strong>API Key:</strong>&nbsp;
          <code>{props.apiKey ? props.apiKey : ""}</code>
        </li>
        <li className="list-group-item">
          <strong>API Secret:</strong>&nbsp;
          <code>{props.apiSecret ? props.apiSecret : ""}</code>
        </li>
        <li className="list-group-item">
          <strong>Playlist ID:</strong>&nbsp;
          <code>{props.playlistID ? props.playlistID : ""}</code>
        </li>
        <li className="list-group-item">
          <strong>In-Post Player ID:</strong>&nbsp;
          <code>{props.inPostID ? props.inPostID : ""}</code>
        </li>
        <li className="list-group-item">
          <strong>Collapsible Player ID:</strong>&nbsp;
          <code>{props.collapsibleID ? props.collapsibleID : ""}</code>
        </li>
      </div>
    </ul>
  );
}

export default Output;
