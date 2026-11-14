import { useEffect } from 'react'

import { AppShell } from '@/app/app-shell'
import { useI18n } from '@/app/i18n-provider'
import { mountApp } from '@/app/mount'
import { AvatarPage } from '@/features/avatar/avatar-page'
import '@/styles/globals.css'

function AvatarEntry() {
  const { t } = useI18n()
  useEffect(() => {
    document.title = `${t('Avatar de IA')} | ｽﾀｯｸﾁｬﾝ`
  }, [t])
  return (
    <AvatarPage
      renderShell={(actions, content) => (
        <AppShell current="avatar" surfaceName="Avatar de IA" rootHref="../" headerActions={actions}>
          {content}
        </AppShell>
      )}
    />
  )
}

mountApp(<AvatarEntry />)
