import React from "react";
import ReactDOM from "react-dom/client";
import Keycloak from "keycloak-js";
import App from "./App.jsx";
import AuthContext from "./AuthContext.js";

const keycloak = new Keycloak({
  url: "https://iam-int.ebrains.eu/auth",
  realm: "hbp",
  clientId: "adavison-test",
});

try {
  const authenticated = await keycloak.init({
    onLoad: "login-required",
  });
  console.log(
    `User is ${authenticated ? "authenticated" : "not authenticated"}`
  );
  if (authenticated) {
    console.log(keycloak.tokenParsed);
    console.log(keycloak.refreshTokenParsed);
    //console.log(keycloak.userInfo);
  }
} catch (error) {
  console.error("Failed to initialize adapter:", error);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext.Provider value={keycloak}>
      <App />
    </AuthContext.Provider>
  </React.StrictMode>
);
