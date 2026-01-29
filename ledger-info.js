import 'dotenv/config'
import { TenzroPlatform } from '@tenzro/platform'

const platform = new TenzroPlatform({
  apiKey: process.env.TENZRO_API_KEY,
  tenantId: process.env.CANTON_APP_ID,
})

async function getLedgerInfo() {
  console.log('Fetching ledger information...\n')

  try {
    // Get ledger identity
    console.log('1. Ledger Identity:')
    const identity = await platform.ledger.getIdentity()
    console.log(JSON.stringify(identity, null, 2))

    // Get ledger time
    console.log('\n2. Ledger Time:')
    const time = await platform.ledger.getTime()
    console.log(JSON.stringify(time, null, 2))

    // List domains
    console.log('\n3. Domains:')
    const domains = await platform.ledger.listDomains()
    console.log(JSON.stringify(domains, null, 2))

    // List parties
    console.log('\n4. Parties:')
    const parties = await platform.ledger.listParties()
    console.log(JSON.stringify(parties, null, 2))

  } catch (error) {
    console.error('Error:', error.message)
    if (error.code) console.error('Code:', error.code)
  }
}

getLedgerInfo()
