import Keycloak from "keycloak-js";

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
} catch (error) {
  console.error("Failed to initialize adapter:", error);
}
