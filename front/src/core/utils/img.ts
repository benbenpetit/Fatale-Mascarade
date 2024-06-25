export const getAvatarImgSrc = (name: string) =>
  new URL(`/src/assets/img/avatars/${name}.webp`, import.meta.url).href

export const getAreaImgSrc = (areaId: string, extension: 'webp' | 'avif') =>
  new URL(`/src/assets/img/areas/${areaId}.${extension}`, import.meta.url).href

export const getActionImgSrc = (actionId: string) =>
  new URL(`/src/assets/img/actions/${actionId}.svg`, import.meta.url).href

export const getGifSrc = (characterId: string, extension: string) =>
  new URL(`/src/assets/videos/${characterId}.${extension}`, import.meta.url)
    .href
