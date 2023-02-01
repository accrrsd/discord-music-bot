import { Queue, Song } from 'distube'
// import { deleteMessageCurrently } from '../../utils/functions.js'
import { TBot } from '../../utils/types.js'

/**
 * Создает сообщение о добавлении трека в очередь
 */

export default (queue: Queue, song: Song, bot: TBot) => {
  queue.textChannel?.send(`Добавил\`${song.name}\` в очередь. \nПо просьбе: \`${song.user?.username ?? 'Анона'}\``)
}
