import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
   __typename?: 'Query';
  plants: Array<Plant>;
};


export type QueryPlantsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<PlantWhereUniqueInput>;
  before?: Maybe<PlantWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type PlantWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Plant = {
   __typename?: 'Plant';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  sprayFrequency: Scalars['Int'];
  sunExposure: SunExposure;
  image?: Maybe<Scalars['String']>;
  soilTypes: Soil;
  plantBox?: Maybe<PlantBox>;
};

export enum SunExposure {
  FullSun = 'FULL_SUN',
  HalfSun = 'HALF_SUN',
  NoSun = 'NO_SUN'
}

export enum Soil {
  Sandy = 'SANDY',
  Clay = 'CLAY',
  Silt = 'SILT'
}

export type PlantBox = {
   __typename?: 'PlantBox';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  plants: Array<Plant>;
};


export type PlantBoxPlantsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<PlantWhereUniqueInput>;
  before?: Maybe<PlantWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createOneUser: User;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};

export type UserCreateInput = {
  id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  password: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type User = {
   __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type GetAllPlantsQueryVariables = {};


export type GetAllPlantsQuery = (
  { __typename?: 'Query' }
  & { plants: Array<(
    { __typename?: 'Plant' }
    & Pick<Plant, 'id'>
  )> }
);


export const GetAllPlantsDocument = gql`
    query getAllPlants {
  plants {
    id
  }
}
    `;
export type GetAllPlantsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllPlantsQuery, GetAllPlantsQueryVariables>, 'query'>;

    export const GetAllPlantsComponent = (props: GetAllPlantsComponentProps) => (
      <ApolloReactComponents.Query<GetAllPlantsQuery, GetAllPlantsQueryVariables> query={GetAllPlantsDocument} {...props} />
    );
    
export type GetAllPlantsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAllPlantsQuery, GetAllPlantsQueryVariables>
    } & TChildProps;
export function withGetAllPlants<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllPlantsQuery,
  GetAllPlantsQueryVariables,
  GetAllPlantsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllPlantsQuery, GetAllPlantsQueryVariables, GetAllPlantsProps<TChildProps, TDataName>>(GetAllPlantsDocument, {
      alias: 'getAllPlants',
      ...operationOptions
    });
};
export type GetAllPlantsQueryResult = ApolloReactCommon.QueryResult<GetAllPlantsQuery, GetAllPlantsQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    