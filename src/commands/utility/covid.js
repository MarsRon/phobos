const axios = require('axios').default
const config = require('../../config')

const { avatar, color } = config.embed

module.exports = {
  name: 'covid',
  alias: ['covid19', 'cov'],
  description: 'COVID-19 Statistics for Malaysia.',
  async execute (message) {
    try {
      const { data } = await axios.get(
        'https://disease.sh/v3/covid-19/countries/MY'
      )

      const {
        cases,
        todayCases,
        recovered,
        todayRecovered,
        deaths,
        todayDeaths,
        active,
        casesPerOneMillion,
        deathsPerOneMillion,
        countryInfo: { flag },
        updated
      } = data

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
              ['Cases per 1k', (casesPerOneMillion / 1000).toLocaleString()],
              ['Deaths per 1k', (deathsPerOneMillion / 1000).toLocaleString()]
            ].map(([name, value]) => ({ name, value, inline: true })),
            footer: {
              text: 'Get vaccinated, antivaxxers.',
              icon_url: avatar
            },
            timestamp: updated,
            thumbnail: { url: flag }
          }
        ]
      })
    } catch (error) {
      message.client.log.error(error)
      return message.reply(
        ':x: Sorry, something went wrong. Please try again later ¯\\_(ツ)_/¯'
      )
    }
  }
}
