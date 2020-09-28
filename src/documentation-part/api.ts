import { RestApiBase } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

export class ApiDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  public static fromApi = (
    restApi: RestApiBase,
    properties: Properties
  ): ApiDocumentationPart =>
    new ApiDocumentationPart(restApi, "DocumentationPart", {
      restApi,
      properties,
      location: { type: "API" },
    });
}
