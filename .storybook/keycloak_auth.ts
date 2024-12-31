import axios from "axios";

export async function fetchToken(workspaceId: string) {
  const url = "https://dev-bm.int.tecna.pl/auth/realms/aurea/protocol/openid-connect/token"
  const clientId = "aurea-web"
  const clientSecret = "SYFeLlkspcQ2XTqWCaU0MlIRQHAdO885"

  const response = await axios({
    method: 'POST',
    url: url,
    data: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    },
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  })
  let token = response.data.access_token

  axios.defaults.headers.common['Workspace-Id'] = workspaceId;
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;

}
