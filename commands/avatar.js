const Command = require("../structures/Command");

module.exports = class Avatar extends Command {
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
    interaction.followUp({
      embeds: [
        {
          image: {
            url: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.webp`
          }
        }
      ]
    })
  }
}