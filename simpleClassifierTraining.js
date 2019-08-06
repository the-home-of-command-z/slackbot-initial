const natural = require('natural')

const classifierAction = new natural.BayesClassifier()

//Light On Classifiers
classifierAction.addDocument('light_on', 'light_on')
classifierAction.addDocument('turn the lights on', 'light_on')
classifierAction.addDocument('activate lights', 'light_on')
classifierAction.addDocument('bring up the lights', 'light_on')
classifierAction.addDocument('put on lights', 'light_on')
classifierAction.addDocument('start lights', 'light_on')


//Light Off Classifiers
classifierAction.addDocument('light_off', 'light_off')
classifierAction.addDocument('turn the lights off', 'light_off')
classifierAction.addDocument('kill the lights', 'light_off')
classifierAction.addDocument('cut the lights', 'light_off')
classifierAction.addDocument('the lights should be off', 'light_off')
classifierAction.addDocument('deactivate lights', 'light_off')


// Volume Up Classifiers
classifierAction.addDocument('volume_up', 'volume_up')
classifierAction.addDocument('turn it up', 'volume_up')
classifierAction.addDocument('turn that up', 'volume_up')
classifierAction.addDocument('make it louder', 'volume_up')
classifierAction.addDocument('raise volume', 'volume_up')
classifierAction.addDocument('raise level', 'volume_up')
classifierAction.addDocument('raise sound', 'volume_up')
classifierAction.addDocument('sound up', 'volume_up')


// Volume Down Classifiers
classifierAction.addDocument('volume_down', 'volume_down')
classifierAction.addDocument('turn it down', 'volume_down')
classifierAction.addDocument('turn that down', 'volume_down')
classifierAction.addDocument('lower sound', 'volume_down')
classifierAction.addDocument('sound down', 'volume_down')
classifierAction.addDocument('lower volume', 'volume_down')


// Mute Classifiers
classifierAction.addDocument('volume_mute', 'volume_mute')
classifierAction.addDocument('turn off volume', 'volume_mute')
classifierAction.addDocument('total silence', 'volume_mute')
classifierAction.addDocument('mute device', 'volume_mute')
classifierAction.addDocument('silence volume', 'volume_mute')
classifierAction.addDocument('stop all sound', 'volume_mute')



//Check Device Classifiers
classifierAction.addDocument('what_devices', 'what_devices')
classifierAction.addDocument('what can I do', 'what_devices')
classifierAction.addDocument('what can you do', 'what_devices')
classifierAction.addDocument('what can I control', 'what_devices')
classifierAction.addDocument('what can you control', 'what_devices')
classifierAction.addDocument('all devices', 'what_devices')
classifierAction.addDocument('tell me what you can do', 'what_devices')



//Light Status Classifiers
classifierAction.addDocument('check the lights', 'light_status')
classifierAction.addDocument('my light status', 'light_status')
classifierAction.addDocument('status of lights', 'light_status')
classifierAction.addDocument('what lights are on', 'light_status')


//Switch Status Classifiers
classifierAction.addDocument('switch_status', 'switch_status')
classifierAction.addDocument('check the switch', 'switch_status')
classifierAction.addDocument('my switch status', 'switch_status')
classifierAction.addDocument('what switch is on', 'switch_status')
classifierAction.addDocument('status of switch', 'switch_status')


//Light Red Classifieres
classifierAction.addDocument('light_red', 'light_red')
classifierAction.addDocument('turn light red', 'light_red')
classifierAction.addDocument('make light red', 'light_red')
classifierAction.addDocument('want light to be red', 'light_red')
classifierAction.addDocument('use red light', 'light_red')
classifierAction.addDocument('should be red', 'light_red')


//Light Green Classifieres
classifierAction.addDocument('light_green', 'light_green')
classifierAction.addDocument('turn light green', 'light_green')
classifierAction.addDocument('make light green', 'light_green')
classifierAction.addDocument('want light to be green', 'light_green')
classifierAction.addDocument('use green light', 'light_green')
classifierAction.addDocument('switch to green', 'light_green')


//Light Blue Classifieres
classifierAction.addDocument('light_blue', 'light_blue')
classifierAction.addDocument('turn light blue', 'light_blue')
classifierAction.addDocument('make light blue', 'light_blue')
classifierAction.addDocument('want light to be blue', 'light_blue')
classifierAction.addDocument('use blue light', 'light_blue')
classifierAction.addDocument('switch to blue', 'light_blue')


//Media Status Classifiers
classifierAction.addDocument('media_status', 'media_status')
classifierAction.addDocument('is the media player on', 'media_status')
classifierAction.addDocument('check the media player', 'media_status')
classifierAction.addDocument('is media on', 'media_status')
classifierAction.addDocument('is the player on', 'media_status')
classifierAction.addDocument('check the player', 'media_status')
classifierAction.addDocument('my media status', 'media_status')
classifierAction.addDocument('what is status of media player', 'media_status')


//Media Play Classifiers
classifierAction.addDocument('media_play', 'media_play')
classifierAction.addDocument('turn the media player on', 'media_play')
classifierAction.addDocument('turn on the media player', 'media_play')
classifierAction.addDocument('switch on the media player', 'media_play')
classifierAction.addDocument('turn the player on', 'media_play')
classifierAction.addDocument('activate media player', 'media_play')
classifierAction.addDocument('start media player', 'media_play')


//Media Pause Classifiers
classifierAction.addDocument('media_pause', 'media_pause')
classifierAction.addDocument('pause media', 'media_pause')
classifierAction.addDocument('pause player', 'media_pause')
classifierAction.addDocument('pause media player', 'media_pause')
classifierAction.addDocument('pause music')


//Media Stop Classifiers
classifierAction.addDocument('media_stop', 'media_stop')
classifierAction.addDocument('turn the media player off', 'media_stop')
classifierAction.addDocument('turn off the media player', 'media_stop')
classifierAction.addDocument('switch off the media player', 'media_stop')
classifierAction.addDocument("media player should be off", 'media_stop')
classifierAction.addDocument('deactivate media', 'media_stop')


//Climate Status Classifiers
classifierAction.addDocument('climate_status', 'climate_status')
classifierAction.addDocument('what is the temperature', 'climate_status')
classifierAction.addDocument('current temperature', 'climate_status')
classifierAction.addDocument('temperature at home', 'climate_status')
classifierAction.addDocument('temperature in house', 'climate_status')
classifierAction.addDocument('check the temperature', 'climate_status')
classifierAction.addDocument('check the thermostat', 'climate_status')


//Temperature Up Classifiers
classifierAction.addDocument('temperature_up', 'temperature_up')
classifierAction.addDocument('make warmer', 'temperature_up')
classifierAction.addDocument('make hotter', 'temperature_up')
classifierAction.addDocument('increase heat', 'temperature_up')
classifierAction.addDocument('turn heat up', 'temperature_up')
classifierAction.addDocument('raise temperature', 'temperature_up')


//Temperature Down Classifiers
classifierAction.addDocument('temperature_down', 'temperature_down')
classifierAction.addDocument('make cooler', 'temperature_down')
classifierAction.addDocument('make colder', 'temperature_down')
classifierAction.addDocument('increase air', 'temperature_down')
classifierAction.addDocument('turn air up', 'temperature_down')
classifierAction.addDocument('lower the temperature', 'temperature_down')


classifierAction.train()

classifierAction.save('simpleClassifierAction.json', function (err, classifier) {
    if (err) {
      console.log(err)
    }
  })
