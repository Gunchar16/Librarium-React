import { Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

export default function BookColumns(handleDelete) {
  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/books/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Author',
      dataIndex: 'authors',
      key: 'authors',
      render: (_, { authors }) => (
        <>
          {Array.isArray(authors) && authors?.map((author) => {
            return (
              <Tag key={author.id}>{`${author.firstName} ${author.lastName}`}</Tag>

            );
          })}
        </>
      ),
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      render: (_, { image }) => (
        <img src={image} alt='Book' style={{ width: 100, height: 70 }} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];
}