import { GuildTextBasedChannel, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Message } from 'discord.js'
import { stringIsAValidUrl } from '../utils/functions.js'
import { TBot, TCommandValue } from '../utils/types.js'
import searchEvent from '../events/messages/search.js'

const command: TCommandValue = {
  name: 'музыку',
  inVoice: true,
  run: (message: Message, bot: TBot, args: string[]) => {
    if (!message.member?.voice.channel) return message.channel.send('Войди в голосовой канал ебанушка')
    const string = args?.join(' ')
    if (!string || !args) return message.channel.send('Впиши url или название, нахуй ты отправляешь пустой запрос?')
    if (stringIsAValidUrl(string))
      return bot.distube.play(message.member.voice.channel, string, {
        member: message.member!,
        textChannel: message.channel as GuildTextBasedChannel,
        message,
      })
    bot.distube.search(string, { limit: 5 }).then((searchRes) => {
      searchEvent(message, searchRes, bot)
    })
  },
}
export default command
