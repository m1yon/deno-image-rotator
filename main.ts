import { imagescript } from './deps.ts'

const imageFileExtensions = ['.jpg', '.jpeg', '.png']

const rotateImages = async (directory: string, rotation: number) => {
  for await (const file of Deno.readDir(directory)) {
    if (file.isDirectory) {
      await rotateImages(`${directory}/${file.name}`, rotation)
      continue
    }

    if (!file.isFile) {
      console.log(file.name, 'is not a file, skipping...')
      continue
    }

    const isSupportedFileExtension = imageFileExtensions.some(extension =>
      file.name.endsWith(extension),
    )

    if (!isSupportedFileExtension) {
      console.log(
        `File extension not supported for file "${file.name}" skipping...`,
      )
      continue
    }

    const fileContent = await Deno.readFile(`${directory}/${file.name}`)
    const originalImage = (await imagescript.decode(fileContent).catch(e => {
      console.log(`Error decoding file "${file.name}": ${e}`)
      return null
    })) as imagescript.Image | null

    if (!originalImage) {
      continue
    }

    const rotatedImage = originalImage.rotate(rotation)
    await Deno.writeFile(
      `${directory}/${file.name}`,
      await rotatedImage.encode(),
    )
  }
}

const [directory, rotation] = Deno.args

await rotateImages(directory, +rotation)
