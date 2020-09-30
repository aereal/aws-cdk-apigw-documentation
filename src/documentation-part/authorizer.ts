import { Authorizer, RestApiBase } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

/**
 * AuthorizerDocumentationPart represents a documentation part of the Authorizer.
 */
export class AuthorizerDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates an AuthorizerDocumentationPart from the authorizer.
   *
   * @param restApi - The API which the documentation part describe to
   * @param authorizer - The authorizer which the documentation part describe to
   * @param properties - Additional OpenAPI properties
   */
  public static fromAuthorizer = (
    restApi: RestApiBase,
    authorizer: Authorizer,
    properties: Properties
  ): AuthorizerDocumentationPart =>
    new AuthorizerDocumentationPart(restApi, "DocumentationPart", {
      restApi,
      properties,
      location: { type: "AUTHORIZER", name: authorizer.authorizerId },
    });
}
