const djangoURL = 'https://ahabot-registration.herokuapp.com/api'

function initializeMessaging (user, appToken) {
    axios.get(`https://slack.com/api/users.info?token=${appToken}&user=${user}&pretty=1`)
      .then(function (response) {
          const slackUserHeader = {
            auth: `${response.data.user.name}`,
            'content-type': 'application/json'
          }

          axios.get(djangoURL, {
            headers: slackUserHeader
          }).then(function (response) {
            const userURL = response.data[0].url
            const userToken = response.data[0].access_token
            authHeadersActual = {
              authorization: `Bearer ${userToken}`,
              'content-type': 'applicatin/json'
          }
      }); return [authHeadersActual, userURL]
  })
}