import React, { useEffect, useState } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PaginationLayout from 'src/components/PaginationLayout';
import { getPostData } from 'src/state/post/actions';

type Props = {
  userId: number;
};

const Post: React.FC<Props> = ({ userId }) => {
  const dispatch = useDispatch();
  const [localPosts, setLocalPosts] = useState<PostData[]>([]);

  const { loading, posts } = useSelector((state: ReduxStore) => ({
    posts: state.post.data,
    loading: state.common.postLoading,
  }));

  useEffect(() => {
    if (posts) {
      setLocalPosts((prevPosts) => [...prevPosts, ...posts]);
    }
  }, [posts]);

  const loadPostData = async (userId: number, pageNumber: number) => {
    await dispatch(getPostData(userId, pageNumber));
  };

  const postList = (
    <ListGroup variant="flush">
      {localPosts &&
        localPosts.map((post) => (
          <ListGroup.Item key={post.id}>
            <h6 className="text-primary">{post.title}</h6>
            <p>{post.body}</p>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );

  return (
    <div id="scroll-box" className="h-200 overflow-auto">
      {loading && localPosts.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-200">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        postList
      )}
      <PaginationLayout
        pageType="post"
        userId={userId}
        loadData={loadPostData}
      ></PaginationLayout>
    </div>
  );
};

export default Post;
