import React from "react";
import { gql, request } from "graphql-request";

import Blog from "./Blog";
import InfiniteScroll from "./InfiniteScroll";

const GetBlogs = gql`
  query Blogs($cursor: Int) {
    blogs(cursor: $cursor) {
      nextCursor
      nodes {
        id
        author {
          id
          name
          createdAt
        }
        title
        body
        createdAt
        img
      }
    }
  }
`;

const getBlogs = ({ pageParam }) => {
  return request("/graphql", GetBlogs, { cursor: pageParam });
};

const queryOptions = {
  queryFn: getBlogs,
  queryKey: "blogs",
  getNextPageParam: (lastPage, all) => {
    const { nextCursor } = lastPage.blogs;
    if (nextCursor == undefined) {
      return;
    }

    return nextCursor;
  },
};

const BlogList = () => {
  return (
    <InfiniteScroll queryOptions={queryOptions}>
      {({ data }) =>
        data.pages.map((page) =>
          !page.blogs.nodes.length ? (
            <div>Nothing to show!</div>
          ) : (
            page.blogs.nodes.map((blog) => <Blog key={blog.id} blog={blog} />)
          )
        )
      }
    </InfiniteScroll>
  );
};

export default BlogList;
