import { Resource as ApiGWResource } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

export class ResourceDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

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
