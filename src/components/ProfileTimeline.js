import { request } from "graphql-request";
import { gql } from "graphql-request";
import React from "react";
import { useParams } from "react-router-dom";
import Blog from "./Blog";
import InfiniteScroll from "./InfiniteScroll";

const query = gql`
  query Profile($id: ID, $cursor: Int) {
    profile(id: $id) {
      blogs(cursor: $cursor) {
        nextCursor
        nodes {
          id
          title
          body
          img
          createdAt
          author {
            id
            name
          }
        }
      }
    }
  }
`;

const getProfileBlogs = ({ queryKey, pageParam }) =>
  request("/graphql", query, { id: queryKey[1], page: pageParam });

const ProfileTimeline = () => {
  const { id } = useParams();

  const queryOptions = {
    queryFn: getProfileBlogs,
    queryKey: ["profileTimeline", id],
    getNextPageParam: (lastPage, all) => {
      const { nextCursor } = lastPage.profile.blogs;
      if (nextCursor == undefined) {
        return;
      }
      return nextCursor;
    },
  };

  return (
    <InfiniteScroll queryOptions={queryOptions}>
      {({ data }) =>
        data.pages.map((page) =>
          page.profile.blogs.nodes.map((blog) => {
            return <Blog blog={blog} key={blog._id} />;
          })
        )
      }
    </InfiniteScroll>
  );
};

export default ProfileTimeline;
