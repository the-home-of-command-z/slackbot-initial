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
// replace the following hard-coded value with classification
const bodyLightId = { entity_id: 'light.living_room' }
const bodySwitchId = { entity_id: 'switch.living_room' }

// Main bot function chain contained in here, triggered by event
slackEvents.on('message', async (event) => {
  const userInfoResponse = await getUserInfo(event)
  const userUrl = await userInfoResponse.data[0].url
  const authHeadersActual = await makeHeader(userInfoResponse)

  if (event.text.includes('test5')) {
    getStates(userUrl, authHeadersActual)
  }

  if (event.text.includes('light_status')) {
    checkLightStatus(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('light_on')) {
    turnLightOn(userUrl, authHeadersActual, bodyLightId, event)
  }
  if (event.text.includes('switch_status')) {
    checkSwitchStatus(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('switch_on')) {
    turnSwitchOn(userUrl, authHeadersActual, bodySwitchId, event)
  }
  if (event.text.includes('switch_off')) {
    turnSwitchOff(userURL, authHeadersActual, bodySwitchId, event)
  }
})

// this function issues a UnhandledPromiseRejectionWarning, but it works, can revisit later if time allows
async function getUserInfo (event) {
  const response = await axios.get(`https://slack.com/api/users.info?token=${appToken}&user=${event.user}&pretty=1`)
  const slackUserHeader = {
    auth: `${response.data.user.name}`,
    'content-type': 'application/json'
  }
  const response2 = await axios.get(djangoURL, {
    headers: slackUserHeader
  })
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
// listeners begin
async function checkLightStatus (userUrl, authHeadersActual, event) {
  const lightState = await axios.get(`https://${userUrl}/api/states/light.living_room`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is ${lightState.data.state}`
  })
}

async function turnLightOn (userUrl, authHeadersActual, bodyLightId, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightId, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.living_room`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now ${lightState.data.state}`
  })
}

async function checkSwitchStatus (userUrl, authHeadersActual, event) {
  const switchState = await axios.get(`https://${userUrl}/api/states/switch.living_room`, {
    header: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your switch is ${switchState.data.state}`
  })
}

async function turnSwitchOn (userUrl, authHeadersActual, bodySwitchId, event) {
  await axios.post(`https://${userUrl}/api/services/switch/turn_on`, bodySwitchId, {
    headers: authHeadersActual
  })
  const switchState = await axios.get(`https://${userUrl}/api/states/switch.living_room`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your switch is now ${switchState.data.state}`
  })
}

async function turnSwitchOff (userUrl, authHeadersActual, bodySwitchId, event) {
  await axios.post(`https://${userUrl}/api/services/switch/turn_off`, bodySwitchId, {
    headers: authHeadersActual
  })
  const switchState = await axios.get(`https://${userUrl}/api/states/switch.living_room`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your switch is now ${switchState.data.state}`
  })
}
// listeners end

async function getStatesInfo (userUrl, authHeadersActual) {
  const StatesInfo = await axios.get(`https://${userUrl}/api/states`, {
    headers: authHeadersActual
  })
  return StatesInfo
}

async function getStates (userUrl, authHeadersActual) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  console.log(statesData)
  const entityArray = []
  for (const entity of statesData.data) {
    if (entity.attributes.friendly_name && entity.state !== 'unknown') {
      entityArray.push(`Your ${entity.attributes.friendly_name} is ${entity.state}`)
    }
  }
  console.log(entityArray)
  return entityArray
}

(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port)

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`)
})()
