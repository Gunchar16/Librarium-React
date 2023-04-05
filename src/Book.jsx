import BookColumns from './BookModel';
import { useQuery, useMutation,  QueryClient } from '@tanstack/react-query';
import { BooksGetAll, BookDelete,  AuthorizeUser } from './BookService';
import { Table, Button } from 'antd';
import { Fragment, useContext } from 'react';
import { userContext } from './UserContext.js';

const credentials = {
    email: "giorgiioseliani16@gmail.com",
    password: "string123"
  }

export default function Book() {

  const asd = useContext(userContext);  


  const token = useMutation(() => AuthorizeUser(credentials), {
        onSuccess: (data) => asd.setUser(credentials.email, data.data)});

  const {  data,  refetch } = useQuery({
    queryKey: ['book'],
    queryFn: BooksGetAll,
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
  
  const handleAuthorize = () => {
    token.mutate(credentials);
  }

  return ( 
    <Fragment>
    <Button onClick={() => handleAuthorize(credentials)}>AUTHORIZE</Button>
    <Table
      pagination={false}
      size={'large'}
      //className={'admin-table'}
      dataSource={data?.data?.map((book) => {
        return {
          key: book?.id,
          ...book,
          delete: (
            <Button danger onClick={() => handleDelete(book?.id)}>
              Delete
            </Button>
          ),
        };
      })}
      columns={BookColumns(handleDelete)}
    />
    </Fragment>
  );
}