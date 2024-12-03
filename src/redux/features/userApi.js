import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const usersApi = createApi({
    reducerPath : 'userApi',
    tagTypes : ["Users"],
    baseQuery : fetchBaseQuery({baseUrl : 'http://localhost:3001/api/user'}),
    endpoints : (builder) => ({
        addUser : builder.mutation({
            query : (newUser) => ({
                url : '/add',
                method : 'POST',
                body : newUser
            }),
            invalidatesTags: ['Users'],
        }),
        getBooks : builder.query({
            query : () => "/get",
            providesTags : ["Users"]
        }),
        deleteUser : builder.mutation({
            query : (_id) => ({
                url : `/delete/${_id}`,
                method : "DELETE"
            }),
            invalidatesTags : ["Users"]
        }),
        getUser : builder.query({
            query: (_id) => `/get/${_id}`,
            providesTags: ['Users'],
        }),
        updateUser : builder.mutation({
            query : ({_id, ...user}) => ({
                url : `/update/${_id}`,
                method : 'PATCH',
                body : user
            }),
            invalidatesTags : ["Users"]
        }),
        searchUser : builder.query({
            query : `/search?query=${query}`,
            providesTags : ["Users"]
        })
    })
})

export const {useAddUserMutation, useGetBooksQuery, useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation, useSearchUserQuery} = usersApi

export default usersApi