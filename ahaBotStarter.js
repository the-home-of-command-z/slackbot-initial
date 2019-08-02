const { createEventAdapter } = require('@slack/events-api')
const { WebClient, ErrorCode } = require('@slack/web-api')
const natural = require('natural')
const axios = require('axios')

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackEvents = createEventAdapter(slackSigningSecret)
const web = new WebClient(process.env.SLACK_TOKEN)
const currentTime = new Date().toTimeString()
const djangoURL = 'https://ahabot-registration.herokuapp.com/api'
const port = process.env.PORT || 3000
const appToken = process.env.AHABOT_TOKEN
// replace the following hard-coded value
const bodyLightId = { entity_id: 'light.living_room' }

// Main bot function chain contained in here, triggered by event
slackEvents.on('message', async (event) => {
//   console.log(event.user)
//   console.log(appToken)
  const userInfoResponse = await getUserInfo(event)
  //   console.log(userInfoResponse)
  const userUrl = await userInfoResponse.data[0].url
  const authHeadersActual = await makeHeader(userInfoResponse)

  if (event.text.includes('light_status')) {
    checkLightStatus(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('light_on')) {
    turnLightOn(userUrl, authHeadersActual, bodyLightId, event)
  }
})

// this function issues a UnhandledPromiseRejectionWarning, but it works, can revisit later if time allows
async function getUserInfo (event) {
  const response = await axios.get(`https://slack.com/api/users.info?token=${appToken}&user=${event.user}&pretty=1`)
  const slackUserHeader = await {
    auth: `${response.data.user.name}`,
    'content-type': 'application/json'
  }
  //   console.log('test2')
  const response2 = await axios.get(djangoURL, {
    headers: slackUserHeader
  })
  //   console.log(response)
  return response2
}

function makeHeader (userInfoResponse) {
  const userToken = userInfoResponse.data[0].access_token
  const authHeadersActual = {
    authorization: `Bearer ${userToken}`,
    'content-type': 'application/json'
  }
  return authHeadersActual
}

async function checkLightStatus (userUrl, authHeadersActual, event) {
  const lightState = await axios.get(`https://${userUrl}/api/states/light.living_room`, {
    headers: authHeadersActual
  })

  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is  ${lightState.data.state}`
  })
//   console.log(lightState.data.state)
}

async function turnLightOn (userUrl, authHeadersActual, bodyLightId, event) {
  const lightState = await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightId, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now ${lightState.data.state}`
  })
}

(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port)

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`)
})()
