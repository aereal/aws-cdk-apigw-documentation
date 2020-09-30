import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

/**
 * RequestHeaderDocumentationPart represents a documentation part of the request header
 */
export class RequestHeaderDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new RequestHeaderDocumentationPart from the method.
   *
   * @param method - The method which the documentation part describe to
   * @param parameterName - A parameter name
   * @param properties - Additional properties
   */
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
