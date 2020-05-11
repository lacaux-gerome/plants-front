export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResp = {
   __typename?: 'AuthResp';
  success: Scalars['Boolean'];
  user: User;
};

export enum CardinalPoint {
  North = 'NORTH',
  South = 'SOUTH',
  East = 'EAST',
  West = 'WEST'
}

export type Plant = {
   __typename?: 'Plant';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  sprayFrequency: Scalars['Int'];
  cardinalPoint: Array<CardinalPoint>;
  shortExposure: ShortExposure;
  image?: Maybe<Scalars['String']>;
  soilTypes: Array<Soil>;
};

export type Query = {
   __typename?: 'Query';
  loginAdminUser: AuthResp;
  createPlant: Plant;
  deletePlant: Plant;
  updatePlant: Plant;
};


export type QueryLoginAdminUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryCreatePlantArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  sprayFrequency: Scalars['Int'];
  shortExposure: ShortExposure;
  soilTypes?: Maybe<Array<Soil>>;
  cardinalPoint?: Maybe<Array<CardinalPoint>>;
};


export type QueryDeletePlantArgs = {
  id: Scalars['Int'];
};


export type QueryUpdatePlantArgs = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sprayFrequency?: Maybe<Scalars['Int']>;
  shortExposure?: Maybe<ShortExposure>;
  soilTypes?: Maybe<Array<Soil>>;
  cardinalPoint?: Maybe<Array<CardinalPoint>>;
};

export enum ShortExposure {
  FullSun = 'FULL_SUN',
  HalfSun = 'HALF_SUN',
  NoSun = 'NO_SUN'
}

export enum Soil {
  Sandy = 'SANDY',
  Clay = 'CLAY',
  Silt = 'SILT'
}

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


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
    