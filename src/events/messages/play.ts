import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { Queue, Song } from 'distube'
import { reactionEmojis } from '../../utils/constants.js'
import { TBot } from '../../utils/types.js'
import { repeatNames, repeatEmojis } from '../../utils/stringConstants.js'
import { deletePlayingMessage } from '../../utils/functions.js'
/**
 * Создает сообщение о текущем треке с кнопками
 */
export default (queue: Queue, song: Song, bot: TBot) => {
  deletePlayingMessage(bot)
  const repeatMode = bot.state.repeat ?? 0
  if (!queue.textChannel) return Error('Ошибка получения текстового канала')
  queue.textChannel
    .send({
      content: `Играет \`${song.name}\` - \`${song.formattedDuration}\`\nПо просьбе: \`${song.user?.username ?? 'Анона'}\``,
      components: [
        new ActionRowBuilder<any>({
          components: [
            new ButtonBuilder({
              customId: 'currentSongButton_skip',
              label: 'Попустить',
              emoji: reactionEmojis.skip,
              style: ButtonStyle.Secondary,
            }),
            new ButtonBuilder({
              customId: 'currentSongButton_stop',
              label: 'Морской огурец',
              emoji: reactionEmojis.stopCucumber,
              style: ButtonStyle.Danger,
            }),
            new ButtonBuilder({
              customId: 'currentSongButton_repeat',
              label: `Повторика (${repeatNames[repeatMode]})`,
              emoji: repeatEmojis[repeatMode],
              style: ButtonStyle.Secondary,
            }),
          ],
        }),
      ],
    })
    .then((message) => (bot.state.playingMessage = message))
    .catch((e) => console.error('Ошибка отправки сообщения playSongHandler'))
}
