require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { verifyKeyMiddleware } = require('discord-interactions')

app.use(bodyParser.json())

const axios = require('axios').default

const discordAxios = axios.create({
  baseURL: 'https://discord.com/api/v8',
  headers: {
    'Authorization': `Bot ${process.env.DISCORD_TOKEN}`
  }
})

const { glob } = require('glob')

let commands

glob('commands/*.js', { absolute: true }, (error, matches) => {
  commands = matches.map(commandPath => {
    const NewCommand = require(commandPath)
    return new NewCommand()
  })

  commands.forEach(command => {
    discordAxios.post(`/applications/${process.env.DISCORD_APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`, {
      name: command.name,
      description: command.description,
      options: command.options
    })
  })
})

app.post('/interactions', verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY), (req, res) => {
  const interaction = req.body
  if (interaction.type !== 2) return
  const command = commands.find(c => c.name === interaction.data.name)
  if (command) command.run(interaction, res)
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})