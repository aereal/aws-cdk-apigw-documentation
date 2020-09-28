import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

export class RequestHeaderDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  public static fromMethod = (
    method: Method,
    parameterName: string,
    properties: Properties
  ): RequestHeaderDocumentationPart =>
    new RequestHeaderDocumentationPart(
      method,
      `RequestHeader${parameterName}DocumentationPart`,
      {
        restApi: method.api,
        properties,
        location: {
          type: "REQUEST_HEADER",
          path: method.resource.path,
          method: method.httpMethod,
          name: parameterName,
        },
      }
    );
}
