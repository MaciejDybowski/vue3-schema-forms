// @ts-nocheck
import axios from 'axios';








export async function fetchToken(workspaceId: string) {
  const url = '/auth/realms/aurea/protocol/openid-connect/token';
  const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;
  const username = import.meta.env.VITE_KEYCLOAK_USERNAME;
  const password = import.meta.env.VITE_KEYCLOAK_PASSWORD;

  const response = await axios({
    method: 'POST',
    url: url,
    data: {
      client_id: clientId,
      client_secret: '',
      grant_type: 'password',
      username: username,
      password: password,
    },
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });
  let token = response.data.access_token;

  axios.defaults.headers.common['Workspace-Id'] = workspaceId;
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
}
