import { Message, Client, Collection } from 'discord.js'
import { DisTube, SearchResult, SearchResultPlaylist, SearchResultVideo } from 'distube'

export type TState = {
  searchRes: SearchResult[] | SearchResultVideo[] | SearchResultPlaylist[] | undefined
  playingMessage: undefined | Message
  searchListMessage: undefined | Message
  repeat: 0 | 1 | 2
}

export type TBot = {
  client: Client
  state: TState
  distube: DisTube
  commands: Collection<string | unknown, TCommandValue | unknown>
}

type TCommandBase = {
  name: string
  inVoice?: boolean
}

export type TCommandValue = TCommandBase & {
  run: Function
}

export type TSimplyCommandObj = TCommandBase & {
  run: TLittleCommandFunc
}

export type TArgsCommandObj = TCommandBase & {
  run: TArgsCommandFunc
}

export type TPromiseArgsCommandObj = TCommandBase & {
  run: TPromiseArgsCommandFunc
}

export type TPromiseLittleCommandObj = TCommandBase & {
  run: TPromiseLittleCommandFunc
}

export type TArgsCommandFunc = (message: Message, bot: TBot, args?: string[], sendMessage?: boolean) => void
export type TLittleCommandFunc = (message: Message, bot: TBot, sendMessage?: boolean) => void

export type TPromiseArgsCommandFunc = (message: Message, bot: TBot, args?: string[], returnString?: boolean) => Promise<string | Message>
export type TPromiseLittleCommandFunc = (message: Message, bot: TBot, returnString?: boolean) => Promise<string | Message>
