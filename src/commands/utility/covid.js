const axios = require('axios')
const config = require('../../config')

const { avatar, color } = config.embed

const url =
  'https://corona.lmao.ninja/v2/countries/Malaysia?yesterday=true&strict=true&query'

module.exports = {
  name: 'covid',
  alias: ['covid19', 'cov'],
  description: 'COVID-19 Statistics for Malaysia.',
  async execute (message) {
    const res = await axios.get(url)
    const {
      cases,
      todayCases,
      recovered,
      todayRecovered,
      deaths,
      todayDeaths,
      critical,
      tests,
      active,
      oneCasePerPeople,
      oneDeathPerPeople,
      oneTestPerPeople,

      countryInfo: { flag }
    } = res.data

    message.reply({
      embeds: [
        {
          title: 'Malaysia Covid-19 Update',
          url: 'https://covidnow.moh.gov.my',
          color,
          fields: [
            [
              'Confirmed',
              `**${cases.toLocaleString()}**\n+${todayCases.toLocaleString()}`
            ],
            [
              'Recovered',
              `**${recovered.toLocaleString()}**\n+${todayRecovered.toLocaleString()}`
            ],
            [
              'Deceased',
              `**${deaths.toLocaleString()}**\n+${todayDeaths.toLocaleString()}`
            ],
            ['Active', active.toLocaleString()],
            ['Critical', critical.toLocaleString()],
            ['Tested', tests.toLocaleString()],
            ['1 Case Per', `${oneCasePerPeople.toLocaleString()} people`],
            ['1 Death Per', `${oneDeathPerPeople.toLocaleString()} people`],
            ['1 Test Per', `${oneTestPerPeople.toLocaleString()} people`]
          ].map(([name, value]) => ({ name, value, inline: true })),
          footer: {
            text: 'Stay safe, mate.',
            icon_url: avatar
          },
          timestamp: Date.now(),
          thumbnail: { url: flag }
        }
      ]
    })
  }
}
