import axios from 'axios';




// TODO - hide creds


export async function fetchToken(workspaceId: string) {
  const url = '/auth/realms/aurea/protocol/openid-connect/token';
  const clientId = 'public';
  const clientSecret = '';

  const response = await axios({
    method: 'POST',
    url: url,
    data: {
      client_id: clientId,
      client_secret: '',
      grant_type: 'password',
      username: 'tecna',
      password: 'tecna1',
    },
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });
  let token = response.data.access_token;


  axios.defaults.headers.common['Workspace-Id'] = workspaceId;
  axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
}
