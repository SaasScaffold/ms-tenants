const path = require('path')
const AwsSamPlugin = require('aws-sam-webpack-plugin')

const awsSamPlugin = new AwsSamPlugin()

module.exports = {
  // Loads the entry object from the AWS::Serverless::Function resources in your
  // SAM config. Setting this to a function will
  entry: () => awsSamPlugin.entry(),

  // Write the output to the .aws-sam/build folder
  output: {
    filename: '[name]/app.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '/.aws-sam/build/')
  },

  // Resolve .js extensions
  resolve: {
    extensions: ['.js']
  },

  // Target node
  target: 'node',

  // Exclude SDK
  externals: [
    'aws-sdk',
    'aws-sdk/clients/dynamodb',
    'aws-sdk/clients/sns',
    'aws-sdk/clients/sqs',
    'aws-sdk/clients/apigatewaymanagementapi'
  ],

  // Set the webpack mode
  mode: process.env.NODE_ENV || 'production',

  // Add the AWS SAM Webpack plugin
  plugins: [awsSamPlugin]
}
