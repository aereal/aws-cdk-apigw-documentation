import { Authorizer, RestApiBase } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

export class AuthorizerDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

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
