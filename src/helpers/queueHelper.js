const SQS = require('aws-sdk/clients/sqs')

const sqs = new SQS({
  region: process.env.AWS_REGION
})

const { SQS_URL } = process.env

exports.putEvent = async (message) => {
  await sqs.sendMessage({
    QueueUrl: SQS_URL,
    MessageBody: message
  }).promise()
}
