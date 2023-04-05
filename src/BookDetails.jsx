import { useQuery } from "@tanstack/react-query";
import { BookGet } from './BookService.js';
import { Table } from 'antd';
import BookDetailsColumns from './BookDetailsModel';
import { useParams } from 'react-router-dom';

export default function BookDetails() {

  const { id } = useParams();
  const { data } = useQuery(['book', id], () => BookGet(id));
  
  return (
    <Table
      pagination={false}
      size={'large'}
      dataSource={
        [
            {
                key: data?.data?.id,
                ...data?.data
            }
            
        ]
      }
      columns={BookDetailsColumns()}
    />
  );
}