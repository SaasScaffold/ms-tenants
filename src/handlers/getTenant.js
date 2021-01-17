const { getTenant } = require('../helpers/tenantHelper')

const handler = async (event) => {
  if (event.requestContext.http.method !== 'GET') {
    throw new Error(`listContentByNamespace only accept GET method, you tried: ${event.requestContext.http.method}`)
  }
  // All log statements are written to CloudWatch
  console.info('received:', event)

  const tenant = await getTenant(event.pathParameters.tenantUuid)

  const response = {
    statusCode: 200,
    body: JSON.stringify(tenant)
  }

  console.info(`response from: ${event.rawPath} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

exports.handler = handler
