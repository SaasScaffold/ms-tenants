const path = require("path");
const AwsSamPlugin = require("aws-sam-webpack-plugin");

const awsSamPlugin = new AwsSamPlugin();

module.exports = {
  // Loads the entry object from the AWS::Serverless::Function resources in your
  // SAM config. Setting this to a function will
  entry: () => awsSamPlugin.entry(),

  // Write the output to the .aws-sam/build folder
  output: {
    filename: (chunkData) => awsSamPlugin.filename(chunkData),
    libraryTarget: "commonjs2",
    path: path.resolve(".")
  },

  // Create source maps
  devtool: "source-map",

  // Resolve .ts and .js extensions
  resolve: {
    extensions: [".js"]
  },

  // Target node
  target: "node",

  // Exclude SDK
  externals: [
    'aws-sdk',
    'aws-sdk/clients/dynamodb',
    'aws-sdk/clients/sqs',
    'aws-sdk/clients/apigatewaymanagementapi'
  ],

  // Set the webpack mode
  mode: process.env.NODE_ENV || "production",

  // Add the TypeScript loader
  module: {
    rules: [
      { test: /\.jsx?$/, loader: "babel-loader" }
    ]
  },

  // Add the AWS SAM Webpack plugin
  plugins: [awsSamPlugin]
}
