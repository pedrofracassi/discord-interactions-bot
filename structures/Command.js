module.exports = class Command {
  constructor ({ name, description, options }) {
    this.name = name
    this.description = description
    this.options = options
  }

  run (interaction, res) {
    console.log(interaction)
  }
}