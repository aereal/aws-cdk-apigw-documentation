import { Method } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

export class QueryParameterDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  public static fromMethod = (
    method: Method,
    parameterName: string,
    properties: Properties
  ): QueryParameterDocumentationPart =>
    new QueryParameterDocumentationPart(
      method,
      `QueryParameter${parameterName}DocumentationPart`,
      {
        restApi: method.api,
        properties,
        location: {
          type: "QUERY_PARAMETER",
          path: method.resource.path,
          method: method.httpMethod,
          name: parameterName,
        },
      }
    );
}
