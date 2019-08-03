const testData = [
  {
    attributes: {
      azimuth: 104.28,
      elevation: 47.44,
      friendly_name: 'Sun',
      next_dawn: '2019-08-04T09:55:42+00:00',
      next_dusk: '2019-08-04T00:48:25+00:00',
      next_midnight: '2019-08-04T05:21:29+00:00',
      next_noon: '2019-08-03T17:21:37+00:00',
      next_rising: '2019-08-04T10:23:47+00:00',
      next_setting: '2019-08-04T00:20:15+00:00',
      rising: true
    },
    context: {
      id: 'cdbb00f8f71a47ea848184170a1307da',
      parent_id: null,
      user_id: null
    },
    entity_id: 'sun.sun',
    last_changed: '2019-08-03T10:22:59.014106+00:00',
    last_updated: '2019-08-03T14:28:03.005441+00:00',
    state: 'above_horizon'
  },
  {
    attributes: {
      editable: true,
      friendly_name: 'Matt',
      id: '86881e144a3741d7bddfbc7cc185eab8',
      user_id: 'e06b2cf301cf413d91d34726061d0381'
    },
    context: {
      id: '17f02932d2c7474e9c2869e6391bdc7f',
      parent_id: null,
      user_id: null
    },
    entity_id: 'person.matt',
    last_changed: '2019-07-30T00:53:52.348680+00:00',
    last_updated: '2019-07-30T00:53:56.458376+00:00',
    state: 'unknown'
  },
  {
    attributes: {
      effect_list: [
        'Strobe color',
        'Police',
        'Christmas',
        'RGB',
        'Random Loop',
        'Fast Random Loop',
        'LSD',
        'Slowdown',
        'Disco',
        'Strobe epilepsy!',
        'Alarm',
        'Police2',
        'WhatsApp',
        'Facebook',
        'Twitter',
        'Slow Temp',
        'Stop'
      ],
      friendly_name: 'Living Room',
      max_mireds: 588,
      min_mireds: 153,
      supported_features: 63
    },
    context: {
      id: 'e2d12a6d8fbb43eca4b93d149fea1f84',
      parent_id: null,
      user_id: null
    },
    entity_id: 'light.living_room',
    last_changed: '2019-08-03T13:22:58.011700+00:00',
    last_updated: '2019-08-03T13:22:58.011700+00:00',
    state: 'off'
  },
  {
    attributes: {
      auto: true,
      entity_id: [
        'light.living_room'
      ],
      friendly_name: 'all lights',
      hidden: true,
      order: 0
    },
    context: {
      id: '11884e3ea381437696f3a798a938b4d0',
      parent_id: null,
      user_id: null
    },
    entity_id: 'group.all_lights',
    last_changed: '2019-08-03T13:22:58.012960+00:00',
    last_updated: '2019-08-03T13:22:58.012960+00:00',
    state: 'off'
  },
  {
    attributes: {
      attribution: 'Weather forecast from met.no, delivered by the Norwegian Meteorological Institute.',
      forecast: [
        {
          condition: 'sunny',
          datetime: '2019-08-04T12:00:00-04:00',
          humidity: 53.7,
          pressure: 1014.4,
          temperature: 87.3,
          wind_bearing: 43.6,
          wind_speed: 2.5
        },
        {
          condition: 'rainy',
          datetime: '2019-08-05T12:00:00-04:00',
          humidity: 90.3,
          pressure: 1014.6,
          temperature: 76.6,
          wind_bearing: 157.4,
          wind_speed: 4.0
        },
        {
          condition: 'partlycloudy',
          datetime: '2019-08-06T12:00:00-04:00',
          humidity: 58.0,
          pressure: 1011.9,
          temperature: 84.4,
          wind_bearing: 310.1,
          wind_speed: 5.8
        },
        {
          condition: 'partlycloudy',
          datetime: '2019-08-07T12:00:00-04:00',
          humidity: 42.3,
          pressure: 1011.5,
          temperature: 92.1,
          wind_bearing: 205.5,
          wind_speed: 7.9
        },
        {
          condition: 'partlycloudy',
          datetime: '2019-08-08T12:00:00-04:00',
          humidity: 46.3,
          pressure: 1011.7,
          temperature: 92.1,
          wind_bearing: 237.8,
          wind_speed: 8.3
        }
      ],
      friendly_name: "Matt's place",
      humidity: 75,
      pressure: 1017.3,
      temperature: 79.2,
      wind_bearing: 31.5,
      wind_speed: 7.9
    },
    context: {
      id: '469fdfbeecb54f15aa4414670baccbb6',
      parent_id: null,
      user_id: null
    },
    entity_id: 'weather.matt_s_place',
    last_changed: '2019-08-03T12:05:28.200644+00:00',
    last_updated: '2019-08-03T14:09:30.193544+00:00',
    state: 'partlycloudy'
  },
  {
    attributes: {
      friendly_name: 'Denon AVR-X1300W',
      is_volume_muted: false,
      media_content_type: 'channel',
      media_title: 'TV Audio',
      sound_mode: 'DOLBY DIGITAL',
      sound_mode_list: [
        'MUSIC',
        'MOVIE',
        'GAME',
        'AUTO',
        'VIRTUAL',
        'PURE DIRECT',
        'DOLBY DIGITAL',
        'DTS SURROUND',
        'MCH STEREO',
        'STEREO',
        'ALL ZONE STEREO'
      ],
      sound_mode_raw: 'Dolby Surround',
      source: 'TV Audio',
      source_list: [
        'AUX',
        'Blu-ray',
        'Bluetooth',
        'CBL/SAT',
        'Favorites',
        'Internet Radio',
        'Media Player',
        'Media Server',
        'Odroid',
        'Online Music',
        'PS4',
        'Pandora',
        'SiriusXM',
        'Spotify',
        'TV Audio',
        'Tuner',
        'iPod/USB'
      ],
      supported_features: 69004,
      volume_level: 0.57
    },
    context: {
      id: 'c7aee597573d44fa9c248a14ecf0dd7f',
      parent_id: null,
      user_id: null
    },
    entity_id: 'media_player.denon_avr_x1300w',
    last_changed: '2019-08-03T12:05:19.023665+00:00',
    last_updated: '2019-08-03T12:21:37.023210+00:00',
    state: 'on'
  },
  {
    attributes: {
      message: 'Login attempt or request with invalid authentication from 98.101.219.178',
      title: 'Login attempt failed'
    },
    context: {
      id: '8e4f516e96594a7489e7246e7531ff46',
      parent_id: null,
      user_id: null
    },
    entity_id: 'persistent_notification.http_login',
    last_changed: '2019-07-30T01:00:13.754475+00:00',
    last_updated: '2019-08-02T21:12:11.665191+00:00',
    state: 'notifying'
  },
  {
    attributes: {
      friendly_name: 'Samsung 8 Series (55) (UN55KS8500)',
      supported_features: 20281
    },
    context: {
      id: '7b0f49446df04572aa409ab7afcf6b68',
      parent_id: null,
      user_id: null
    },
    entity_id: 'media_player.samsung_8_series_55_un55ks8500',
    last_changed: '2019-07-30T01:20:49.011624+00:00',
    last_updated: '2019-07-30T01:20:49.011624+00:00',
    state: 'off'
  },
  {
    attributes: {
      friendly_name: 'Living Room TV',
      supported_features: 21389
    },
    context: {
      id: 'f8a943077d994b52b2d2f331a60c3098',
      parent_id: null,
      user_id: null
    },
    entity_id: 'media_player.living_room_tv',
    last_changed: '2019-08-03T08:35:13.470593+00:00',
    last_updated: '2019-08-03T08:35:13.470593+00:00',
    state: 'off'
  },
  {
    attributes: {
      friendly_name: 'MD Bedroom TV',
      supported_features: 21389
    },
    context: {
      id: '59c70d5d96bb47f395c34c7d501e3959',
      parent_id: null,
      user_id: null
    },
    entity_id: 'media_player.md_bedroom_tv',
    last_changed: '2019-08-03T08:12:17.196165+00:00',
    last_updated: '2019-08-03T08:12:17.196165+00:00',
    state: 'off'
  },
  {
    attributes: {
      friendly_name: 'MD Bedroom display',
      supported_features: 21389
    },
    context: {
      id: 'fcd0b4ee3a8648f3b8cc5e841f29afb0',
      parent_id: null,
      user_id: null
    },
    entity_id: 'media_player.md_bedroom_display',
    last_changed: '2019-08-03T07:38:38.961334+00:00',
    last_updated: '2019-08-03T07:38:38.961334+00:00',
    state: 'off'
  }
]

console.log(getStates(testData))
// for (const entity of joey) {
//   console.log(entity)
// }

function getEntities (statesData) {
  const entityArray = []
  for (const entity of statesData) {
    if (entity.entity_id) {
      entityArray.push(entity.entity_id)
    }
  }
  return entityArray
}

function getStates (statesData) {
  const entityArray = []
  for (const entity of statesData) {
    if (entity.attributes.friendly_name && entity.state !== 'unknown') {
      entityArray.push(`Your ${entity.attributes.friendly_name} is ${entity.state}`)
    }
  }
  return entityArray
}

function getOnStates (statesData) {
  const entityArray = []
  for (const entity of statesData) {
    if (entity.attributes.friendly_name && entity.state === 'on') {
      entityArray.push(`Your ${entity.attributes.friendly_name} is ${entity.state}`)
    }
  }
  return entityArray
}

function getOffStates (statesData) {
  const entityArray = []
  for (const entity of statesData) {
    if (entity.attributes.friendly_name && entity.state === 'off') {
      entityArray.push(`Your ${entity.attributes.friendly_name} is ${entity.state}`)
    }
  }
  return entityArray
}
