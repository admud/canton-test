import 'dotenv/config'
import { TenzroPlatform } from '@tenzro/platform'

const platform = new TenzroPlatform({
  apiKey: process.env.TENZRO_API_KEY,
  tenantId: process.env.CANTON_APP_ID,
  // Uses default: https://api.platform.tenzro.com
})

async function testConnection() {
  console.log('Testing Canton node connection...\n')

  try {
    // Test 1: List available domains
    console.log('1. Listing domains...')
    const domains = await platform.ledger.listDomains()
    console.log('   Domains:', domains)

    // Test 2: Get balance for our party
    console.log('\n2. Getting balance for party...')
    const partyId = process.env.CANTON_PARTY_ID
    console.log('   Party ID:', partyId)
    const balance = await platform.ledger.getBalance(partyId)
    console.log('   Balance:', balance)

    console.log('\n✓ Connection successful!')
  } catch (error) {
    console.error('\n✗ Connection failed:')
    console.error('  Error:', error.message)
    if (error.code) console.error('  Code:', error.code)
    if (error.status) console.error('  Status:', error.status)
  }
}

testConnection()
