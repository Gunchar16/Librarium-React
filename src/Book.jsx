import BookColumns from './BookModel';
import { useQuery, useMutation,  QueryClient } from '@tanstack/react-query';
import { BooksGetAll, BookDelete,  AuthorizeUser, RegisterUser } from './BookService';
import { Table, Button, message } from 'antd';
import { Fragment, useContext } from 'react';
import { userContext } from './UserContext.js';

const credentials = {
    email: "giorgiioseliani16@gmail.com",
    password: "string123"
  }

export default function Book() {

  const usrContext = useContext(userContext);  


  const token = useMutation(() => AuthorizeUser(credentials), {
        onSuccess: (data) => {
            if(data.errorCode) {
                usrContext.resetUser();
                message.error("Could not authorize.")
            
            } 
            else{
                usrContext.setUser(credentials.email, data.data);
                message.success("Successfully authorized")
            }
            refetch();
        }
    })

  const register = useMutation(() => RegisterUser({...credentials, username:"string"}),{
    onSuccess: (data) => data.errorCode === "ALREADY_EXISTS" ?  message.error("An account with that credentials already exists") : message.success("Creation successful")
  })

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
  const handleRegister = () => {
    register.mutate({...credentials, username:"string"});
  }

  return ( 
    <Fragment>
    <Button onClick={() => handleRegister(credentials)}>REGISTER (Click only once)</Button>
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