import { ButtonInteraction, GuildTextBasedChannel, VoiceBasedChannel, GuildMember } from 'discord.js'
import { deleteSearchListMessage, interactionReplySkip } from '../utils/functions.js'
import { TBot } from '../utils/types.js'

export default (interaction: ButtonInteraction, buttonName: '0' | '1' | '2' | '3' | '4' | 'cancel', bot: TBot) => {
  if (!bot.state.searchRes) return interaction.reply('Внутренняя ошибка сохранения поиска песен')
  let link: string | undefined
  let currentVoiceChannel: VoiceBasedChannel | undefined | null
  let member: GuildMember | undefined
  if (buttonName !== 'cancel') link = bot.state.searchRes[Number(buttonName)].url
  if (!link) return deleteSearchListMessage(bot)?.then(() => interaction.reply({ content: 'Блять, попробуй ссылку' }))

  if (interaction.guildId && interaction.member) {
    const guild = bot.client.guilds.cache.get(interaction.guildId)
    member = guild?.members.cache.get(interaction.member.user.id)
    currentVoiceChannel = member?.voice.channel
  }
  if (!currentVoiceChannel)
    return deleteSearchListMessage(bot)?.then(() => interaction.reply({ content: 'Ошибка получения голосового канала, долбаеб ты точно в нем?' }))

  if (currentVoiceChannel && member && link) {
    // Нужно подождать когда вызовется плей и только потом удалять
    interactionReplySkip(interaction)
    bot.distube
      .play(currentVoiceChannel, link, {
        member,
        textChannel: interaction.message.channel as GuildTextBasedChannel,
        message: interaction.message,
      })
      .then(() => {
        deleteSearchListMessage(bot)
      })
  }
}

// ? Примерно пофикшено
// При повторном поиске вызывает ошибку взаимодействия — ПОТОМУ ЧТО МЕТОДОМ PLAY мы удаляли сообщение не дожидаясь interaction.reply

//При поиске после ссылки моментально его закрывает
