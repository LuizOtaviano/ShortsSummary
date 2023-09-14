import { server } from "./server.js"
const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async evt => {
  evt.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if(!videoURL.includes("shorts")) {
    return content.textContent = "Essa url não parece ser um short."
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando resumo..."

  const summary = await server.post("/summary", { text: transcription.data.result })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})