import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

const pattern = /\{(\w+)\}/;

export class PathParameterDocumentationPart extends DocumentationPart {
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
