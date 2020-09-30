import { Resource as ApiGWResource } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

/**
 * ResourceDocumentationPart represents a documentation part of the resource
 */
export class ResourceDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new ResourceDocumentationPart from the resource.
   *
   * @param resource - The resource which the documentation part describe to
   * @param properties - Additional properties
   */
  public static fromResource = (
    resource: ApiGWResource,
    properties: Properties
  ): ResourceDocumentationPart =>
    new ResourceDocumentationPart(resource, "DocumentationPart", {
      restApi: resource.api,
      properties,
      location: { type: "RESOURCE", path: resource.path },
    });
}
