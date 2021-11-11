const axios = require('axios').default
const config = require('../../config')

const { avatar, color } = config.embed

const url =
  'https://corona.lmao.ninja/v2/countries/Malaysia?yesterday=true&strict=true&query'

module.exports = {
  name: 'covid',
  alias: ['covid19', 'cov'],
  description: 'COVID-19 Statistics for Malaysia.',
  async execute (message) {
    let res
    try {
      res = await axios.get(url)
    } catch (error) {
      message.client.log.error(`${error}`)
      return message.reply(':x: Sorry, an error occurred!')
    }

    const {
      cases,
      todayCases,
      recovered,
      todayRecovered,
      deaths,
      todayDeaths,
      active,
      oneCasePerPeople,
      oneDeathPerPeople,
      countryInfo: { flag }
    } = res.data

    // Yesterday 23:59
    const timestamp = new Date()
    timestamp.setDate(timestamp.getDate() - 1)
    timestamp.setHours(23, 59, 0, 0)

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
            ['Cases per 1k', (1000 / oneCasePerPeople).toLocaleString()],
            ['Deaths per 1k', (1000 / oneDeathPerPeople).toLocaleString()]
          ].map(([name, value]) => ({ name, value, inline: true })),
          footer: {
            text: 'Get vaccinated, antivaxxers.',
            icon_url: avatar
          },
          timestamp,
          thumbnail: { url: flag }
        }
      ]
    })
  }
}
