const Command = require("../structures/Command");

const axios = require('axios')

module.exports = class Pokemon extends Command {
  constructor () {
    super({
      name: 'pokemon',
      description: 'Lookup information about a Pokémon',
      options: [
        {
          type: 3,
          name: 'pokemon',
          description: 'Name of the pokémon to lookup',
          required: true
        }
      ]
    })
  }

  run (interaction) {
    const pokemon = interaction.data.options.find(o => o.name === 'pokemon').value
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(res => res.data).then(json => {
      console.log(json)
      interaction.followUp({
        embeds: [
          {
            thumbnail: {
              url: json.sprites.front_default
            }
          }
        ]
      })
    })
  }
}