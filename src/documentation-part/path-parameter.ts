import { IResource, Method, Resource } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

const pattern = /\{(\w+)\}/;

const extractParameter = (resource: IResource): string | undefined => {
  const m = pattern.exec(resource.path);
  if (m === null) {
    return undefined;
  }
  return m[1];
};

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
   * Creates new PathParameterDocumentationPart from the resource
   *
   * @param resource - The source which the documentation part describe to
   * @param properties - Additional properties
   */
  public static fromResource = (
    resource: Resource,
    properties: Properties
  ): PathParameterDocumentationPart => {
    const name = extractParameter(resource);
    if (name === undefined) {
      throw new Error("No parameter contained in resource path");
    }
    return new PathParameterDocumentationPart(
      resource,
      `PathParameter${name}DocumentationPart`,
      {
        restApi: resource.api,
        properties,
        location: {
          type: "PATH_PARAMETER",
          name,
          path: resource.path,
        },
      }
    );
  };

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
    const name = extractParameter(method.resource);
    if (name === undefined) {
      throw new Error("No parameter contained in resource path");
    }
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
