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
var instance = 'living_room'
var friendlyRoom = []
var rawRoom = []
var roomDict = {}


// Main bot function chain contained in here, triggered by event
slackEvents.on('app_mention', async (event) => {
  console.log('anything I want')
  const userInfoResponse = await getUserInfo(event)
  if (!userInfoResponse.data[0]){
    web.chat.postMessage({
      channel: event.channel,
      text: `It looks like you haven't registered with us yet. Head on over to http://ahabot-registration.herokuapp.com/ to get started!`
    })
  }
  else {
  let userUrl = await userInfoResponse.data[0].url
    if (userUrl.includes('https')) {
      userUrl = userUrl.slice(8)
    }
  const authHeadersActual = await makeHeader(userInfoResponse)
  let actionClass
  const allRooms = await getRooms()
  for (item of allRooms) {
    if (event.text.includes(item[0]) || event.text.includes(item[1])) {
      instance = item[0]
    }
  }
  // if (event.text.includes(friendlyRoom[0]) || event.text.includes(rawRoom[0])) {
  //   instance = rawRoom[0]
  // }
  // if (event.text.includes(friendlyRoom[1]) || event.text.includes(rawRoom[1])) {
  //   instance = rawRoom[1]
  // }
  // if (event.text.includes(friendlyRoom[2]) || event.text.includes(rawRoom[2])) {
  //   instance = rawRoom[2]
  // }
  // if (event.text.includes(friendlyRoom[3]) || event.text.includes(rawRoom[3])) {
  //   instance = rawRoom[3]
  // }
  // if (event.text.includes(friendlyRoom[4]) || event.text.includes(rawRoom[4])) {
  //   instance = rawRoom[4]
  // }
  // if (event.text.includes(friendlyRoom[5]) || event.text.includes(rawRoom[5])) {
  //   instance = rawRoom[5]
  // }
  // if (event.text.includes(friendlyRoom[6]) || event.text.includes(rawRoom[6])) {
  //   instance = rawRoom[6]
  // }
  // if (event.text.includes(friendlyRoom[7]) || event.text.includes(rawRoom[7])) {
  //   instance = rawRoom[7]
  // }
  // if (event.text.includes(friendlyRoom[8]) || event.text.includes(rawRoom[8])) {
  //   instance = rawRoom[8]
  // }
  // if (event.text.includes(friendlyRoom[9]) || event.text.includes(rawRoom[9])) {
  //   instance = rawRoom[9]
  // }
  if (await explicitCommand(event, authHeadersActual, userUrl) === false){
  natural.LogisticRegressionClassifier.load('classifierActionTest2.json', null, function (err, classifier) {
    if (err) {
      console.log(err)
    }
  
  if (classifier.getClassifications(event.text)[0].value > .95){
      actionClass = classifier.getClassifications(event.text)[0].label    
  
  // listeners begin
  
  if (actionClass === 'how_home') {
    getStates(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'what_on') {
    getOnStates(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'what_off') {
    getOffStates(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'what_devices') {
    whatDevices(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'what_lights') {
    whatLights(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'what_switches') {
    whatSwitches(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'what_therm') {
    whatTherm(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'what_media') {
    whatMedia(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_status') {
    checkLightStatus(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_on') {
    turnLightOn(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_off') {
    turnLightOff(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_red') {
    turnLightRed(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_green') {
    turnLightGreen(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_blue') {
    turnLightBlue(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_white') {
    turnLightWhite(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_up') {
    turnLightUp(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_down') {
    turnLightDown(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_full') {
    turnLightFullBright(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_medium') {
    turnLightMedBright(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'light_low') {
    turnLightLowBright(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'switch_status') {
    checkSwitchStatus(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'switch_on') {
    turnSwitchOn(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'switch_off') {
    turnSwitchOff(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'media_status') {
    checkMediaStatus(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'media_play') {
    turnMediaPlay(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'media_pause') {
    turnMediaPause(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'media_stop') {
    turnMediaStop(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'volume_mute') {
    turnMediaMute(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'volume_up') {
    turnMediaUp(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'volume_down') {
    turnMediaDown(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'climate_status') {
    checkClimateStatus(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'temperature_up') {
    turnClimateUp(userUrl, authHeadersActual, event)
  }
  if (actionClass === 'tempearture_down') {
    turnClimateDown(userUrl, authHeadersActual, event)
  }
}
  else {
    web.chat.postMessage({
        channel: event.channel,
        text: `I'm not totally sure what you want when you say "${event.text}" can you try rephrasing your request?`
      })
    }
  })
}
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

async function explicitCommand (event, authHeadersActual, userUrl){
  if (event.text.includes('help')) {
    getHelp(event)
    return true
  }
  if (event.text.includes('how_home')) {
    getStates(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('what_on')) {
    getOnStates(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('what_off')) {
    getOffStates(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('what_devices')) {
    whatDevices(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('what_lights')) {
    whatLights(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('what_switches')) {
    whatSwitches(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('what_therm')) {
    whatTherm(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('what_media')) {
    whatMedia(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_status')) {
    checkLightStatus(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_on')) {
    turnLightOn(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_off')) {
    turnLightOff(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_red')) {
    turnLightRed(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_green')) {
    turnLightGreen(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_blue')) {
    turnLightBlue(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_white')) {
    turnLightWhite(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_full')) {
    turnLightFullBright(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_medium')) {
    turnLightMedBright(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_low')) {
    turnLightLowBright(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_up')) {
    turnLightUp(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_down')) {
    turnLightDown(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('fuzz')) {
    turnLightPolice(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('trippy')) {
    turnLightRandom(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('light_stop')) {
    turnLightStop(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('switch_status')) {
    checkSwitchStatus(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('switch_on')) {
    turnSwitchOn(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('switch_off')) {
    turnSwitchOff(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('media_status')) {
    checkMediaStatus(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('media_play')) {
    turnMediaPlay(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('media_pause')) {
    turnMediaPause(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('media_stop')) {
    turnMediaStop(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('volume_mute')) {
    turnMediaMute(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('volume_up')) {
    turnMediaUp(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('volume_down')) {
    turnMediaDown(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('climate_status')) {
    checkClimateStatus(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('temperature_up')) {
    turnClimateUp(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('tempearture_down')) {
    turnClimateDown(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('fuel_status')) {
    checkFuelStatus(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('car_range')) {
    checkCarRange(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('update_reg')) {
    updateReg(event)
    return true
  }
  if (event.text.includes('rickroll')) {
    rickRoll(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('themesong')) {
    themeSong(userUrl, authHeadersActual, event)
    return true
  }
  if (event.text.includes('hey there')) {
    greeting(event)
    return true
  }
  return false
}

async function checkLightStatus (userUrl, authHeadersActual, event) {
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is *${lightState.data.state}*`
  })
}

async function turnLightOn (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}` }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now *${lightState.data.state}* :bulb:`
  })
}

async function checkSwitchStatus (userUrl, authHeadersActual, event) {
  const switchState = await axios.get(`https://${userUrl}/api/states/switch.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${switchState.data.attributes.friendly_name} switch* is *${switchState.data.state}*`
  })
}
async function turnLightOff (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_off`, { entity_id: `light.${instance}` }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now *${lightState.data.state}*`
  })
}
async function turnLightRed (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, rgb_color: [255, 0, 0] }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now *red*.`
  })
}
async function turnLightGreen (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, rgb_color: [0, 255, 0] }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now *green*.`
  })
}

async function turnSwitchOn (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/switch/turn_on`, { entity_id: `switch.${instance}` }, {
    headers: authHeadersActual
  })
  const switchState = await axios.get(`https://${userUrl}/api/states/switch.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${switchState.data.attributes.friendly_name} switch* is now *${switchState.data.state}* :electric_plug:`
  })
}
async function turnLightBlue (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, rgb_color: [0, 0, 255] }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now *blue*.`
  })
}
async function turnLightPolice (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, effect: 'Police' }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is calling the cops! Hide the stuff! :rotating_light:`
  })
}

async function turnSwitchOff (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/switch/turn_off`, { entity_id: `switch.${instance}` }, {
    headers: authHeadersActual
  })
  const switchState = await axios.get(`https://${userUrl}/api/states/switch.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${switchState.data.attributes.friendly_name} switch* is now *${switchState.data.state}*`
  })
}
async function turnLightRandom (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, effect: 'Fast Random Loop' }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is going freaking nuts. :rocket: :boom:`
  })
}
async function turnLightStop (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, effect: 'Stop' }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* effect has stopped.`
  })
}

async function turnLightFullBright (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, brightness: 255 }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now set to *full* brightness.`
  })
}
async function turnLightMedBright (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, brightness: 128 }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now set to *medium* brightness.`
  })
}
async function turnLightLowBright (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, brightness: 64 }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now set to *low* brightness.`  })
}

async function checkMediaStatus (userUrl, authHeadersActual, event) {
  const media_playerState = await axios.get(`https://${userUrl}/api/states/media_player.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player is *${media_playerState.data.state}*`
  })
}

async function turnMediaPlay (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/media_play`, { entity_id: `media_player.${instance}` }, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player is now *playing*`
  })
}
async function turnMediaPause (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/media_pause`, { entity_id: `media_player.${instance}` }, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player is now *paused*`
  })
}
async function turnMediaStop (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/media_stop`, { entity_id: `media_player.${instance}` }, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player is now *stopped*`
  })
}
async function turnMediaUp (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/volume_up`, { entity_id: `media_player.${instance}` }, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player volume was *raised*`
  })
}
async function turnMediaDown (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/volume_down`, { entity_id: `media_player.${instance}` }, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player volume was *lowered*`
  })
}
async function turnMediaMute (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_player/volume_mute`, { entity_id: `media_player.${instance}` }, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player was *muted*`
  })
}
async function checkClimateStatus (userUrl, authHeadersActual, event) {
  let climateState = await axios.get(`https://${userUrl}/api/states/climate.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your temperature is *${climateState.data.temperature}*`
  })
}

async function turnClimateUp (userURL, authHeadersActual, event) {
  let climateState = await axios.get(`https://${userURL}/api/states/climate.${instance}`, { entity_id: `climate.${instance}` }, {
    headers: authHeadersActual
  })
  let currentTemp = climateState.data.temperature
  currentTemp += 1
  const sendTemp = {tempearture: `${currentTemp}`}
  await axios.post(`https://${userURL}/api/services/climate.set_temperature`, sendTemp, {
    headers: authHeadersActual
  })
  let climateState = await axios.get(`https://${userURL}/api/states/climate.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your temperature is now set to *${climateState.data.temperature}* :fire:`
  })
}
async function turnClimateDown (userURL, authHeadersActual, event) {
  let climateState = await axios.get(`https://${userURL}/api/states/climate.${instance}`, { entity_id: `climate.${instance}` }, {
    headers: authHeadersActual
  })
  let currentTemp = climateState.data.tempearture
  currentTemp -= 1
  const sendTemp = {temperature: `${currentTemp}`}
  await axios.post(`https://${userURL}/api/services/climate.set_temperature`, sendTemp, {
    headers: authHeadersActual
  })
  let climateState = await axios.get(`https://${userURL}/api/states/climate.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your temperature is now set to *${climateState.data.temperature}* :snowflake:`
  })
}
async function turnLightUp (userUrl, authHeadersActual, event) {
  let lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  let currentBrightness = lightState.data.attributes.brightness
  currentBrightness += 50
  const sendBrightness = {brightness: `${currentBrightness}`}
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, sendBrightness, {
    headers: authHeadersActual
  })
  lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light's* brightness was increased by *20%*`
  })
}
async function turnLightDown (userUrl, authHeadersActual, event) {
  let lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  let currentBrightness = lightState.data.attributes.brightness
  currentBrightness -= 50
  const sendBrightness = {brightness: `${currentBrightness}`}
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, sendBrightness, {
    headers: authHeadersActual
  })
  lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light's* brightness was decreased by *20%*`
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
      "text": `Your *${entity.attributes.friendly_name}* is *${entity.state}*`
    })
    }
  }
  web.chat.postMessage({
    channel: event.channel,
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
      "text": `Your *${entity.attributes.friendly_name}* is *${entity.state}*`
    })
    }
  }
  web.chat.postMessage({
    channel: event.channel,
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
        "text": `Your *${entity.attributes.friendly_name}* is *${entity.state}*`
      })
    }
    else if(entity.state === 'off'){
      entityArray.push({"color": "#c21913",
        "text": `Your *${entity.attributes.friendly_name}* is *${entity.state}*`
      })
    }
    else {
      entityArray.push({"color": "#2413c2",
        "text": `Your *${entity.attributes.friendly_name}* is *${entity.state}*`
      })
    }
    }
  }
  web.chat.postMessage({
    channel: event.channel,
    text: `Here is the current state of your home and all connected devices:`, 
    attachments: entityArray})
  return entityArray
}

async function whatDevices (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
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
  web.chat.postMessage({
    channel: event.channel,
    text: `I can control your *smart lighting*${ifLight}\nI can control your *smart plugs and outlets*${ifSwitch}\nI can control your *thermostat*${ifTherm}\nI can control your *smart media player(s)*${ifMedia}`
  })
}

async function whatLights (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
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
    text: `These are the following connected lights available to control: *${entityString}*`
  })
}

async function whatSwitches (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
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
    text: `These are the following connected smart plugs (or outlets) available to control: *${entityString}*`
  })
}

async function whatTherm (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
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
    text: `These are the following connected thermostats available to control: *${entityString}*`
  })
}

async function whatMedia (userUrl, authHeadersActual, event) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
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
    text: `These are the following connected media players available to control: *${entityString}*`
  })
}

// Turn Light White
async function turnLightWhite (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/light/turn_on`, { entity_id: `light.${instance}`, rgb_color: [255, 255, 255] }, {
    headers: authHeadersActual
  })
  const lightState = await axios.get(`https://${userUrl}/api/states/light.${instance}`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your *${lightState.data.attributes.friendly_name} light* is now *white*.`
  })
}

// Check Fuel Percentage Remaining
async function checkFuelStatus (userUrl, authHeadersActual, event) {
  const fuelState = await axios.get(`https://${userUrl}/api/states/sensor.dmb8668_fuel_level`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your fuel percentage remaining is *${fuelState.data.state}%*.`
  })
}

// Check Vehicle Range Remaining (in miles)
async function checkCarRange (userUrl, authHeadersActual, event) {
  const rangeState = await axios.get(`https://${userUrl}/api/states/sensor.dmb8668_range`, {
    headers: authHeadersActual
  })
  const rangeStateMiles = parseInt(rangeState.data.state) * (0.621371)
  web.chat.postMessage({
    channel: event.channel,
    text: `Your vehicle range left is *${rangeStateMiles} miles*.`
  })
}

async function getHelp (event) {
  web.chat.postMessage({
    channel: event.channel,
    text: 'Hi there!\nIt seems you are trying to get assistance.\n*For a list of commands that AHAbot can accept, please visit* https://ahabot-registration.herokuapp.com/help/'
  })
}
async function updateReg (event) {
  web.chat.postMessage({
    channel: event.channel,
    text: 'Hello there!\nIf you need to update your Home Assistant registration, click https://ahabot-registration.herokuapp.com/ and then click the link labeled Update Registration to update your URL and access token.'
  })
}
async function rickRoll (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_extractor/play_media`, {entity_id: "media_player.bedroom_display",
  media_content_id: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
 media_content_type: "video/mp4"}, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player is now *rolling* hard with *Rick!*`
  })
}
async function themeSong (userUrl, authHeadersActual, event) {
  await axios.post(`https://${userUrl}/api/services/media_extractor/play_media`, {entity_id: "media_player.bedroom_display",
  media_content_id: "https://www.youtube.com/watch?v=djV11Xbc914",
 media_content_type: "video/mp4"}, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    text: `Your media player is now playing my *Theme Song!*`
  })
}
async function greeting (event) {
  web.chat.postMessage({
    channel: event.channel,
    text: 'Hey! :wave: I’m Aha Bot, I can help you regain control of your home when you’re away. I can recognize a lot of natural language commands but if you ever want me to do something and I can’t figure it out, just visit https://ahabot-registration.herokuapp.com/help/'
  })
}
async function getRooms (userUrl, authHeadersActual) {
  const statesData = await getStatesInfo(userUrl, authHeadersActual)
  for (const entity of statesData.data) {
    if (entity.entity_id.includes('light.') || entity.entity_id.includes('switch.') || entity.entity_id.includes('climate.') || entity.entity_id.includes('media_player.')) {
      friendlyRoom.push(entity.attributes.friendly_name)
      rawRoom.push(entity.entity_id)
    }
  }
  for (let room of rawRoom) {
    if (room.includes('light.')) {
      let newRoom = room.slice(6)
      rawRoom[rawRoom.indexOf(room)] = newRoom
    }
    if (room.includes('switch.')) {
      let newRoom = room.slice(7)
      rawRoom[rawRoom.indexOf(room)] = newRoom
    }
    if (room.includes('climate.')) {
      let newRoom = room.slice(8)
      rawRoom[rawRoom.indexOf(room)] = newRoom
    }
    if (room.includes('media_player.')) {
      let newRoom = room.slice(13)
      rawRoom[rawRoom.indexOf(room)] = newRoom
    }
  }
  rawRoom.forEach((key, i) => roomDict[key] = friendlyRoom[i])
  const sortedRooms = Object.entries(roomDict)
  console.log(sortedRooms)
  return sortedRooms
}
(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port)

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`)
})()
