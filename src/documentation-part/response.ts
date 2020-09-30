import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { HttpStatusCode } from "./location";
import { Properties } from "./properties";

/**
 * ResponseDocumentationPart represents a documentation part of the response
 */
export class ResponseDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new ResponseDocumentationPart from the method.
   *
   * @param method - The method which the documentation part describe to
   * @param statusCode - A status code
   * @param properties - Additional properties
   */
  public static fromMethod = (
    method: Method,
    statusCode: HttpStatusCode,
    properties: Properties
  ): ResponseDocumentationPart => {
    return new ResponseDocumentationPart(
      method,
      `Response${statusCode}DocumentationPart`,
      {
        restApi: method.api,
        properties,
        location: {
          type: "RESPONSE",
          statusCode,
          path: method.resource.path,
          method: method.httpMethod,
        },
      }
    );
  };
}
