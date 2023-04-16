/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthType: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Movie: { // root type
    description?: string | null; // String
    directorName: string; // String!
    id: number; // Int!
    movieName: string; // String!
  }
  Mutation: {};
  Query: {};
  Review: { // root type
    comment?: string | null; // String
    id: number; // Int!
    movieId: number; // Int!
    rating: number; // Int!
    userId: number; // Int!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthType: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Movie: { // field return type
    description: string | null; // String
    directorName: string; // String!
    id: number; // Int!
    movieName: string; // String!
  }
  Mutation: { // field return type
    changePassword: NexusGenRootTypes['AuthType']; // AuthType!
    createMovie: NexusGenRootTypes['Movie']; // Movie!
    createReview: NexusGenRootTypes['Review']; // Review!
    deleteMovie: NexusGenRootTypes['Movie'] | null; // Movie
    deleteReview: NexusGenRootTypes['Review'] | null; // Review
    forgotPassword: boolean; // Boolean!
    login: NexusGenRootTypes['AuthType']; // AuthType!
    register: NexusGenRootTypes['AuthType']; // AuthType!
    updateMovie: NexusGenRootTypes['Movie'] | null; // Movie
    updateReview: NexusGenRootTypes['Review'] | null; // Review
  }
  Query: { // field return type
    movie: NexusGenRootTypes['Movie']; // Movie!
    movies: NexusGenRootTypes['Movie'][]; // [Movie!]!
    reviews: NexusGenRootTypes['Review'][]; // [Review!]!
  }
  Review: { // field return type
    comment: string | null; // String
    id: number; // Int!
    movieId: number; // Int!
    movieReview: NexusGenRootTypes['Movie'] | null; // Movie
    rating: number; // Int!
    userId: number; // Int!
    userReview: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthType: { // field return type name
    token: 'String'
    user: 'User'
  }
  Movie: { // field return type name
    description: 'String'
    directorName: 'String'
    id: 'Int'
    movieName: 'String'
  }
  Mutation: { // field return type name
    changePassword: 'AuthType'
    createMovie: 'Movie'
    createReview: 'Review'
    deleteMovie: 'Movie'
    deleteReview: 'Review'
    forgotPassword: 'Boolean'
    login: 'AuthType'
    register: 'AuthType'
    updateMovie: 'Movie'
    updateReview: 'Review'
  }
  Query: { // field return type name
    movie: 'Movie'
    movies: 'Movie'
    reviews: 'Review'
  }
  Review: { // field return type name
    comment: 'String'
    id: 'Int'
    movieId: 'Int'
    movieReview: 'Movie'
    rating: 'Int'
    userId: 'Int'
    userReview: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    password: 'String'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    changePassword: { // args
      password: string; // String!
      token: string; // String!
    }
    createMovie: { // args
      description?: string | null; // String
      directorName: string; // String!
      movieName: string; // String!
    }
    createReview: { // args
      comment?: string | null; // String
      movieId: number; // Int!
      rating: number; // Int!
    }
    deleteMovie: { // args
      id: number; // Int!
    }
    deleteReview: { // args
      id: number; // Int!
    }
    forgotPassword: { // args
      email: string; // String!
    }
    login: { // args
      password: string; // String!
      username: string; // String!
    }
    register: { // args
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
    updateMovie: { // args
      description?: string | null; // String
      directorName?: string | null; // String
      id: number; // Int!
      movieName?: string | null; // String
    }
    updateReview: { // args
      comment?: string | null; // String
      id: number; // Int!
      rating: number; // Int!
    }
  }
  Query: {
    movie: { // args
      id: number; // Int!
    }
    movies: { // args
      filter?: string | null; // String
      orderBy?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}