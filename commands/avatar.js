const Command = require("../structures/Command");

module.exports = class Hello extends Command {
  constructor () {
    super({
      name: 'avatar',
      description: 'Shows someones\'s avatar',
      options: [
        {
          name: 'user',
          description: 'Which user to show the avatar of',
          required: true,
          type: 6
        }
      ]
    })
  }

  run (interaction, res) {
    console.log(interaction)
    res.json({
      type: 4,
      data: {
        embeds: [
          {
            image: {
              url: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.webp`
            }
          }
        ]
      }
    })
  }
}