import { useEffect, useState } from 'react'
export type Mode = 'professional' | 'personal'
function readMode(): Mode { return window.location.hash === '#personal' ? 'personal' : 'professional' }
export function useMode() {
  const [mode, setCurrentMode] = useState<Mode>(readMode)
  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', '#professional')
    const syncFromHash = () => setCurrentMode(readMode())
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])
  function setMode(nextMode: Mode) {
    setCurrentMode(nextMode)
    if (window.location.hash !== `#${nextMode}`) window.history.replaceState(null, '', `#${nextMode}`)
  }
  return { mode, setMode }
}