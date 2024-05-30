const canvas = document.getElementById("myCanvas") as any
const ctx = canvas.getContext("2d") as any

const numElementos = 4000

const elementos: any = []
for (let i = 0; i < numElementos; i++) {
  const x = Math.random() * canvas.width
  const y = Math.random() * canvas.height
  elementos.push({ x, y })
}

const radioAgrupamiento = 50 // Define el radio de agrupamiento

let vr = 0.00009
let radius = 0
function agruparElementos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const grupos: any = []

  elementos.forEach((elemento: any) => {
    let grupoEncontrado = false
    grupos.forEach((grupo: any) => {
      const dx = grupo.x - elemento.x
      const dy = grupo.y - elemento.y
      const distancia = Math.sqrt(dx * dx + dy * dy)
      if (distancia < radioAgrupamiento) {
        grupo.elementos.push(elemento)
        grupoEncontrado = true
      }
    })

    if (!grupoEncontrado) {
      grupos.push({ x: elemento.x, y: elemento.y, elementos: [elemento] })
    }
  })

  grupos.forEach((grupo: any) => {
    const mediaX =
      grupo.elementos.reduce((sum: any, el: any) => sum + el.x, 0) /
      grupo.elementos.length
    const mediaY =
      grupo.elementos.reduce((sum: any, el: any) => sum + el.y, 0) /
      grupo.elementos.length

    if (radius > 10 || radius < 0) vr *= -1

    radius += vr

    const angle = Math.abs(
      (Math.cos(mediaX * 0.01) + Math.sin(mediaY * 0.01)) * radius
    )

    ctx.beginPath()
    ctx.arc(mediaX + angle, mediaY - angle, angle, 0, 2 * Math.PI)
    ctx.fillStyle = "blue"
    ctx.fill()
    ctx.closePath()
  })

  requestAnimationFrame(agruparElementos)
}

requestAnimationFrame(agruparElementos)
