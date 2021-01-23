const { DocumentClient } = require('aws-sdk/clients/dynamodb')
const { v4: uuidv4 } = require('uuid')

const { TENANT_TABLE } = process.env

const ddb = new DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION })

exports.listTenants = async () => {
  const params = {
    TableName: TENANT_TABLE,
    AttributesToGet: ['uuid']
  }
  const data = await ddb.scan(params).promise()
  return data.Items
}

exports.getTenant = async (uuid) => {
  const params = {
    TableName: TENANT_TABLE,
    Key: {
      uuid
    }
  }
  const tenant = await ddb.get(params).promise()
  console.log('Tenant', tenant)

  return tenant
}

exports.createTenant = async (name) => {
  const uuid = uuidv4()

  const params = {
    TableName: TENANT_TABLE,
    Item: {
      uuid,
      name
    },
  }

  await ddb.put(params).promise()

  const getParams = {
    TableName: TENANT_TABLE,
    Key: {
      uuid
    }
  }
  const createdTenantRecord = await ddb.get(getParams).promise()
  return createdTenantRecord.Item
}
