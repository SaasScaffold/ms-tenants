const SNS = require('aws-sdk/clients/sns')

const sns = new SNS({
  region: process.env.AWS_REGION
})

const { SNS_TOPIC } = process.env

exports.putEvent = async (message) => {
  await sns.publish({
    TopicArn: SNS_TOPIC,
    Message: message
  }).promise()
}
