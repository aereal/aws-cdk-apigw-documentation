import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

const pattern = /\{(\w+)\}/;

/**
 * PathParameterDocumentationPart represents a documentation part of the path parameter
 */
export class PathParameterDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new PathParameterDocumentationPart from the method
   *
   * @param method - The method which the documentation part describe to
   * @param properties - Additional properties
   */
  public static fromMethod = (
    method: Method,
    properties: Properties
  ): PathParameterDocumentationPart => {
    const m = pattern.exec(method.resource.path);
    if (m === null) {
      throw new Error("No parameter contained in resource path");
    }
    const name = m[1];
    return new PathParameterDocumentationPart(
      method,
      `PathParameter${name}DocumentationPart`,
      {
        restApi: method.api,
        properties,
        location: {
          type: "PATH_PARAMETER",
          path: method.resource.path,
          method: method.httpMethod,
          name,
        },
      }
    );
  };
}
