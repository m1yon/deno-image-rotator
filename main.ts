import { imagescript } from './deps.ts'

const [directory, rotation] = Deno.args

for await (const file of Deno.readDir(directory)) {
  const fileContent = await Deno.readFile(`${directory}/${file.name}`)
  const originalImage = (await imagescript.decode(
    fileContent,
  )) as imagescript.Image

  const rotatedImage = originalImage.rotate(+rotation)
  await Deno.writeFile(`${directory}/${file.name}`, await rotatedImage.encode())
}
