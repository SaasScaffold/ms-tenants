const handler = async (event) => {
  if (event.requestContext.http.method !== 'GET') {
    throw new Error(`updateTenant only accept GET method, you tried: ${event.requestContext.http.method}`)
  }
  // All log statements are written to CloudWatch
  console.info('received:', event)

  return null
  // const content = await listContent(event.pathParameters.namespace, event.pathParameters.client)

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify(content)
  // }

  // // All log statements are written to CloudWatch
  // console.info(`response from: ${event.rawPath} statusCode: ${response.statusCode} body: ${response.body}`)
  // return response
}

exports.handler = handler
