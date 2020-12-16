const Command = require("../structures/Command");

module.exports = class Hello extends Command {
  constructor () {
    super({
      name: 'hello',
      description: 'Say hello!',
      options: []
    })
  }

  run (interaction, res) {
    res.json({
      type: 4,
      data: {
        content: "Hello, world!",
        embeds: [
          {
            title: 'Hi'
          }
        ]
      }
    })
  }
}