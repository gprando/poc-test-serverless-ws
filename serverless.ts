
module.exports = {
  useDotenv: true,
  service: "test-websocket-service",
  frameworkVersion: "2",
  package: {
    individually: true,
    excludeDevDependencies: false
  },
  plugins: ["serverless-offline", "serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "us-east-1",
    stackName: "custom-stack-name",
    apiName: "test-websockets-api",
    websocketsApiName: "test-websockets-socket",
    websocketsApiRouteSelectionExpression: "$request.body.action", // define qual é a propriedade que irá definir a rota que será executada
    profile: "dev",
    memorySize: 512,
    timeout: 10,
    logRetentionInDays: 14,
    deploymentPrefix: "serverless",
    disableDefaultOutputExportNames: false,
    lambdaHashingVersion: 20201221,
    cloudFront: null,
    versionFunctions: false,
    environment: {
      serviceEnvVar: 123456789
    },
    endpointType: "regional",
    apiGateway: {
      websocketApiId: null,
      apiKeySourceType: "HEADER",
      description: "test websocket",
      disableDefaultEndpoint: true,
      binaryMediaTypes: [
        "*/*"
      ],
      metrics: false,
      shouldStartNameWithService: false
    }
  },
  functions: {
    "websocket-connect": {
      handler: "src/handler.connectFunction",
      events: [
        {
          websocket: {
            route: "$connect"
          }
        }
      ],
      timeout: 10
    },
   
    "websocket-default": {
      handler: "src/handler.defaultFunction",
      events: [
        {
          websocket: {
            route: "$default"
          }
        }
      ],
      timeout: 10
    },
    "websocket-disconnect": {
      handler: "src/handler.disconnectFunction",
      events: [
        {
          websocket: {
            route: "$disconnect"
          }
        }
      ],
      timeout: 10
    },
    "websocket-on-message": {
      handler: "src/handler.onMessageFunction",
      events: [
        {
          websocket: {
            route: "$sendmessage"
          }
        }
      ],
      timeout: 10
    },
    "websocket-join-room": {
      handler: "src/handler.joinRoom",
      events: [
        {
          websocket: {
            route: "$joinroom"
          }
        }
      ],
      timeout: 10
    }
  }
};
