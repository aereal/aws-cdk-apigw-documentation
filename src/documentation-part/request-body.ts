import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

export class RequestBodyDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  public static fromMethod = (
    method: Method,
    properties: Properties
  ): RequestBodyDocumentationPart =>
    new RequestBodyDocumentationPart(method, "RequestBodyDocumentationPart", {
      restApi: method.api,
      properties,
      location: {
        type: "REQUEST_BODY",
        path: method.resource.path,
        method: method.httpMethod,
      },
    });
}
