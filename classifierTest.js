const natural = require('natural')
let correctCount
let count

const testCases = [
  ['climate_status', 'temperature?'],
  ['climate_status', "what's the temperature"],
  ['media_play', 'play some music'],
  ['media_play', 'play music'],
  ['temperature_up', 'make it warmer'],
  ['temperature_up', 'make it hotter'],
  ['temperature_down', 'make it colder'],
  ['temperature_down', 'make it cooler'],
  ['media_play', 'play music'],
  ['media_pause', 'pause music'],
  ['media_stop', 'stop music'],
  ['volume_mute', 'mute'],
  ['volume_up', 'volume up'],
  ['volume_down', 'volume down'],
  ['volume_up', 'louder'],
  ['volume_down', 'quieter'],
  ['temperature_up', 'warmer'],
  ['temperature_down', 'colder'],
  ['light_on', 'turn the light on'],
  ['light_off', 'please turn the light off'],
  ['light_on', 'switch the light on'],
  ['light_off', 'kill the lights'],
  ['light_on', 'put on the light'],
  ['light_off', 'turn off the lights'],
  ['light_on', 'turn the light on'],
  ['light_off', 'turn the light off'],
  ['light_on', 'please turn the light on'],
  ['light_off', 'please turn the light off'],
  ['light_off', 'switch the light off'],
  ['light_off', 'kill the lights'],
  ['light_on', 'put on the light'],
  ['light_on', 'turn on the lights'],
  ['light_off', 'turn off the lights'],
  ['light_on', 'lights on please'],
  ['light_off', 'lights off please'],
  ['light_on', 'bring up the lights'],
  ['light_off', 'bring down the lights'],
  ['light_on', 'light on'],
  ['light_off', 'light off'],
  ['light_on', 'activate lights'],
  ['light_off', 'deactivate lights'],
  ['light_on', 'start lights'],
  ['light_off', 'stop lights']
]

natural.BayesClassifier.load('simpleClassifierAction.json', null, function (err, classifier) {
  if (err) {
    console.log(err)
  }
  correctCount = 0
  for (const pair of testCases) {
    if (pair[0] === classifier.classify(pair[1])) {
      correctCount++
    } else {
      console.log(pair[0], classifier.classify(pair[1]), pair[1])
    }
  }
  console.log('original simple count:', correctCount)
})

natural.LogisticRegressionClassifier.load('simpleClassifierAction2.json', null, function (err, classifier) {
  if (err) {
    console.log(err)
  }

  correctCount = 0
  for (const pair of testCases) {
    if (pair[0] === classifier.classify(pair[1])) {
      correctCount++
    } else {
      console.log(pair[0], classifier.classify(pair[1]), pair[1])
    }
  }
  console.log('logistic regression:', correctCount)
})

natural.BayesClassifier.load('simpleArray1.json', null, function (err, classifier) {
  if (err) {
    console.log(err)
  }

  correctCount = 0
  for (const pair of testCases) {
    if (pair[0] === classifier.classify(pair[1])) {
      correctCount++
    } else {
      console.log(pair[0], classifier.classify(pair[1]), pair[1])
    }
  }
  console.log('array original count:', correctCount)
})

natural.LogisticRegressionClassifier.load('simpleArray2.json', null, function (err, classifier) {
  if (err) {
    console.log(err)
  }
  correctCount = 0
  count = 0
  for (const pair of testCases) {
    count++
    if (pair[0] === classifier.classify(pair[1])) {
      correctCount++
    } else {
      console.log(pair[0], classifier.classify(pair[1]), pair[1])
    }
  }
  console.log('array logistic regression count:', correctCount)
  console.log('total', count)
})

natural.BayesClassifier.load('classifierActionTest1.json', null, function (err, classifier) {
  if (err) {
    console.log(err)
  }
  correctCount = 0
  for (const pair of testCases) {
    if (pair[0] === classifier.classify(pair[1])) {
      correctCount++
    } else {
      console.log(pair[0], classifier.classify(pair[1]), pair[1])
    }
  }
  console.log('original count:', correctCount)
})

natural.LogisticRegressionClassifier.load('classifierActionTest2.json', null, function (err, classifier) {
  if (err) {
    console.log(err)
  }

  correctCount = 0
  for (const pair of testCases) {
    if (pair[0] === classifier.classify(pair[1])) {
      correctCount++
    } else {
      console.log(pair[0], classifier.classify(pair[1]), pair[1])
    }
  }
  console.log('logistic regression long:', correctCount)
})
