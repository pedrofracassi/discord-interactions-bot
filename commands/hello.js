const Command = require("../structures/Command");

module.exports = class Hello extends Command {
  constructor () {
    super({
      name: 'hello',
      description: 'Say hello!',
      options: []
    })
  }

  run (interaction) {
    interaction.followUp({
      content: 'Hello, world!'
    })
  }
}