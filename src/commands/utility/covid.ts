import { Message } from 'discord.js'
import axios from 'axios'
import moment from 'moment'
import config from '@phobos/config'

const { avatar, color } = config.embed

const url = 'https://corona.lmao.ninja/v2/countries/Malaysia?yesterday=true&strict=true&query'

interface CovidData {
  cases: number
  todayCases: number
  recovered: number
  todayRecovered: number
  deaths: number
  todayDeaths: number
  critical: number
  tests: number
  active: number
  oneCasePerPeople: number
  oneDeathPerPeople: number
  oneTestPerPeople: number
  updated: number
  countryInfo: {
    flag: string
  }
}

export default {
  name: 'covid',
  alias: ['covid19', 'cov'],
  description: 'COVID-19 Statistics for Malaysia.',
  async execute (message: Message) {
    const res = await axios.get(url)
    const {
      cases, todayCases, recovered, todayRecovered, deaths, todayDeaths,
      critical, tests, active,
      oneCasePerPeople, oneDeathPerPeople, oneTestPerPeople,
      updated, countryInfo: { flag }
    } = res.data as CovidData

    message.reply({
      embed: {
        title: 'Malaysia Covid-19 Update',
        url: 'https://www.outbreak.my/',
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
          ['Critical', critical.toLocaleString()],
          ['Tested', tests.toLocaleString()],
          ['Active', active.toLocaleString()],
          ['1 Case Per', `${oneCasePerPeople} people`],
          ['1 Death Per', `${oneDeathPerPeople} people`],
          ['1 Test Per', `${oneTestPerPeople} people`],
          ['Last Reported', moment(updated).fromNow()]
        ].map(([name, value]) => ({ name, value, inline: true })),
        footer: {
          text: 'Stay safe, mate.',
          icon_url: avatar
        },
        timestamp: Date.now(),
        thumbnail: { url: flag }
      }
    })
  }
}
