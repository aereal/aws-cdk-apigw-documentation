import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

/**
 * RequestBodyDocumentationPart represents a documentation part of the request body
 */
export class RequestBodyDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new RequestBodyDocumentationPart from the method
   *
   * @param method - The method which the documentation part describe to
   * @param properties - Additional properties
   */
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
