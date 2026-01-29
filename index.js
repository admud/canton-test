import { TenzroPlatform } from '@tenzro/platform'

const platform = new TenzroPlatform({
  apiKey: process.env.TENZRO_API_KEY,
  tenantId: process.env.CANTON_APP_ID,
  timeout: 120000, // 2 minute timeout for slow devnet
})

export { platform }
