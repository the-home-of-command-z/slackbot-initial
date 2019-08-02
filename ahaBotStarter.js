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
const appToken = process.env.BOTTONS_TOKEN

// Main bot function chain contained in here, triggered by event
slackEvents.on('message', (event) => {
  const userInfoDict = getAuthHeader(event)
  const userUrl = userInfoDict[0]
  const authHeadersActual = userInfoDict[1]
})

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
  const authHeadersActual = {
    authorization: `Bearer ${userToken}`,
    'content-type': 'application/json'
  }
  return { userUrl, authHeadersActual }
}
