import { Message } from 'discord.js'
import { TBot, TCommandValue } from 'utils/types.js'
import { prefix } from '../utils/stringConstants.js'
export default (message: Message, bot: TBot) => {
  if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift()?.toLowerCase()
  const cmd = bot.commands.get(command) as TCommandValue
  if (!cmd) return
  if (cmd.inVoice && !message.member?.voice.channel) {
    return message.channel.send(`Ебанутный/ая зайди в голосовой канал`)
  }

  try {
    cmd.run(message, bot, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`Ошибка: \`${e}\``)
  }
}
