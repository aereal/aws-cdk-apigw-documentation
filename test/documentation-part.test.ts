import { RestApi } from "@aws-cdk/aws-apigateway";
import { App, Stack } from "@aws-cdk/core";
import {
  ApiDocumentationPart,
  MethodDocumentationPart,
  ModelDocumentationPart,
  PathParameterDocumentationPart,
  QueryParameterDocumentationPart,
  RequestBodyDocumentationPart,
  RequestHeaderDocumentationPart,
  ResourceDocumentationPart,
} from "../src/documentation-part";
import "@aws-cdk/assert/jest";

describe("DocumentationPart", () => {
  describe("API", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      ApiDocumentationPart.fromApi(api, { info: { title: "My API" } });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({
          info: { title: "My API" },
        }),
        Location: {
          Type: "API",
        },
      });
    });
  });

  describe("Resource", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const users = api.root.addResource("users");
      ResourceDocumentationPart.fromResource(users, {
        description: "users resource",
      });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "users resource" }),
        Location: {
          Type: "RESOURCE",
          Path: "/users",
        },
      });
    });
  });

  describe("Model", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const user = api.addModel("user", { schema: {} });
      ModelDocumentationPart.fromModel(user, { description: "user model" });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "user model" }),
        Location: {
          Type: "MODEL",
          Name: { Ref: "ApiuserE9EFD678" },
        },
      });
    });
  });

  describe("Method", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const users = api.root.addResource("users");
      const getUser = users.addMethod("GET");
      MethodDocumentationPart.fromMethod(getUser, {
        description: "Get User",
      });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "Get User" }),
        Location: {
          Type: "METHOD",
          Path: "/users",
          Method: "GET",
        },
      });
    });
  });

  describe("Query parameter", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const users = api.root.addResource("users");
      const getUser = users.addMethod("GET");
      QueryParameterDocumentationPart.fromMethod(getUser, "id", {
        description: "user id",
      });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "user id" }),
        Location: {
          Type: "QUERY_PARAMETER",
          Path: "/users",
          Method: "GET",
          Name: "id",
        },
      });
    });
  });

  describe("Request body", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const users = api.root.addResource("users");
      const postUser = users.addMethod("POST");
      RequestBodyDocumentationPart.fromMethod(postUser, {
        description: "post user content",
      });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "post user content" }),
        Location: {
          Type: "REQUEST_BODY",
          Path: "/users",
          Method: "POST",
        },
      });
    });
  });

  describe("Request header", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const users = api.root.addResource("users");
      const postUser = users.addMethod("POST");
      RequestHeaderDocumentationPart.fromMethod(postUser, "x-api-key", {
        description: "api key",
      });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "api key" }),
        Location: {
          Type: "REQUEST_HEADER",
          Path: "/users",
          Method: "POST",
          Name: "x-api-key",
        },
      });
    });
  });

  describe("Path parameter", () => {
    test("have documentation part", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const user = api.root.addResource("users").addResource("{userId}");
      const getUser = user.addMethod("GET");
      PathParameterDocumentationPart.fromMethod(getUser, {
        description: "user id",
      });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "user id" }),
        Location: {
          Type: "PATH_PARAMETER",
          Path: "/users/{userId}",
          Method: "GET",
          Name: "userId",
        },
      });
    });

    test("from resource", () => {
      const app = new App();
      const stack = new Stack(app, "test-stack");
      const api = new RestApi(stack, "Api");
      api.root.addMethod("GET");

      const user = api.root.addResource("users").addResource("{userId}");
      PathParameterDocumentationPart.fromResource(user, {
        description: "user id",
      });
      expect(stack).toHaveResourceLike("AWS::ApiGateway::DocumentationPart", {
        Properties: JSON.stringify({ description: "user id" }),
        Location: {
          Type: "PATH_PARAMETER",
          Path: "/users/{userId}",
          Name: "userId",
        },
      });
    });
  });
});
