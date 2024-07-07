import Api from 'Redux/Api';
import { logOut, setCredentials } from './authSlice';

interface Credentials {
  username: string;
  password: string;
}

const authApiSlice = Api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials: Credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(() => {
            dispatch(logOut());
            dispatch(Api.util.resetApiState());
          })
          .catch((err: unknown) => {
            return err;
          });
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { accessToken } }: { data: { accessToken: string } }) => {
            dispatch(setCredentials({ accessToken }));
          })
          .catch((err: unknown) => {
            return err;
          });
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;
