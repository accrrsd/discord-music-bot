import { deletePlayingMessage } from '../utils/functions.js'
import { TSimplyCommandObj } from '../utils/types.js'
const command: TSimplyCommandObj = {
  name: 'хватит',
  inVoice: true,
  run: (message, bot, sendMessage) => {
    const queue = bot.distube.getQueue(message)
    if (!queue) return message.channel.send('Какое хватит, я еще ничего не сделал')
    queue
      .stop()
      .then(() => {
        sendMessage && message.channel.send('Прекращаю')
        deletePlayingMessage(bot)
      })
      .catch((e) => {
        console.error(e)
        message.channel.send('Произошла ошибка прекращения')
      })
  },
}
export default command
