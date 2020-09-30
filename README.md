![CI][ci-badge]
[![NPM version][npm-badge]][npm]

# aws-cdk-apigw-documentation

Collection of constructs for [API Gateway Documentation parts][aws-apigw-documentation-part].

## Synopsis

```
import { ApiDocumentationPart } from "@aereal/aws-cdk-apigw-documentation";
import { RestApi } from "@aws-cdk/aws-apigateway";

const api = new RestApi(this, "Api");

ApiDocumentationPart.fromApi(api, { info: { title: "My API" } });
```

## Installation

```
yarn add @aereal/aws-cdk-apigw-documentation
```

```
npm i -D @aereal/aws-cdk-apigw-documentation
```

## License

MIT License

[aws-apigw-documentation-part]: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-documenting-api-quick-start-with-restapi.html
[ci-badge]: https://github.com/aereal/aws-cdk-apigw-documentation/workflows/CI/badge.svg?branch=main
[npm-badge]: https://img.shields.io/npm/v/@aereal/aws-cdk-apigw-documentatio
[npm]: https://www.npmjs.com/package/@aereal/aws-cdk-apigw-documentation
