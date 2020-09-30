import { CfnDocumentationPart } from "@aws-cdk/aws-apigateway";
import { Construct, IResource, Resource, ResourceProps } from "@aws-cdk/core";
import { DocumentationLocation } from "./location";
import { Properties } from "./properties";

export interface IDocumentationPart extends IResource {
  /**
   * ID of the documentation part.
   */
  readonly documentationPartId: string;
}

export interface DocumentationPartProps extends ResourceProps {
  /**
   * A location which the documentation part describe to
   *
   * @see https://docs.aws.amazon.com/apigateway/api-reference/resource/documentation-part/#location
   */
  readonly location: DocumentationLocation;

  /**
   * Additional properties.
   *
   * @see https://docs.aws.amazon.com/apigateway/api-reference/resource/documentation-part/#properties
   */
  readonly properties: Properties;

  readonly restApi: IRestApiRef;
}

/**
 * DocumentationPart is a construct for AWS::ApiGateway::DocumentationPart.
 *
 * You can use other concrete documentation part constructs for convinient.
 */
export class DocumentationPart extends Resource implements IDocumentationPart {
  public readonly documentationPartId: string;

  public constructor(
    scope: Construct,
    id: string,
    props: DocumentationPartProps
  ) {
    super(scope, id, props);

    const resource = new CfnDocumentationPart(this, "Resource", {
      restApiId: props.restApi.restApiId,
      properties: JSON.stringify(props.properties),
      location: renderLocation(props.location),
    });
    this.node.defaultChild = resource;
    this.documentationPartId = resource.ref;
  }
}

const renderLocation = (
  loc: DocumentationLocation
): CfnDocumentationPart.LocationProperty => {
  type Mutable<T> = { -readonly [K in keyof T]: T[K] };
  const props: Mutable<CfnDocumentationPart.LocationProperty> = {
    type: loc.type,
  };
  if ("statusCode" in loc) {
    props.statusCode = loc.statusCode?.toString();
  }
  if ("path" in loc) {
    props.path = loc.path;
  }
  if ("method" in loc) {
    props.method = loc.method;
  }
  if ("name" in loc) {
    props.name = loc.name;
  }
  return props;
};

interface IRestApiRef {
  readonly restApiId: string;
}
