import { imagescript } from './deps.ts'

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

    const fileContent = await Deno.readFile(`${directory}/${file.name}`)
    const originalImage = (await imagescript.decode(
      fileContent,
    )) as imagescript.Image

    const rotatedImage = originalImage.rotate(rotation)
    await Deno.writeFile(
      `${directory}/${file.name}`,
      await rotatedImage.encode(),
    )
  }
}

const [directory, rotation] = Deno.args

await rotateImages(directory, +rotation)
