import 'dotenv/config'
import { TenzroPlatform } from '@tenzro/platform'

const platform = new TenzroPlatform({
  apiKey: process.env.TENZRO_API_KEY,
  tenantId: process.env.CANTON_APP_ID,
})

async function createAndQuery() {
  const partyId = process.env.CANTON_PARTY_ID

  console.log('=== Creating Contract ===\n')

  try {
    const contract = await platform.ledger.createContract({
      templateId: 'Tenzro.SimpleAsset:Asset',
      payload: {
        owner: partyId,
        name: 'QueryTest',
        amount: '50',
      },
      partyId: partyId,
    })

    console.log('Contract created:')
    console.log(JSON.stringify(contract, null, 2))

    console.log('\n=== Querying Contract ===\n')

    // Small delay to let the ledger sync
    await new Promise(r => setTimeout(r, 1000))

    const queried = await platform.ledger.getContract(contract.contractId)
    console.log('Query result:')
    console.log(JSON.stringify(queried, null, 2))

  } catch (error) {
    console.error('Error:', error.message)
    if (error.code) console.error('Code:', error.code)
    if (error.details) console.error('Details:', error.details)
  }
}

createAndQuery()
