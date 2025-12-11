if (import.meta.env.DEV) {
  const scroller = document.getElementById('scroll-container') as HTMLDivElement | null
  const active = () => !!scroller && location.pathname.startsWith('/posts')
  const key = () => `dev-scroll:${location.pathname}${location.search}`

  const read = (): { x?: number, y?: number } => {
    try {
      return JSON.parse(sessionStorage.getItem(key()) || '{}')
    } catch {
      return {}
    }
  }

  const write = () => {
    if (!active()) return
    try {
      sessionStorage.setItem(
        key(),
        JSON.stringify({ x: scroller!.scrollLeft, y: scroller!.scrollTop }),
      )
    } catch {}
  }

  const jump = (x = 0, y = 0) => {
    if (!scroller) return
    const prev = scroller.style.scrollBehavior
    scroller.style.scrollBehavior = 'auto'
    scroller.scrollTo({ left: x, top: y, behavior: 'auto' })
    requestAnimationFrame(() => {
      if (scroller) scroller.style.scrollBehavior = prev
    })
  }

  const reveal = () => {
    if (scroller) scroller.style.visibility = ''
  }

  const scheduleRestore = () => {
    if (!active()) return reveal()
    const { x = 0, y = 0 } = read()
    ;[0, 16, 80, 200].forEach(ms => setTimeout(() => jump(x, y), ms))
    reveal()
  }

  scheduleRestore()

  window.addEventListener('beforeunload', write)
  if (document.readyState === 'complete') scheduleRestore()
  else window.addEventListener('load', scheduleRestore, { once: true })

  import.meta.hot?.on('vite:beforeUpdate', write)
  import.meta.hot?.on('vite:beforeFullReload', write)
  import.meta.hot?.on('vite:afterUpdate', scheduleRestore)
}
