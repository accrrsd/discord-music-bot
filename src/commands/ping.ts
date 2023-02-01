import { Message } from 'discord.js'

export default {
  name: 'ping',
  run: (message: Message) => {
    message.channel.send('По ебалу себе пингани')
  },
}
