export type AvatarId = 'default' | 'kawaii' | 'cool' | 'calm' | 'energetic'

export type Avatar = {
  id: AvatarId
  name: string
  description: string
  icon: string
  color: string
  personality: string
}

export const AVATARS: readonly Avatar[] = [
  {
    id: 'default',
    name: 'Estándar',
    description: 'Avatar equilibrado y amigable.',
    icon: '🤖',
    color: 'bg-primary',
    personality: 'Curtés, servicial y neutro.',
  },
  {
    id: 'kawaii',
    name: 'Kawaii',
    description: 'Avatar tierno y expresivo.',
    icon: '💖',
    color: 'bg-pink-500',
    personality: 'Dulce, entusiasta y muy expresivo.',
  },
  {
    id: 'cool',
    name: 'Genial',
    description: 'Avatar tranquilo y moderno.',
    icon: '😎',
    color: 'bg-indigo-600',
    personality: 'Relajado, seguro y directo.',
  },
  {
    id: 'calm',
    name: 'Calma',
    description: 'Avatar sereno y pausado.',
    icon: '🌿',
    color: 'bg-emerald-500',
    personality: 'Paciente, escucha con atención y responde con calma.',
  },
  {
    id: 'energetic',
    name: 'Enérgico',
    description: 'Avatar activo y dinámico.',
    icon: '⚡',
    color: 'bg-orange-500',
    personality: 'Vivo, rápido y lleno de energía.',
  },
]

export const findAvatar = (id: AvatarId): Avatar | undefined => AVATARS.find((a) => a.id === id)

export const DEFAULT_AVATAR_ID: AvatarId = 'default'
