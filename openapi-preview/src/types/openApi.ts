export interface OpenApiRef {
  $ref: string;
}

export type OpenApiMaybeRef<T> = T | OpenApiRef;

export interface OpenApiParameter {
  name: string;
  in?: string;
  description?: string;
  required?: boolean;
  schema?: {
    type?: string;
    default?: string | number | boolean;
    example?: string | number | boolean;
  };
  example?: string | number | boolean;
}

export interface OpenApiResponse {
  description: string;
}

export interface OpenApiPathMethod {
  summary?: string;
  parameters?: OpenApiMaybeRef<OpenApiParameter>[];
  description?: string;
  responses?: Record<string, OpenApiMaybeRef<OpenApiResponse>>;
  operationId?: string;
  tags?: string[];
}

export interface OpenApiPaths {
  [path: string]: Record<string, OpenApiPathMethod>;
}

export interface OpenApiDocument {
  openapi: string;
  info?: {
    title?: string;
    version?: string;
    description?: string;
    termsOfService?: string;
    contact?: {
      name?: string;
      url?: string;
      email?: string;
    };
    license?: {
      name?: string;
      url?: string;
    };
  };
  paths: OpenApiPaths;
  components?: {
    parameters?: Record<string, OpenApiParameter>;
    responses?: Record<string, OpenApiResponse>;
    schemas?: Record<string, unknown>;
  };
}
