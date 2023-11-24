import React from "react";
import { useContext, useState } from "react";
import AuthContext from "./AuthContext.js";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toString();
}

function displayToken(token) {
  const L = token.length;
  return `${token.slice(0, 20)}...${token.slice(L - 20, L)}`;
}

function App() {
  const auth = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  console.log(auth);
  const tokenInfo = auth.tokenParsed;
  const refreshTokenInfo = auth.refreshTokenParsed;

  const getUserInfo = async () => {
    const userInfo = await auth.loadUserInfo().catch((err) => {
      auth.login();
    });
    console.log(userInfo);
    setUserInfo(userInfo);
  };

  return (
    <div>
      <h1>Experiments with Keycloak</h1>
      <p>
        <button onClick={auth.logout}>Logout</button>&nbsp;
        <button onClick={getUserInfo}>Get additional user info</button>
      </p>
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
            <td>{displayToken(auth.token)}</td>
          </tr>
          <tr>
            <td>Bearer token expires</td>
            <td>{formatTimestamp(tokenInfo.exp)}</td>
          </tr>
          <tr>
            <td>Refresh token expires</td>
            <td>{formatTimestamp(refreshTokenInfo.exp)}</td>
          </tr>
          {userInfo ? (
            <tr>
              <td>Unit membership</td>
              <td>
                {userInfo.unit.map((item) => (
                  <span key={item}>{item}&nbsp;</span>
                ))}
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
