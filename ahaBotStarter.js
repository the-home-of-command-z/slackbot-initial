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
// replace the following hard-coded values with classification
const bodyLightId = { entity_id: 'light.living_room' }
const bodyLightIdRed = { entity_id: 'light.living_room', rgb_color: [255, 0, 0] }
const bodyLightIdGreen = { entity_id: 'light.living_room', rgb_color: [0, 255, 0] }
const bodyLightIdBlue = { entity_id: 'light.living_room', rgb_color: [0, 0, 255] }
const bodyLightIdPolice = { entity_id: 'light.living_room', effect: 'Police' }
const bodyLightIdRandom = { entity_id: 'light.living_room', effect: 'Fast Random Loop' }
const bodyLightIdStop = { entity_id: 'light.living_room', effect: 'Stop' }
const bodyLightIdFullBright = { entity_id: 'light.living_room', brightness: 255 }
const bodyLightIdMedBright = { entity_id: 'light.living_room', brightness: 128 }
const bodyLightIdLowBright = { entity_id: 'light.living_room', brightness: 64 }

// Main bot function chain contained in here, triggered by event
slackEvents.on('message', async (event) => {
  const userInfoResponse = await getUserInfo(event)
  const userUrl = await userInfoResponse.data[0].url
  const authHeadersActual = await makeHeader(userInfoResponse)

  // listeners begin

  if (event.text.includes('test5')) {
    getStates(userUrl, authHeadersActual)
  }

  if (event.text.includes('light_status')) {
    checkLightStatus(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('light_on')) {
    turnLightOn(userUrl, authHeadersActual, bodyLightId, event)
  }
  if (event.text.includes('light_off')) {
    turnLightOff(userUrl, authHeadersActual, bodyLightId, event)
  }
  if (event.text.includes('light_red')) {
    turnLightRed(userUrl, authHeadersActual, bodyLightIdRed, event)
  }
  if (event.text.includes('light_green')) {
    turnLightGreen(userUrl, authHeadersActual, bodyLightIdGreen, event)
  }
  if (event.text.includes('light_blue')) {
    turnLightBlue(userUrl, authHeadersActual, bodyLightIdBlue, event)
  }
  if (event.text.includes('fuzz')) {
    turnLightPolice(userUrl, authHeadersActual, bodyLightIdPolice, event)
  }
  if (event.text.includes('trippy')) {
    turnLightRandom(userUrl, authHeadersActual, bodyLightIdRandom, event)
  }
  if (event.text.includes('light_stop')) {
    turnLightStop(userUrl, authHeadersActual, bodyLightIdStop, event)
  }
  if (event.text.includes('light_stop')) {
    turnLightFullBright(userUrl, authHeadersActual, bodyLightIdFullBright, event)
  }
  if (event.text.includes('light_stop')) {
    turnLightMedBright(userUrl, authHeadersActual, bodyLightIdMedBright, event)
  }
  if (event.text.includes('light_stop')) {
    turnLightLowBright(userUrl, authHeadersActual, bodyLightIdLowBright, event)
  }
})
// listeners end

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
async function turnLightOff (userUrl, authHeadersActual, bodyLightId, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_off`, bodyLightId, {
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
async function turnLightRed (userUrl, authHeadersActual, bodyLightIdRed, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdRed, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now red.`
  })
}
async function turnLightGreen (userUrl, authHeadersActual, bodyLightIdGreen, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdGreen, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now green.`
  })
}
async function turnLightBlue (userUrl, authHeadersActual, bodyLightIdBlue, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdBlue, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now blue.`
  })
}
async function turnLightPolice (userUrl, authHeadersActual, bodyLightIdPolice, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdPolice, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is displaying a police strobe effect.`
  })
}
async function turnLightRandom (userUrl, authHeadersActual, bodyLightIdRandom, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdRandom, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is displaying a random light loop.`
  })
}
async function turnLightStop (userUrl, authHeadersActual, bodyLightIdStop, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdStop, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light effect has stopped.`
  })
}
async function turnLightStop (userUrl, authHeadersActual, bodyLightIdStop, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdStop, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light effect has stopped.`
  })
}
async function turnLightFullBright (userUrl, authHeadersActual, bodyLightIdFullBright, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdFullBright, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now set to full brightness.`
  })
}
async function turnLightMedBright (userUrl, authHeadersActual, bodyLightIdMedBright, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdMedBright, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now set to medium brightness.`
  })
}
async function turnLightLowBright (userUrl, authHeadersActual, bodyLightIdLowBright, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdLowBright, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now set to low brightness.`
  })
}
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
