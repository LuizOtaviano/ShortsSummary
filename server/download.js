import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => new Promise((resolve, reject) => {

  const videoURL = `https://www.youtube.com/shorts/${videoId}`
  console.log(`Realizando o download do video: ${videoId}`)

  ytdl(videoURL, { quality: "lowest", filter: "audioonly" })
    .on("info", (info) => {
      const secods = info.formats[0].approxDurationMs / 1000

      if (secods > 60) {
        throw new Error("A duração desse video é maior que 60 segundos.")
      }
    })
    .on("end", () => {
      console.log("Download do vídeo finalizado.")
      resolve()
    })
    .on("error", (erro) => {
      console.log(
        "Não foi possível fazer o download do vídeo. Detalhes do erro: ",
        erro
      )
      reject(erro)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))

})