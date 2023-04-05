import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { BookSearch } from "./BookService";
import { useQuery } from "@tanstack/react-query";
import { Table,  Button } from "antd";
import BookColumns from "./BookModel";

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("text");

  const { data } = useQuery(['books', query], () => BookSearch(query));



  return (
    <Fragment>
    <Table
      pagination={false}
      size={'large'}
      //className={'admin-table'}
      dataSource={data?.data?.map((book) => {
        return {
          key: book?.id,
          ...book,
          delete: (
            <Button danger >
              Delete
            </Button>
          ),
        };
      })}
      columns={BookColumns()}
    />
    </Fragment>
  );
}