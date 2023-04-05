import { Fragment, useState } from "react";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BookSearch, BookDelete } from "./BookService";
import { Table, Button } from "antd";
import BookColumns from "./BookModel";




export default function Search() {
    const { status, data, error, refetch } = useQuery({
        queryKey: ['books'],
        queryFn: BookSearch,
        retry: false,
      });

      const queryClient = new QueryClient();
      const deleteBookMutation = useMutation((bookId) => BookDelete(bookId), {
        onSuccess: () => {
          queryClient.invalidateQueries('book');
          refetch();
        },
      });
    
      const handleDelete = (bookId) => {
        deleteBookMutation.mutate(bookId);
      };

  return (
<Table
      pagination={false}
      size={'large'}
      //className={'admin-table'}
    />
  );
}