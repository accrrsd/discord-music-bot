import { ButtonInteraction, ButtonComponent, ActionRowBuilder, ButtonBuilder } from 'discord.js'
import { interactionReplySkip } from '../utils/functions.js'
import { TArgsCommandObj, TBot, TCommandValue, TSimplyCommandObj } from '../utils/types.js'
import { repeatEmojis } from '../utils/stringConstants.js'

export default (interaction: ButtonInteraction, buttonName: 'skip' | 'stop' | 'repeat', bot: TBot) => {
  let cmd: TCommandValue
  switch (buttonName) {
    case 'skip':
      cmd = bot.commands.get('попусти') as TSimplyCommandObj
      if (!cmd) interaction.message.reply('Ошибка при пропуске через кнопку')
      break

    case 'stop':
      cmd = bot.commands.get('хватит') as TSimplyCommandObj
      if (!cmd) interaction.message.reply('Ошибка при остановке через кнопку')
      break

    case 'repeat':
      const queue = bot.distube.getQueue(interaction.message)
      if (!queue) return interaction.reply({ content: 'Ошибка получения очереди воспроизведения' })
      cmd = bot.commands.get('повторика') as TArgsCommandObj
      if (!cmd) return interaction.reply({ content: 'Ошибка при повторе через кнопку' })
      cmd.run(interaction.message, bot)

      const newActionRow = interaction.message.components.map((oldActionRow) => {
        const updatedActionRow = new ActionRowBuilder<any>()
        updatedActionRow.addComponents(
          oldActionRow.components.map((oldButton) => {
            const oldButtonComp = oldButton as ButtonComponent
            const newButton = ButtonBuilder.from(oldButtonComp)
            if (interaction.customId === oldButtonComp.customId) newButton.setEmoji(repeatEmojis[bot.state.repeat])
            return newButton
          })
        )
        return updatedActionRow
      })
      interaction.update({ components: newActionRow })
      break
  }
  if (!cmd) return interaction.reply('Каким то образом ты нажал/а неправильную кнопку')
  if (cmd.name !== 'повторика') {
    cmd.run(interaction.message, bot)
    interactionReplySkip(interaction)
  }
}
