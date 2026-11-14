import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useI18n } from '@/app/i18n-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { AVATARS, type Avatar, type AvatarId, DEFAULT_AVATAR_ID, findAvatar } from '@/features/avatar/avatar-types'

export function AvatarPage({
  renderShell,
}: {
  renderShell: (actions: React.ReactNode, content: React.ReactNode) => React.ReactNode
}) {
  const { t } = useI18n()
  const [selectedId, setSelectedId] = useState<AvatarId>(DEFAULT_AVATAR_ID)
  const [applied, setApplied] = useState<boolean>(false)

  const avatar = findAvatar(selectedId)

  useEffect(() => {
    document.title = `${t('Avatar de IA')} | ｽﾀｯｸﾁｬﾝ`
  }, [t])

  const apply = () => {
    setApplied(true)
    setTimeout(() => setApplied(false), 1800)
  }

  const colorClass = (color: string) => cn('rounded-xl p-3 shadow-sm border border-border/50', color)

  const actions = (
    <>
      <Button id="apply-avatar" variant="outline" disabled={!avatar || applied} onClick={apply}>
        {applied ? <Check className="mr-2 size-4" /> : <Sparkles className="mr-2 size-4" />}
        {t(applied ? 'Avatar aplicado' : 'Aplicar avatar')}
      </Button>
    </>
  )

  const content = (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(26rem,1fr)_minmax(24rem,36rem)]">
      <section
        className="grid min-h-[38rem] content-start gap-6 overflow-auto bg-simulator-stage p-4 sm:p-6 lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)]"
        aria-labelledby="avatar-preview-heading"
      >
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">Persona de IA</p>
            <h1 id="avatar-preview-heading" className="text-xl font-semibold">Avatar de IA</h1>
          </div>
          <p className="text-sm text-muted-foreground">{t('Elige la personalidad de tu Stack-chan.')}</p>
        </header>
        <div className="grid min-h-72 place-items-center">
          <Card className="min-h-[22rem] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border/50">
            <div
              className={cn(
                'size-24 rounded-full flex items-center justify-center text-6xl shadow-lg border border-white/40 bg-white/10',
                avatar?.color.replace('bg-', 'bg-'),
              )}
            >
              <span aria-hidden="true">{avatar?.icon}</span>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">{avatar?.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{avatar?.personality}</p>
            </div>
          </Card>
        </div>
        <p
          role="status"
          className={cn(
            'text-sm text-center',
            applied ? 'text-success' : 'text-muted-foreground',
          )}
        >
          {applied ? t('Avatar aplicado a Stack-chan.') : t('Selecciona un avatar y aplícalo.')}
        </p>
      </section>
      <aside className="overflow-auto border-l bg-card p-4 sm:p-5 lg:h-[calc(100dvh-4rem)]">
        <Card>
          <CardHeader>
            <CardTitle>{t('Disponibles')}</CardTitle>
            <CardDescription>{t('Selecciona el avatar que usar Stack-chan.')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {AVATARS.map((a) => {
              const selected = selectedId === a.id
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={selected}
                  className={cn(
                    'flex items-center gap-4 rounded-xl border p-3 transition-colors',
                    selected
                      ? 'border-primary bg-primary/10 text-primary-foreground'
                      : 'border-border bg-background hover:bg-muted',
                  )}
                  onClick={() => {
                    setSelectedId(a.id)
                    setApplied(false)
                  }}
                >
                  <div
                    className={cn(
                      'size-12 rounded-full flex items-center justify-center text-3xl shadow-sm border border-white/40 bg-white/80',
                      a.color.replace('bg-', 'bg-'),
                    )}
                  >
                    <span aria-hidden="true">{a.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium">{a.name}</span>
                      {selected && <Check className="size-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{a.personality}</p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground shrink-0" aria-hidden="true" />
                </button>
              )
            })}
          </CardContent>
        </Card>
        <Separator className="my-5" />
        <Card>
          <CardHeader>
            <CardTitle>{t('Vista previa')}</CardTitle>
            <CardDescription>{t('Así se verá Stack-chan con el avatar seleccionado.')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <div className="size-20 rounded-full flex items-center justify-center text-4xl shadow-sm border">
              <span aria-hidden="true">{avatar?.icon}</span>
            </div>
            <div className="text-center">
              <h3 className="font-semibold">{avatar?.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{avatar?.description}</p>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )

  return renderShell(actions, content)
}
