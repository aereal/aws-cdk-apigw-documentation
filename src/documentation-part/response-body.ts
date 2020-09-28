import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { HttpStatusCode } from "./location";
import { Properties } from "./properties";

export class ResponseBodyDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  public static fromMethod = (
    method: Method,
    statusCode: HttpStatusCode,
    properties: Properties
  ): ResponseBodyDocumentationPart => {
    return new ResponseBodyDocumentationPart(
      method,
      `ResponseBody${statusCode}DocumentationPart`,
      {
        restApi: method.api,
        properties,
        location: {
          type: "RESPONSE_BODY",
          statusCode,
          path: method.resource.path,
          method: method.httpMethod,
        },
      }
    );
  };
}
