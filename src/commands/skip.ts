import { TSimplyCommandObj } from '../utils/types.js'

const command: TSimplyCommandObj = {
  name: 'попусти',
  inVoice: false,
  run: (message, bot, sendMessage) => {
    const queue = bot.distube.getQueue(message)
    if (!queue) return message.channel.send('Попускать некого, с головой беда?')
    queue
      .skip()
      .then((song) => {
        sendMessage && message.channel.send(`Автор музыки попущен! Теперь играет:\n${song.name}`)
      })
      .catch((e) => {
        console.error(e)
        message.channel.send('Произошла ошибка попуска, скорее всего это единственная музыка')
      })
  },
}
export default command
