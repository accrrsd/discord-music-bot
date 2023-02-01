import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from 'discord.js'
import { SearchResultVideo } from 'distube'
import { embedNumEmojis } from '../../utils/constants.js'
import { TBot } from '../../utils/types.js'

/**
 * Создает сообщение с кнопками выбора песни
 */
export default (message: Message, searchRes: SearchResultVideo[], bot: TBot) => {
  bot.state.searchRes = searchRes
  const formattedSearchRes = [
    ...searchRes.map((res, i) => {
      const { name, formattedDuration } = res
      const emojiName = `${i + 1}.    ${embedNumEmojis[i]}    ${name}`
      return { name: emojiName, value: formattedDuration }
    }),
    { name: '🤬 Не нашел блять', value: 'Отменяет поиск и удаляет результат' },
  ]

  const searchEmbed = new EmbedBuilder().setColor(0x0099ff).setTitle('Результат поиска:').addFields(formattedSearchRes)

  const ButtonComponent = new ActionRowBuilder<any>({
    components: Array.from(Array(5).keys()).map(
      (n, i) =>
        new ButtonBuilder({
          customId: `embedPlaySong_${i}`,
          emoji: embedNumEmojis[i],
          style: ButtonStyle.Secondary,
        })
    ),
  })

  const cancelButtonComponent = new ActionRowBuilder<any>({
    components: [
      new ButtonBuilder({
        customId: `embedPlaySong_cancel`,
        emoji: embedNumEmojis[5],
        style: ButtonStyle.Danger,
      }),
    ],
  })

  message.channel
    .send({ embeds: [searchEmbed], components: [ButtonComponent, cancelButtonComponent] })
    .then((message) => {
      bot.state.searchListMessage = message
    })
    .catch((e) => {
      console.error(e)
      message.channel.send('Ошибка отправки сообщения с результатами')
    })
}
