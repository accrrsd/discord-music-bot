import { Message, ButtonInteraction } from 'discord.js'
import { TBot } from './types.js'
export const stringIsAValidUrl = (s: string) => {
  try {
    new URL(s)
    return true
  } catch (err) {
    return false
  }
}

export const commandCheckReturn = (str: string, message: Message, returnString?: boolean) => (returnString ? str : message.channel.send(str))

export const smartRepeatChange = (bot: TBot, queueMoreThenOne?: boolean) => {
  if (bot.state.repeat === 1 && !queueMoreThenOne) return (bot.state.repeat = 0)
  if (bot.state.repeat === 1 && queueMoreThenOne) return (bot.state.repeat = 2)
  return bot.state.repeat === 0 ? (bot.state.repeat = 1) : (bot.state.repeat = 0)
}

export const interactionReplySkip = (interaction: ButtonInteraction, deleteMessage?: boolean) => {
  const oldComponents = interaction.message.components
  interaction.update({ components: oldComponents }).then(() => {
    deleteMessage && interaction.message.delete()
  })
}

export const deleteSearchListMessage = (bot: TBot) =>
  bot.state.searchListMessage ? bot.state.searchListMessage.delete().finally(() => (bot.state.searchListMessage = undefined)) : undefined

export const deletePlayingMessage = (bot: TBot) =>
  bot.state.playingMessage ? bot.state.playingMessage.delete().finally(() => (bot.state.playingMessage = undefined)) : undefined
