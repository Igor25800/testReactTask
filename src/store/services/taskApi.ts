import {taskFormValue} from "../../pages/home/home";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiTask = createApi({
    reducerPath: "taskApi",
    tagTypes: ['Task'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_KEY,
    }),
    endpoints: (build) => ({
        getTask: build.query<Array<taskFormValue>, void>({
            query: () => 'task',
            providesTags: ['Task']
        }),
        addTask: build.mutation<ResponseType, taskFormValue>({
            query: (task: taskFormValue) => ({
                url: 'task',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: build.mutation({
            query: (task: taskFormValue) => ({
                url: `task/${task.id}`,
                method: 'PUT',
                body: task,
            }),
            invalidatesTags: ['Task']
        }),
        deleteTask: build.mutation<taskFormValue, string>({
            query: (id: string) => ({
                url: `task/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Task']
        })
    }),
});

export const {useGetTaskQuery,useAddTaskMutation,
    useDeleteTaskMutation, useUpdateTaskMutation  } = apiTask;