import { TenzroPlatform } from '@tenzro/platform'

const platform = new TenzroPlatform({
  apiKey: process.env.TENZRO_API_KEY,
  network: process.env.TENZRO_NETWORK || 'devnet',
})

export { platform }
