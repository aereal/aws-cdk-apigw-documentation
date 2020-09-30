import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { HttpStatusCode } from "./location";
import { Properties } from "./properties";

/**
 * ResponseHeaderDocumentationPart represents a documentation part of the response header.
 */
export class ResponseHeaderDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new ResponseHeaderDocumentationPart from the method and status code.
   *
   * @param method - The method which the documentation part describe to
   * @param statusCode - A status code
   * @param name - A header name
   * @param properties - Additional properties
   */
  public static fromMethod = (
    method: Method,
    statusCode: HttpStatusCode,
    name: string,
    properties: Properties
  ): ResponseHeaderDocumentationPart => {
    return new ResponseHeaderDocumentationPart(
      method,
      `ResponseHeader${statusCode}${name}DocumentationPart`,
      {
        restApi: method.api,
        properties,
        location: {
          type: "RESPONSE_HEADER",
          statusCode,
          path: method.resource.path,
          method: method.httpMethod,
          name,
        },
      }
    );
  };
}
