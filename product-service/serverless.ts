import type { AWS } from "@serverless/typescript";
import getProductsList from "@functions/getProductsList";
import getProductsById from "@functions/getProductsById";
import createProduct from "@functions/createProduct";
import catalogBatchProcess from "@functions/catalogBatchProcess";

const serverlessConfiguration: AWS = {
  service: "book-shop-product-service",
  useDotenv: true,
  frameworkVersion: "3",
  plugins: [
    "serverless-auto-swagger",
    "serverless-esbuild",
    "serverless-offline",
  ],
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    autoswagger: {
      basePath: "/dev",
      host: "6obctl4bmf.execute-api.eu-central-1.amazonaws.com",
      typefiles: ["./src/types/types.ts"],
    },
  },

  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-central-1",
    deploymentMethod: "direct",
    versionFunctions: false,
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      TABLE_PRODUCTS: "${env:TABLE_PRODUCTS}",
      TABLE_STOCKS: "${env:TABLE_STOCKS}",
      SNS_TOPIC_ARN: { Ref: "createProductTopic" },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*"],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: ["sqs:ReceiveMessage"],
            Resource: { "Fn::GetAtt": ["catalogItemsQueue", "Arn"] },
          },
          {
            Effect: "Allow",
            Action: "sns:Publish",
            Resource: { Ref: "createProductTopic" },
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
    catalogBatchProcess,
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
        },
      },
      createProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "createProductTopic",
        },
      },
      createProductSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "${env:EMAIL_USER_TO_BE_NOTIFIED_1}",
          Protocol: "email",
          TopicArn: { Ref: "createProductTopic" },
        },
      },
      createProductSubscriptionLowPrice: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "${env:EMAIL_USER_TO_BE_NOTIFIED_2}",
          Protocol: "email",
          TopicArn: { Ref: "createProductTopic" },
          FilterPolicy: {
            price: [{ numeric: ["<=", 10] }],
          },
        },
      },
    },
  },

  package: { individually: true },
};

module.exports = serverlessConfiguration;
