const { createEventAdapter } = require('@slack/events-api')
const { WebClient, ErrorCode } = require('@slack/web-api')
const natural = require('natural')
const axios = require('axios')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const matt_auth = process.env.MATT_AUTH
const slackEvents = createEventAdapter(slackSigningSecret)
const web = new WebClient(process.env.SLACK_TOKEN)
const currentTime = new Date().toTimeString()
const djangoURL = 'https://ahabot-registration.herokuapp.com/api'
// let slackUserHeader = {
//   auth: `${slackUserName}`,
//   'content-type': 'application/json'
// }

const matt_url = process.env.MATT_URL
const turnLightOn = `${matt_url}/api/services/light/turn_on`
const toggleLight = `${matt_url}/api/services/light/toggle`
const turnLightOff = `${matt_url}/api/services/light/turn_off`
const lightswitchURL = `${matt_url}/api/states/light.living_room`
const generalInfo = `${matt_url}/api/states`
const authHeaders = {
  authorization: `Bearer ${matt_auth}`,
  'content-type': 'application/json'
}
const bodyLightId = { entity_id: 'light.living_room' }
const port = process.env.PORT || 3000
const greetings = ['hi', 'hello', 'good morning', 'good evening', 'hey', 'howdy']
const appToken = process.env.BOTTONS_TOKEN
let authHeadersActual

slackEvents.on('message', (event) => {
  if (event.text.includes('lights off please')) {
    axios.post(turnLightOff, bodyLightId, {
      headers: authHeaders
    }
    )

    web.chat.postMessage({
      channel: event.channel,
      icon_emoji: ':cat:',
      text: `Hey ${event.user}, I tried to turn the lights off`
    })
  }
  if (event.text.includes('lights on please')) {
    axios.post(turnLightOn, bodyLightId, {
      headers: authHeaders
    }
    )

    web.chat.postMessage({
      channel: event.channel,
      icon_emoji: ':cat:',
      text: `Hey ${event.user}, I tried to turn the lights on`
    })
  }
  if (event.text.includes('toggle please')) {
    axios.post(toggleLight, bodyLightId, {
      headers: authHeaders
    }
    )

    web.chat.postMessage({
      channel: event.channel,
      icon_emoji: ':cat:',
      text: `Hey ${event.user}, I tried to toggle the lights`
    })
  }
  if (event.text.includes('homeaway')) {
    web.chat.postMessage({
      channel: event.channel,
      icon_emoji: ':cat:',
      text: `HomeAway is our almost working chatbot!`
    })
  }
  // TEST CODE. I think this works but I have to get my slack stuff setup on django to check
  if (event.text.includes('test2')) {
    getAuthHeader(event)
  }
  for (const greeting of greetings) {
    if (event.text.includes(greeting)) {
      web.chat.postMessage({
        channel: event.channel,
        icon_emoji: ':cat:',
        text: `Well meowdy there, :wave: I'm bottons! It is currently ${currentTime}`
      })
      break
    }
  }
  //   for (const greeting of greetings) {
  //     if ((natural.LevenshteinDistance(event.text, greeting)) < 3) {
  //       web.chat.postMessage({
  //         channel: event.channel,
  //         icon_emoji: ':cat:',
  //         text: `Well meowdy there, :wave: I'm bottons! It is currently ${currentTime}`
  //       })
  //       break
  //     }
  //   }

  if (event.text.includes('status')) {
    axios.get(lightswitchURL, {
      headers: authHeaders
    }
    )
      .then(function (response) {
        web.chat.postMessage({
          channel: event.channel,
          // channel: 'bottons',
          icon_emoji: ':cat:',
          text: `Your light is currently ${response.data.state}`
        })
      })
  }
  if (event.text.includes('devices')) {
    getLightStatus(event)
  }
})

slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`)
})

slackEvents.on('error', (error) => {
  console.log(error.name)
});

(async () => {
  // Start the built-in server
  const server = await slackEvents.start(port)

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`)
})()

async function getAuthHeader (event) {
  const response = await axios.get(`https://slack.com/api/users.info?token=${appToken}&user=${event.user}&pretty=1`)
  const slackUserHeader = {
    auth: `${response.data.user.name}`,
    'content-type': 'application/json'
  }

  const response2 = await axios.get(djangoURL, {
    headers: slackUserHeader
  })

  const userUrl = response2.data[0].url
  const userToken = response2.data[0].access_token
  authHeadersActual = {
    authorization: `Bearer ${userToken}`,
    'content-type': 'application/json'
  }
}

async function getLightStatus (event) {
  const response = await axios.get(generalInfo, {
    headers: authHeaders
  }
  )

  web.chat.postMessage({
    channel: event.channel,
    // channel: 'bottons',
    icon_emoji: ':cat:',
    text: `Your light is currently ${response.data.state}`
  })
}


const response3 = await axios.get(`https://${userUrl}/api/states/light.living_room`, {
    headers: authHeadersActual
  })
  web.chat.postMessage({
    channel: event.channel,
    icon_emoji: ':cat:',
    text: `Your light is ${response3.data.state}`
  })
