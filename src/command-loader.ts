import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Collection } from 'discord.js'

export default (commands: Collection<string | unknown, Function | unknown>) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  try {
    const jsFiles = fs
      .readdirSync(path.join(__dirname, './commands'))
      .filter((f) => path.extname(f).toLowerCase() === '.js' || path.extname(f).toLowerCase() === '.ts')
    if (!jsFiles) throw new Error()
    if (jsFiles.length <= 0) return console.log('Файлов команд не найдено')
    for (const file of jsFiles) {
      import(`./commands/${file}`).then((importedObj) => {
        const cmd = importedObj.default
        console.log(`Loaded ${file}`)
        commands.set(cmd.name, cmd)
      })
    }
  } catch (error) {
    console.log('Ошибка чтения файлов')
  }
}
