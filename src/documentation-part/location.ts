/**
 * A location type which the documentation part describe to
 *
 * @see https://docs.aws.amazon.com/apigateway/api-reference/resource/documentation-part/#location
 */
export type DocumentationLocation =
  | ApiLocation
  | AuthorizerLocation
  | ModelLocation
  | ResourceLocation
  | MethodLocation
  | PathParameterLocation
  | QueryParameterLocation
  | RequestHeaderLocation
  | RequestBodyLocation
  | ResponseLocation
  | ResponseHeaderLocation
  | ResponseBodyLocation;

export interface ApiLocation {
  readonly type: "API";
}

export interface AuthorizerLocation {
  readonly type: "AUTHORIZER";
  readonly name?: string;
}

export interface ModelLocation {
  readonly type: "MODEL";
  readonly name?: string;
}

export interface ResourceLocation {
  readonly type: "RESOURCE";
  readonly path?: string;
}

export interface MethodLocation {
  readonly type: "METHOD";
  readonly path?: string;
  readonly method?: HttpMethod;
}

export interface PathParameterLocation {
  readonly type: "PATH_PARAMETER";
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly name?: string;
}

export interface QueryParameterLocation {
  readonly type: "QUERY_PARAMETER";
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly name?: string;
}

export interface RequestHeaderLocation {
  readonly type: "REQUEST_HEADER";
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly name?: string;
}

export interface RequestBodyLocation {
  readonly type: "REQUEST_BODY";
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly name?: string;
}

export interface ResponseLocation {
  readonly type: "RESPONSE";
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly statusCode?: HttpStatusCode;
}

export interface ResponseHeaderLocation {
  readonly type: "RESPONSE_HEADER";
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly name?: string;
  readonly statusCode?: HttpStatusCode;
}

export interface ResponseBodyLocation {
  readonly type: "RESPONSE_BODY";
  readonly path?: string;
  readonly method?: HttpMethod;
  readonly name?: string;
  readonly statusCode?: HttpStatusCode;
}

type HttpMethod = string;

export type HttpStatusCode = "*" | number;
