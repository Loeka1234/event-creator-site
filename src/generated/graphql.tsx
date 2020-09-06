import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  events: Array<Event>;
  eventById?: Maybe<Event>;
  paginatedReservations: PaginatedReservationsResponse;
};


export type QueryEventByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPaginatedReservationsArgs = {
  cursor?: Maybe<Scalars['Float']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  amountReservations: Scalars['Int'];
  maxReservations?: Maybe<Scalars['Int']>;
  reservations: Array<Reservation>;
  startDate: Scalars['Float'];
  endDate?: Maybe<Scalars['Float']>;
  creatorId: Scalars['Float'];
  creator: User;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  eventId: Scalars['Int'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type PaginatedReservationsResponse = {
  __typename?: 'PaginatedReservationsResponse';
  reservations: Array<Reservation>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createEvent: EventResponse;
  updateEvent?: Maybe<Event>;
  deleteEvent: Scalars['Boolean'];
  reserve: ReserveResponse;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateEventArgs = {
  endDate?: Maybe<Scalars['Float']>;
  startDate: Scalars['Float'];
  maxReservations?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationUpdateEventArgs = {
  endDate?: Maybe<Scalars['Float']>;
  useEndDate?: Maybe<Scalars['Boolean']>;
  startDate?: Maybe<Scalars['Float']>;
  maxReservations?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationReserveArgs = {
  eventId: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  error?: Maybe<FieldError>;
  event?: Maybe<Event>;
};

export type ReserveResponse = {
  __typename?: 'ReserveResponse';
  error?: Maybe<Scalars['String']>;
  fieldError?: Maybe<FieldError>;
  success: Scalars['Boolean'];
};

export type ReservationSnippetFragment = (
  { __typename?: 'Reservation' }
  & Pick<Reservation, 'id' | 'email' | 'name' | 'eventId' | 'createdAt' | 'updatedAt'>
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type CreateEventMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  maxReservations?: Maybe<Scalars['Int']>;
  startDate: Scalars['Float'];
  endDate?: Maybe<Scalars['Float']>;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent: (
    { __typename?: 'EventResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>, event?: Maybe<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'amountReservations' | 'maxReservations'>
    )> }
  ) }
);

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEvent'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'updatedAt' | 'createdAt'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type ReserveMutationVariables = Exact<{
  eventId: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
}>;


export type ReserveMutation = (
  { __typename?: 'Mutation' }
  & { reserve: (
    { __typename?: 'ReserveResponse' }
    & Pick<ReserveResponse, 'error' | 'success'>
    & { fieldError?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type UpdateEventMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  maxReservations?: Maybe<Scalars['Int']>;
  useEndDate?: Maybe<Scalars['Boolean']>;
  endDate?: Maybe<Scalars['Float']>;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEvent?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'description' | 'creatorId' | 'amountReservations' | 'maxReservations' | 'startDate' | 'endDate'>
  )> }
);

export type EventByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventByIdQuery = (
  { __typename?: 'Query' }
  & { eventById?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'title' | 'description' | 'amountReservations' | 'maxReservations' | 'startDate' | 'endDate'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'description' | 'maxReservations' | 'amountReservations' | 'startDate' | 'endDate'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type PaginatedReservationsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Float']>;
}>;


export type PaginatedReservationsQuery = (
  { __typename?: 'Query' }
  & { paginatedReservations: (
    { __typename?: 'PaginatedReservationsResponse' }
    & Pick<PaginatedReservationsResponse, 'hasMore'>
    & { reservations: Array<(
      { __typename?: 'Reservation' }
      & ReservationSnippetFragment
    )> }
  ) }
);

export const ReservationSnippetFragmentDoc = gql`
    fragment ReservationSnippet on Reservation {
  id
  email
  name
  eventId
  createdAt
  updatedAt
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    error {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($title: String!, $description: String, $maxReservations: Int, $startDate: Float!, $endDate: Float) {
  createEvent(title: $title, description: $description, maxReservations: $maxReservations, startDate: $startDate, endDate: $endDate) {
    error {
      field
      message
    }
    event {
      id
      title
      description
      startDate
      endDate
      amountReservations
      maxReservations
    }
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      maxReservations: // value for 'maxReservations'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: Int!) {
  deleteEvent(id: $id)
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, baseOptions);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    error {
      field
      message
    }
    user {
      id
      username
      email
      updatedAt
      createdAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, password: $password, email: $email) {
    error {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ReserveDocument = gql`
    mutation Reserve($eventId: Int!, $email: String!, $name: String!) {
  reserve(eventId: $eventId, email: $email, name: $name) {
    fieldError {
      field
      message
    }
    error
    success
  }
}
    `;
export type ReserveMutationFn = Apollo.MutationFunction<ReserveMutation, ReserveMutationVariables>;

/**
 * __useReserveMutation__
 *
 * To run a mutation, you first call `useReserveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReserveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reserveMutation, { data, loading, error }] = useReserveMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useReserveMutation(baseOptions?: Apollo.MutationHookOptions<ReserveMutation, ReserveMutationVariables>) {
        return Apollo.useMutation<ReserveMutation, ReserveMutationVariables>(ReserveDocument, baseOptions);
      }
export type ReserveMutationHookResult = ReturnType<typeof useReserveMutation>;
export type ReserveMutationResult = Apollo.MutationResult<ReserveMutation>;
export type ReserveMutationOptions = Apollo.BaseMutationOptions<ReserveMutation, ReserveMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($title: String!, $description: String, $id: Int!, $maxReservations: Int, $useEndDate: Boolean, $endDate: Float) {
  updateEvent(title: $title, description: $description, id: $id, maxReservations: $maxReservations, useEndDate: $useEndDate, endDate: $endDate) {
    id
    title
    description
    creatorId
    amountReservations
    maxReservations
    startDate
    endDate
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      id: // value for 'id'
 *      maxReservations: // value for 'maxReservations'
 *      useEndDate: // value for 'useEndDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, baseOptions);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const EventByIdDocument = gql`
    query EventById($id: Int!) {
  eventById(id: $id) {
    title
    description
    amountReservations
    maxReservations
    startDate
    endDate
    creator {
      username
    }
  }
}
    `;

/**
 * __useEventByIdQuery__
 *
 * To run a query within a React component, call `useEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventByIdQuery(baseOptions?: Apollo.QueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
        return Apollo.useQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, baseOptions);
      }
export function useEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          return Apollo.useLazyQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, baseOptions);
        }
export type EventByIdQueryHookResult = ReturnType<typeof useEventByIdQuery>;
export type EventByIdLazyQueryHookResult = ReturnType<typeof useEventByIdLazyQuery>;
export type EventByIdQueryResult = Apollo.QueryResult<EventByIdQuery, EventByIdQueryVariables>;
export const EventsDocument = gql`
    query Events {
  events {
    id
    title
    description
    maxReservations
    amountReservations
    startDate
    endDate
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PaginatedReservationsDocument = gql`
    query PaginatedReservations($limit: Int!, $cursor: Float) {
  paginatedReservations(limit: $limit, cursor: $cursor) {
    reservations {
      ...ReservationSnippet
    }
    hasMore
  }
}
    ${ReservationSnippetFragmentDoc}`;

/**
 * __usePaginatedReservationsQuery__
 *
 * To run a query within a React component, call `usePaginatedReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedReservationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePaginatedReservationsQuery(baseOptions?: Apollo.QueryHookOptions<PaginatedReservationsQuery, PaginatedReservationsQueryVariables>) {
        return Apollo.useQuery<PaginatedReservationsQuery, PaginatedReservationsQueryVariables>(PaginatedReservationsDocument, baseOptions);
      }
export function usePaginatedReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedReservationsQuery, PaginatedReservationsQueryVariables>) {
          return Apollo.useLazyQuery<PaginatedReservationsQuery, PaginatedReservationsQueryVariables>(PaginatedReservationsDocument, baseOptions);
        }
export type PaginatedReservationsQueryHookResult = ReturnType<typeof usePaginatedReservationsQuery>;
export type PaginatedReservationsLazyQueryHookResult = ReturnType<typeof usePaginatedReservationsLazyQuery>;
export type PaginatedReservationsQueryResult = Apollo.QueryResult<PaginatedReservationsQuery, PaginatedReservationsQueryVariables>;