import { RestApiBase } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

/**
 * ApiDocumentationPart represents a documentation part of the API.
 */
export class ApiDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates new ApiDocumentationPart from a REST API.
   *
   * @param restApi - The API which the documentation part describe to
   * @param properties - Additional OpenAPI properties
   */
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
