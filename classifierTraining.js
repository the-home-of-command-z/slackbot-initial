const natural = require('natural')

const classifierAction = new natural.BayesClassifier()

classifierAction.addDocument('turn the lights on', 'turn_on')
classifierAction.addDocument('it is too dark', 'turn_on')
classifierAction.addDocument('switch the lights on', 'turn_on')
classifierAction.addDocument('turn on the lights', 'turn_on')
classifierAction.addDocument('switch on the lights', 'turn_on')
classifierAction.addDocument('turn the fan on', 'turn_on')
classifierAction.addDocument("why isn't the the fan on?", 'turn_on')

classifierAction.addDocument('turn the lights off', 'turn_off')
classifierAction.addDocument('kill the lights', 'turn_off')
classifierAction.addDocument('switch off the lights', 'turn_off')
classifierAction.addDocument('turn off', 'turn_off')
classifierAction.addDocument('switch off', 'turn_off')
classifierAction.addDocument('switch the lights off', 'turn_off')
classifierAction.addDocument('it is too bright in here', 'turn_off')
classifierAction.addDocument('switch the lights off', 'turn_off')
classifierAction.addDocument('why is the the fan on?', 'turn_off')
classifierAction.addDocument('get the lights', 'turn_off')

classifierAction.train()

console.log(classifierAction.classify('switch that thing on'))

// classifierAction.save('classifierAction.json', function (classifier) {
//   // the classifier is saved to the classifier.json file!
// })
