import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'book-shop-import-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline'],

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      basePath: '/dev',
      host: 'https://w1dhud1cml.execute-api.eu-central-1.amazonaws.com',
    },
  },

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    deploymentMethod: 'direct',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BUCKET_REGION: 'eu-central-1',
      BUCKET_NAME: 'book-shop-import-service-bucket',
      UPLOAD_FOLDER: 'uploaded',
      PARSED_FOLDER: 'parsed',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: ['arn:aws:s3:::book-shop-import-service-bucket'],
      },
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: ['arn:aws:s3:::book-shop-import-service-bucket/*'],
      },
    ],
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
