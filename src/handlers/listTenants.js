const { listTenants } = require('../helpers/tenantHelper')

const handler = async (event) => {
  // All log statements are written to CloudWatch
  console.info('received:', event)
  if (event.requestContext.http.method !== 'GET') {
    throw new Error(`listTenants only accept GET method, you tried: ${event.requestContext.http.method}`)
  }

  const tenants = await listTenants()

  const response = {
    statusCode: 200,
    body: JSON.stringify(tenants)
  }

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.rawPath} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

exports.handler = handler
