function createRipple ({ currentTarget: button, clientX, clientY }) {
  const ripple = document.createElement('span')
  const { style } = ripple
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  style.width = style.height = `${diameter}px`
  style.left = `${clientX - button.offsetLeft - radius}px`
  style.top = `${clientY - button.offsetTop - radius}px`
  ripple.classList.add('ripple')

  setTimeout(() => ripple.remove(), 600)

  button.appendChild(ripple)
}

document.addEventListener('DOMContentLoaded', () => {
  for (const button of document.getElementsByTagName('a')) {
    button.onmousedown = createRipple
  }
  const { style } = document.getElementById('home')
  const animate = window.requestAnimationFrame
  let deg = 62
  const rotate = () => {
    deg += 0.5
    if (deg >= 360) deg = 0
    style.backgroundImage = `linear-gradient(${deg}deg, #3a3d40 0, #181719 100%)`
    animate(rotate)
  }
  animate(rotate)
})
