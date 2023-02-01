import { TBot, TState } from './utils/types.js'
import { distube, client, commands } from './utils/definitions.js'
import dotenv from 'dotenv'

// config constants like token, (appid, guildid, publicKey) but they don't needed now

dotenv.config()
const { TOKEN: token } = process.env

// loaders
import commandLoader from './command-loader.js'
import messageCreateHandler from './events/message-create.js'

// Messages
import playSongHandler from './events/messages/play.js'
import addSongHandler from './events/messages/add.js'

// buttons
import searchListButtonEvent from './events/search-list-buttonsEvent.js'
import currentSongButtonsEvent from './events/current-song-buttonsEvent.js'

// ? Примерно пофикшено
//Глобально проблема с отлавливанием и удалением сообщений

const state: TState = {
  searchRes: undefined,
  playingMessage: undefined,
  searchListMessage: undefined,
  repeat: 0,
}

const botObj: TBot = {
  client,
  distube,
  state,
  commands,
}

commandLoader(commands)

client.on('ready', () => console.log('bot started'))

client.on('messageCreate', (message) => {
  messageCreateHandler(message, botObj)
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isButton()) return
  const buttonPrefix = 'currentSongButton_'
  if (!interaction.customId.includes(buttonPrefix)) return
  const currentButton = interaction.customId.slice(buttonPrefix.length) as 'skip' | 'stop' | 'repeat'
  currentSongButtonsEvent(interaction, currentButton, botObj)
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isButton()) return
  const buttonPrefix = 'embedPlaySong_'
  if (!interaction.customId.includes(buttonPrefix)) return
  const currentButton = interaction.customId.slice(buttonPrefix.length) as '0' | '1' | '2' | '3' | '4' | 'cancel'
  searchListButtonEvent(interaction, currentButton, botObj)
})

distube
  .on('playSong', (queue, song) => {
    playSongHandler(queue, song, botObj)
  })

  .on('addSong', (queue, song) => {
    addSongHandler(queue, song, botObj)
  })

client.login(token)
