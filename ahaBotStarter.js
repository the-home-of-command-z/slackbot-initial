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
var ifLight = ' if you connect supported smart lighting to Home Assistant.'
var ifSwitch = ' if you connect supported smart plugs or outlets to Home Assistant.'
var ifTherm = ' if you connect supported smart thermostats to Home Assistant.'
var ifMedia = ' if you connect supported media players to Home Assistant.'
// replace the following hard-coded values with classification
const bodyLightId = { entity_id: 'light.living_room' }
const bodySwitchId = { entity_id: 'switch.living_room' }
const bodyLightIdRed = { entity_id: 'light.living_room', rgb_color: [255, 0, 0] }
const bodyLightIdGreen = { entity_id: 'light.living_room', rgb_color: [0, 255, 0] }
const bodyLightIdBlue = { entity_id: 'light.living_room', rgb_color: [0, 0, 255] }
const bodyLightIdWhite = { entity_id: 'light.living_room', rgb_color: [255, 255, 255] }
const bodyLightIdPolice = { entity_id: 'light.living_room', effect: 'Police' }
const bodyLightIdRandom = { entity_id: 'light.living_room', effect: 'Fast Random Loop' }
const bodyLightIdStop = { entity_id: 'light.living_room', effect: 'Stop' }
const bodyLightIdFullBright = { entity_id: 'light.living_room', brightness: 255 }
const bodyLightIdMedBright = { entity_id: 'light.living_room', brightness: 128 }
const bodyLightIdLowBright = { entity_id: 'light.living_room', brightness: 64 }
const bodyMediaPlayerId = { entity_id: 'media_player.bedroom_display' }
const bodyClimateId = { entity_id: 'climate'}

// Main bot function chain contained in here, triggered by event
slackEvents.on('message', async (event) => {
  console.log('anything I want')
  const userInfoResponse = await getUserInfo(event)
  const userUrl = await userInfoResponse.data[0].url
  const authHeadersActual = await makeHeader(userInfoResponse)
  // natural.BayesClassifier.load('simpleClassifierAction.json', null, function(err, classifier) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   web.chat.postMessage({
  //     channel: event.channel,
  //     icon_emoji: ':hypnotoad:',
  //     text: classifier.classify(event.text)
  //   })
  // })
  
  
  // listeners begin
  if (event.text.includes('living room') || event.text.includes('livingroom')) {
    web.chat.postMessage({
      channel: event.channel,
      text: `Stuff works, yo!`
    })
  }
  if (event.text.includes('how_home')) {
    getStates(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('what_on')) {
    getOnStates(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('what_off')) {
    getOffStates(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('what_devices')) {
    whatDevices(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('what_lights')) {
    whatLights(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('what_switches')) {
    whatSwitches(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('what_therm')) {
    whatTherm(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('what_media')) {
    whatMedia(userUrl, authHeadersActual, event)
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
  if (event.text.includes('light_full')) {
    turnLightFullBright(userUrl, authHeadersActual, bodyLightIdFullBright, event)
  }
  if (event.text.includes('light_medium')) {
    turnLightMedBright(userUrl, authHeadersActual, bodyLightIdMedBright, event)
  }
  if (event.text.includes('light_low')) {
    turnLightLowBright(userUrl, authHeadersActual, bodyLightIdLowBright, event)
  }
  if (event.text.includes('media_status')) {
    checkMediaStatus(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('media_play')) {
    turnMediaPlay(userUrl, authHeadersActual, bodyMediaPlayerId, event)
  }
  if (event.text.includes('media_pause')) {
    turnMediaPause(userUrl, authHeadersActual, bodyMediaPlayerId, event)
  }
  if (event.text.includes('media_stop')) {
    turnMediaStop(userUrl, authHeadersActual, bodyMediaPlayerId, event)
  }
  if (event.text.includes('volume_mute')) {
    turnMediaMute(userUrl, authHeadersActual, bodyMediaPlayerId, event)
  }
  if (event.text.includes('volume_up')) {
    turnMediaUp(userUrl, authHeadersActual, bodyMediaPlayerId, event)
  }
  if (event.text.includes('volume_down')) {
    turnMediaDown(userUrl, authHeadersActual, bodyMediaPlayerId, event)
  }
  if (event.text.includes('climate_status')) {
    checkClimateStatus(userUrl, authHeadersActual, bodyClimateId, event)
  }
  if (event.text.includes('temperature_up')) {
    turnClimateUp(userUrl, authHeadersActual, bodyClimateId, event)
  }
  if (event.text.includes('tempearture_down')) {
    turnClimateDown(userUrl, authHeadersActual, bodyClimateId, event)
  }
  if (event.text.includes('light_white')) {
    turnLightWhite(userUrl, authHeadersActual, bodyLightIdWhite, event)
  }
  if (event.text.includes('fuel_status')) {
    checkFuelStatus(userUrl, authHeadersActual, event)
  }
  if (event.text.includes('car_range')) {
    checkCarRange(userUrl, authHeadersActual, event)
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

async function checkSwitchStatus (userUrl, authHeadersActual, event) {
  const switchState = await axios.get(`https://${userUrl}/api/states/switch.living_room`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your switch is ${switchState.data.state}`
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
    text: `Your light is now set to low brightness.`  })
}
async function checkMediaStatus (userUrl, authHeadersActual, event) {
  const media_playerState = await axios.get(`https://${userUrl}/api/states/media_player.bedroom_display`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your media player is ${media_playerState.data.state}`
  })
}
async function turnMediaPlay (userUrl, authHeadersActual, bodyMediaPlayerId, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/media_play`, bodyMediaPlayerId, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your media player is now playing`
  })
}
async function turnMediaPause (userUrl, authHeadersActual, bodyMediaPlayerId, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/media_pause`, bodyMediaPlayerId, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your media player is now paused`
  })
}
async function turnMediaStop (userUrl, authHeadersActual, bodyMediaPlayerId, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/media_stop`, bodyMediaPlayerId, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your media player is now stopped`
  })
}
async function turnMediaUp (userUrl, authHeadersActual, bodyMediaPlayerId, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/volume_up`, bodyMediaPlayerId, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your media player volume was raised`
  })
}
async function turnMediaDown (userUrl, authHeadersActual, bodyMediaPlayerId, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/volume_down`, bodyMediaPlayerId, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your media player volume was lowered`
  })
}
async function turnMediaMute (userUrl, authHeadersActual, bodyMediaPlayerId, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/volume_mute`, bodyMediaPlayerId, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your media player was muted`
  })
}
async function checkClimateStatus (userUrl, authHeadersActual, event) {
  let climateState = await axios.get(`https://${userUrl}/api/states/climate`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your temperature is ${climateState.data.temperature}`
  })
}

async function turnClimateUp (userURL, authHeadersActual, event) {
  let climateState = await axios.get(`https://${userURL}/api/states/climate`, {
    headers: authHeadersActual
  })
  let currentTemp = climateState.data.temperature
  currentTemp += 1
  const sendTemp = {tempearture: `${currentTemp}`}
  await axios.post(`https://${userURL}/api/services/climate.set_temperature`, sendTemp, {
    headers: authHeadersActual
  })
  let climateState = await axios.get(`https://${userURL}/api/states/climate`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your temperature is now set to ${climateState.data.temperature}`
  })
}
async function turnClimateDown (userURL, authHeadersActual, event) {
  let climateState = await axios.get(`https://${userURL}/api/states/climate`, {
    headers: authHeadersActual
  })
  let currentTemp = climateState.data.tempearture
  currentTemp -= 1
  const sendTemp = {temperature: `${currentTemp}`}
  await axios.post(`https://${userURL}/api/services/climate.set_temperature`, sendTemp, {
    headers: authHeadersActual
  })
  let climateState = await axios.get(`https://${userURL}/api/states/climate`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your temperature is now set to ${climateState.data.temperature}`
  })
}

async function getStatesInfo (userUrl, authHeadersActual) {
  const StatesInfo = await axios.get(`https://${userUrl}/api/states`, {
    headers: authHeadersActual
  })
  return StatesInfo
}

async function getOnStates (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  const entityArray = []
  for (const entity of statesData.data) {
    if (entity.attributes.friendly_name && entity.state === 'on') {
      entityArray.push({"color": "#2fcc1b",
      "text": `Your ${entity.attributes.friendly_name} is ${entity.state}`
    })
    }
  }
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Here are your devices that are switched on!`, 
    attachments: entityArray})
  return entityArray
}

async function getOffStates (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  const entityArray = []
  for (const entity of statesData.data) {
    if (entity.attributes.friendly_name && entity.state === 'off') {
      entityArray.push({"color": "#c21913",
      "text": `Your ${entity.attributes.friendly_name} is ${entity.state}`
    })
    }
  }
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Here are your devices that are switched off!`, 
    attachments: entityArray})
  return entityArray
}

async function getStates (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  const entityArray = []
  for (const entity of statesData.data) {
    if (entity.attributes.friendly_name && entity.state !== 'unknown') {
      if(entity.state === 'on'){
      entityArray.push({"color": "#2fcc1b",
        "text": `Your ${entity.attributes.friendly_name} is ${entity.state}`
      })
    }
    else if(entity.state === 'off'){
      entityArray.push({"color": "#c21913",
        "text": `Your ${entity.attributes.friendly_name} is ${entity.state}`
      })
    }
    else {
      entityArray.push({"color": "#2413c2",
        "text": `Your ${entity.attributes.friendly_name} is ${entity.state}`
      })
    }
    }
  }
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Here is the current state of your home and all connected devices:`, 
    attachments: entityArray})
  return entityArray
}

async function whatDevices (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  console.log(statesData)
  const entityArray = []
  for (const entity of statesData.data) {
    entityArray.push(entity.entity_id)
  }
  const lightResult = entityArray.filter(s => s.includes('light.'))
  const switchResult = entityArray.filter(s => s.includes('switch.'))
  const thermResult = entityArray.filter(s => s.includes('climate.'))
  const mediaResult = entityArray.filter(s => s.includes('media_player.'))
  if (typeof lightResult[0] === 'string') {
    ifLight = '!'
  }
  if (typeof switchResult[0] === 'string') {
    ifSwitch = '!'
  }
  if (typeof thermResult[0] === 'string') {
    ifTherm = '!'
  }
  if (typeof mediaResult[0] === 'string') {
    ifMedia = '!'
  }
  console.log(entityArray)
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `I can control your smart lighting${ifLight}\nI can control your smart plugs and outlets${ifSwitch}\nI can control your thermostat${ifTherm}\nI can control your smart media player(s)${ifMedia}`
  })
}

async function whatLights (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  console.log(statesData)
  const entityArray = []
  let entityString = ''
  for (const entity of statesData.data) {
    if (entity.entity_id.includes('light.')) {
      entityArray.push(entity.attributes.friendly_name)
    }
  }
  for (const light of entityArray) {
    entityString += `${light}, `
  }
  entityString = entityString.slice(0, -2)
  web.chat.postMessage({
    channel: event.channel,
    // icon_emoji: ':cat:',
    text: `These are the following connected lights available to control: ${entityString}`
  })
}

async function whatSwitches (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  console.log(statesData)
  const entityArray = []
  let entityString = ''
  for (const entity of statesData.data) {
    if (entity.entity_id.includes('switch.')) {
      entityArray.push(entity.attributes.friendly_name)
    }
  }
  for (const plug of entityArray) {
    entityString += `${plug}, `
  }
  entityString = entityString.slice(0, -2)
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `These are the following connected smart plugs (or outlets) available to control: ${entityString}`
  })
}

async function whatTherm (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  console.log(statesData)
  const entityArray = []
  let entityString = ''
  for (const entity of statesData.data) {
    if (entity.entity_id.includes('climate.')) {
      entityArray.push(entity.attributes.friendly_name)
    }
  }
  for (const climate of entityArray) {
    entityString += `${climate}, `
  }
  entityString = entityString.slice(0, -2)
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `These are the following connected thermostats available to control: ${entityString}`
  })
}

async function whatMedia (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  console.log(statesData)
  const entityArray = []
  let entityString = ''
  for (const entity of statesData.data) {
    if (entity.entity_id.includes('media_player.')) {
      entityArray.push(entity.attributes.friendly_name)
    }
  }
  for (const media of entityArray) {
    entityString += `${media}, `
  }
  entityString = entityString.slice(0, -2)
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `These are the following connected media players available to control: ${entityString}`
  })
}

// Turn Light White
async function turnLightWhite (userUrl, authHeadersActual, bodyLightIdWhite, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, bodyLightIdWhite, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is now white.`
  })
}

// Check Fuel Percentage Remaining
async function checkFuelStatus (userUrl, authHeadersActual, event) {
  const fuelState = await axios.get(`https://${userUrl}/api/states/sensor.dmb8668_fuel_level`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your fuel percentage remaining is ${fuelState.data.state}%.`
  })
}

// Check Vehicle Range Remaining (in km)
async function checkCarRange (userUrl, authHeadersActual, event) {
  const rangeState = await axios.get(`https://${userUrl}/api/states/sensor.dmb8668_range`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
      channel: event.channel,
      icon_emoji: ':cat:',
      text: `Your vehicle range left in kilometers is ${rangeState.data.state}.`
  })
}

(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port)

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`)
})()
