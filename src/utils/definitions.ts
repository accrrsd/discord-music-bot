import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { DisTube } from 'distube'

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ],
})

export const distube = new DisTube(client, {
  leaveOnFinish: true,
  nsfw: true,
  // emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
})

export const commands = new Collection()
