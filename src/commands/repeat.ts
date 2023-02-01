import { repeatCommand, repeatText } from '../utils/stringConstants.js'
import { TArgsCommandObj } from '../utils/types.js'
import { smartRepeatChange } from '../utils/functions.js'

const command: TArgsCommandObj = {
  name: 'повторика',
  inVoice: true,
  run: (message, bot, args, sendMessage) => {
    const queue = bot.distube.getQueue(message)
    if (!queue) return message.channel.send('Ошибка получения очереди воспроизведения')
    let mode: 0 | 1 | 2
    let modeText
    const fastChange = () => {
      const res = smartRepeatChange(bot, queue.songs.length > 1)
      mode = res
      modeText = repeatText[res]
    }
    if (!args) fastChange()
    else {
      switch (args[0]) {
        case repeatCommand[0]:
          mode = 0
          modeText = repeatText[0]
          break
        case repeatCommand[1]:
          mode = 1
          modeText = repeatText[1]
          break
        case repeatCommand[2]:
          mode = 2
          modeText = repeatText[2]
          break
        default:
          fastChange()
          break
      }
    }
    bot.state.repeat = mode!
    queue.setRepeatMode(bot.state.repeat)
    sendMessage && message.channel.send(`Установил лицо на \`${modeText ?? 'ошибку'}\``)
  },
}
export default command
