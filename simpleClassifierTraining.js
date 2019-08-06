const natural = require('natural')

const classifierAction = new natural.BayesClassifier()

//Light On Classifiers
classifierAction.addDocument('turn the lights on', 'light_on')
classifierAction.addDocument('activate lights', 'light_on')
classifierAction.addDocument('bring up the lights', 'light_on')
classifierAction.addDocument('put on lights', 'light_on')
classifierAction.addDocument('start lights', 'light_on')


//Light Off Classifiers
classifierAction.addDocument('turn the lights off', 'light_off')
classifierAction.addDocument('kill the lights', 'light_off')
classifierAction.addDocument('cut the lights', 'light_off')
classifierAction.addDocument('the lights should be off', 'light_off')
classifierAction.addDocument('deactivate lights', 'light_off')

classifierAction.train()

classifierAction.save('simpleClassifierAction.json', function (err, classifier) {
    if (err) {
      console.log(err)
    }
  })
