import { Tag, Image } from "antd";
import moment from 'moment'

export default function BookDetailsColumns() {
    return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image src={text} width={50} />,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Publication Date',
      dataIndex: 'publicationDate',
      key: 'publicationDate',
      render: (text) => moment(text).format('MMMM Do YYYY'),
    },
    {
      title: 'Is Taken',
      dataIndex: 'isTaken',
      key: 'isTaken',
      render: (text) => (text ? 'Yes' : 'No'),
    },
    {
      title: 'Authors',
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
  ];
}