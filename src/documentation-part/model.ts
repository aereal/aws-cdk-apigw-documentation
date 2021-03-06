import { CfnModel, Model } from "@aws-cdk/aws-apigateway";
import { Construct } from "@aws-cdk/core";
import { DocumentationPart, DocumentationPartProps } from "./base";
import { Properties } from "./properties";

/**
 * ModelDocumentationPart represents a documentation part of the model
 */
export class ModelDocumentationPart extends DocumentationPart {
  private constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);
  }

  /**
   * Creates a new ModelDocumentationPart from the model
   *
   * @param model - The model which the documentation part describe to
   * @param properties - Additional properties
   */
  public static fromModel = (
    model: Model,
    properties: Properties
  ): ModelDocumentationPart =>
    new ModelDocumentationPart(model, "DocumentationPart", {
      restApi: apiRefModel(model),
      properties,
      location: { type: "MODEL", name: model.modelId },
    });
}

const apiRefModel = (model: Model): IRestApiRef => {
  const cfnModel = model.node.defaultChild as CfnModel | undefined;
  if (cfnModel === undefined) {
    throw new Error("[BUG] no CfnModel found");
  }
  return { restApiId: cfnModel.restApiId };
};

interface IRestApiRef {
  readonly restApiId: string;
}
