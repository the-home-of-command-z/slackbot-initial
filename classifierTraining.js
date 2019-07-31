const natural = require('natural')

const classifierAction = new natural.BayesClassifier()

// Turn On Classifiers
classifierAction.addDocument('turn the lights on', 'turn_on')
classifierAction.addDocument('it is too dark', 'turn_on')
classifierAction.addDocument('switch the lights on', 'turn_on')
classifierAction.addDocument('turn on the lights', 'turn_on')
classifierAction.addDocument('switch on the lights', 'turn_on')
classifierAction.addDocument('turn the fan on', 'turn_on')
classifierAction.addDocument("why isn't the the fan on?", 'turn_on')
classifierAction.addDocument('lights should be on', 'turn_on')
classifierAction.addDocument('activate lights', 'turn_on')
classifierAction.addDocument('put on lights', 'turn_on')
classifierAction.addDocument('start up lights', 'turn_on')
classifierAction.addDocument('put on lights', 'turn_on')
classifierAction.addDocument('initiate lights', 'turn_on')
classifierAction.addDocument('switch on lights', 'turn_on')
classifierAction.addDocument('trigger lights on', 'turn_on')
classifierAction.addDocument('start lights', 'turn_on')
classifierAction.addDocument('turn on switch', 'turn_on')
classifierAction.addDocument('activate switch', 'turn_on')
classifierAction.addDocument('the lights should be on', 'turn_on')
classifierAction.addDocument("it's dark in here", 'turn_on')
classifierAction.addDocument('its dark in here', 'turn_on')
classifierAction.addDocument('turn on camera', 'turn_on')
classifierAction.addDocument('switch that thing on', 'turn_on')
classifierAction.addDocument('bring up the lights', 'turn_on')

// Turn Off Classifiers
classifierAction.addDocument('turn the lights off', 'turn_off')
classifierAction.addDocument('kill the lights', 'turn_off')
classifierAction.addDocument('switch off the lights', 'turn_off')
classifierAction.addDocument('turn off', 'turn_off')
classifierAction.addDocument('switch off', 'turn_off')
classifierAction.addDocument('switch the lights off', 'turn_off')
classifierAction.addDocument('it is too bright in here', 'turn_off')
classifierAction.addDocument('switch the lights off', 'turn_off')
classifierAction.addDocument('why is the fan on?', 'turn_off')
classifierAction.addDocument('why are the the lights on?', 'turn_off')
classifierAction.addDocument('why are the lights still on?', 'turn_off')
classifierAction.addDocument('cut the lights', 'turn_off')
classifierAction.addDocument('the lights should be off', 'turn_off')
classifierAction.addDocument('deactivate lights', 'turn_off')
classifierAction.addDocument('deactivate switch', 'turn_off')
classifierAction.addDocument('turn off lights', 'turn_off')
classifierAction.addDocument('turn off switch', 'turn_off')
classifierAction.addDocument('shut down lights', 'turn_off')
classifierAction.addDocument('bring down the lights', 'turn_off')

// Volume Up Classifiers
classifierAction.addDocument('turn it up', 'volume_up')
classifierAction.addDocument('turn that up', 'volume_up')
classifierAction.addDocument('make it louder', 'volume_up')
classifierAction.addDocument('too quiet', 'volume_up')

// Volume Down Classifiers
classifierAction.addDocument('turn it down', 'volume_down')
classifierAction.addDocument('turn that down', 'volume_down')
classifierAction.addDocument('too loud', 'volume_down')
classifierAction.addDocument



classifierAction.train()

console.log(classifierAction.classify(//'test words here'))

// classifierAction.save('classifierAction.json', function (classifier) {
//   // the classifier is saved to the classifier.json file!
// })
