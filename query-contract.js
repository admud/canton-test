import 'dotenv/config'
import { TenzroPlatform } from '@tenzro/platform'

const platform = new TenzroPlatform({
  apiKey: process.env.TENZRO_API_KEY,
  tenantId: process.env.CANTON_APP_ID,
  timeout: 120000,
})

const contractId = process.argv[2] || '009c1f73b92aa74ef7bffe23dda2a12281::tenzro-devnet'

async function queryContract() {
  console.log('Querying contract from Canton ledger...\n')
  console.log('Contract ID:', contractId)

  try {
    const contract = await platform.ledger.getContract(contractId)

    console.log('\n✓ Contract found!')
    console.log('\nContract details:')
    console.log(JSON.stringify(contract, null, 2))
  } catch (error) {
    console.error('\n✗ Query failed:')
    console.error('  Error:', error.message)
    if (error.code) console.error('  Code:', error.code)
    if (error.status) console.error('  Status:', error.status)
  }
}

queryContract()
