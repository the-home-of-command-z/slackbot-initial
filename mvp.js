const axios = require('axios')
const matt_auth = process.env.MATT_AUTH
const matt_url = process.env.MATT_URL
const turnLightOn = `${matt_url}/api/services/light/turn_on`
const turnLightOff = `${matt_url}/api/services/light/turn_off`
const lightswitchURL = `${matt_url}/api/states/light.living_room`
const authHeaders = {
  authorization: `Bearer ${matt_auth}`,
  'content-type': 'application/json'
}
const bodyLightId = { entity_id: 'light.living_room' }
const djangoURL = 'https://ahabot-registration.herokuapp.com/api'
const slackUserName = 'mattspeidel'
const slackUserHeader = {
  auth: `${slackUserName}`,
  'content-type': 'application/json'
}

// The code to turn the lights on
// axios.post(turnLightOn, bodyLightId, {
//   headers: authHeaders
// }
// )

// The code to turn the lights off
// axios.post(turnLightOff, bodyLightId, {
//   headers: authHeaders
// }
// )

// axios.get(lightswitchURL, {
//   headers: authHeaders
// }
// ).then(function (response) { console.log(response) })

// code to get
axios.get(djangoURL, {
  headers: slackUserHeader
}).then(function (response) {
  const userUrl = response.data[0].url
  const userToken = response.data[0].access_token
  const authHeaderInitial = {
    authorization: `Bearer ${userToken}`,
    'content-type': 'application/json'
  }
  axios.get(`https://${userUrl}/api/states/light.living_room`, {
    headers: authHeaderInitial
  }
  ).then(function (response) { console.log(response) })
})
