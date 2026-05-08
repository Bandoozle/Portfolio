export type PersonalTab =
  | 'about'
  | 'journey'
  | 'mindset'
  | 'interests'
  | 'playlist'
  | 'bucket'
  | 'photos'

export const PERSONAL_TABS: { id: PersonalTab; label: string }[] = [
  { id: 'about', label: 'ABOUT ME' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'mindset', label: 'MINDSET' },
  { id: 'interests', label: 'INTERESTS' },
  { id: 'playlist', label: 'PLAYLIST' },
  { id: 'bucket', label: 'BUCKET LIST' },
  { id: 'photos', label: 'PHOTOS' },
]
