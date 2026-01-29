import 'dotenv/config'
import { TenzroPlatform } from '@tenzro/platform'

const platform = new TenzroPlatform({
  apiKey: process.env.TENZRO_API_KEY,
  tenantId: process.env.CANTON_APP_ID,
  timeout: 120000,
})

async function createContract() {
  const partyId = process.env.CANTON_PARTY_ID

  console.log('Creating a simple contract on Canton...\n')
  console.log('Party ID:', partyId)

  try {
    // Create a simple token contract
    const contract = await platform.ledger.createContract({
      templateId: 'Tenzro.SimpleAsset:Asset',
      payload: {
        owner: partyId,
        name: 'TestToken',
        amount: '100',
      },
      partyId: partyId,
    })

    console.log('\n✓ Contract created successfully!')
    console.log('Contract ID:', contract.contractId)
    console.log('Transaction ID:', contract.transactionId)
    console.log('\nFull response:', JSON.stringify(contract, null, 2))
    console.log('\nView on Canton Explorer:')
    console.log(`https://explorer.devnet.tenzro.network/contract/${contract.contractId}`)

    return contract
  } catch (error) {
    console.error('\n✗ Contract creation failed:')
    console.error('  Error:', error.message)
    if (error.code) console.error('  Code:', error.code)
    if (error.status) console.error('  Status:', error.status)
    if (error.details) console.error('  Details:', error.details)
  }
}

createContract()
