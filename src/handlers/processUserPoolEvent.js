const processUserPoolEvent = async ({ body }) => {
  console.info('Processing record', body)
  const parsedBody = JSON.parse(body)
  if (!parsedBody.action) {
    throw new Error('No action supplied')
  }
  if (parsedBody.action !== 'USERPOOL_CREATED') {
    console.info('Unrecognised action: ', parsedBody.action)
    return null
  }
  console.log('received', parsedBody)
  return parsedBody
}

const handler = async event => {
  try {
    const processedEvents = event.Records.map(processUserPoolEvent)
    await Promise.all(processedEvents)
    return { statusCode: 200, body: 'Successfully processed' }
  } catch (e) {
    console.error('ERROR', e)
    return { statusCode: 500, body: e.stack }
  }
}

exports.handler = handler
