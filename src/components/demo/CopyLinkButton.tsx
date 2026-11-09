import { Check, Link2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ajudar } from '../../content/copy'
import { Button } from '../ui/Button'

/** Copia o link da landing (COPY.md 3.13). O texto vira "Link copiado" com check por 2s (§7.7). */
export function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  const copy = async () => {
    const url = window.location.origin + window.location.pathname
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Fallback para navegadores sem a API (ou sem permissão).
      const ta = document.createElement('textarea')
      ta.value = url
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
  }

  return (
    <>
      <Button variant="secondary" onClick={copy} icon={copied ? <Check /> : <Link2 />}>
        {copied ? ajudar.copied : ajudar.cta}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? ajudar.copied : ''}
      </span>
    </>
  )
}
