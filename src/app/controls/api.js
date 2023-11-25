import axios from 'axios'

export const URL_BACKEND = 'https://studyfree.herokuapp.com/'

// Create Function to handle requests from the backend
export async function callToBackend (ENDPOINT, METHOD, DATA) {
  const options = {
    url: `${URL_BACKEND}${ENDPOINT}`,
    method: METHOD,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: DATA,
  }

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`
  const response = await axios(options)
  return response.data
}

export async function callToBackendForFiles (ENDPOINT, METHOD, DATA) {
  const options = {
    url: `${URL_BACKEND}${ENDPOINT}`,
    method: METHOD,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: DATA,
  }

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`
  const response = await axios(options)
  return response.data
}

// Then you make a call with the exact endpoint and method:
// const response = await this.callToBackend('createSetupIntent', 'POST');
// console.log(JSON.stringify(response));
