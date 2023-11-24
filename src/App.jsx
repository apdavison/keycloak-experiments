import React from "react";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toString();
}

function displayToken(token) {
  const L = token.length;
  return `${token.slice(0, 20)}...${token.slice(L - 20, L)}`;
}

function App(props) {
  console.log(props.auth);
  const tokenInfo = props.auth.tokenParsed;
  const refreshTokenInfo = props.auth.refreshTokenParsed;

  return (
    <div>
      <h1>Experiments with Keycloak</h1>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{tokenInfo.name}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{tokenInfo.preferred_username}</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>{tokenInfo.email}</td>
          </tr>
          <tr>
            <td>Scope(s)</td>
            <td>{tokenInfo.scope}</td>
          </tr>
          <tr>
            <td>Bearer token</td>
            <td>{displayToken(props.auth.token)}</td>
          </tr>
          <tr>
            <td>Bearer token expires</td>
            <td>{formatTimestamp(tokenInfo.exp)}</td>
          </tr>
          <tr>
            <td>Refresh token expires</td>
            <td>{formatTimestamp(refreshTokenInfo.exp)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
