const items = {
  'VIP Ranks': {
    vipbronze: {
      name: 'Bronze VIP',
      price: 2500
    }
  },
  'Lifestyle Items': {
    nikes: {
      name: 'Fresh Nikes',
      price: 600
    },
    car: {
      name: 'Car',
      price: 1000
    },
    mansion: {
      name: 'Mansion',
      price: 1500
    },
    afookpen: {
      name: 'A Fook Pen',
      price: -69
    }
  },
  'Useful Items': {
    fishingrod: {
      name: 'Fishing Rod',
      price: 50
    }
  }
}

module.exports = {
  getItem (name) {
    for (const category of Object.values(items)) {
      if (category[name] !== undefined) {
        return category[name]
      }
    }
  },
  items
}
