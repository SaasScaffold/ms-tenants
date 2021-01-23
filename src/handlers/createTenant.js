const { createTenant } = require('../helpers/tenantHelper')
const { putEvent } = require('../helpers/queueHelper')

const handler = async (event) => {
  // All log statements are written to CloudWatch
  console.info('received:', event)
  if (event.requestContext.http.method !== 'POST') {
    throw new Error(`createTenant only accept POST method, you tried: ${event.requestContext.http.method}`)
  }

  const { name } = JSON.parse(event.body)
  const createdTenant = await createTenant(name)

  const eventToBroadcast = JSON.stringify({
    event: 'TENANT_CREATED',
    data: {
      tenant: createTenant
    }
  })

  await putEvent(eventToBroadcast)

  const response = {
    ACL: 'public-read',
    statusCode: 200,
    body: JSON.stringify(createdTenant)
  }

  console.info(`response from: ${event.rawPath} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

exports.handler = handler
