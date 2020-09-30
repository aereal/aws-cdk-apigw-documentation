import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

/**
 * MethodDocumentationPart represents a documentation part of the method.
 */
export class MethodDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new MethodDocumentationPart from a method.
   *
   * @param method - The method which the documentation part describe to
   * @param properties - Additional properties
   */
  public static fromMethod = (
    method: Method,
    properties: Properties
  ): MethodDocumentationPart =>
    new MethodDocumentationPart(method, "DocumentationPart", {
      restApi: method.api,
      properties,
      location: {
        type: "METHOD",
        path: method.resource.path,
        method: method.httpMethod,
      },
    });
}
