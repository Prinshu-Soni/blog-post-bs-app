import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from 'src/components/UserProfile';
import UserDetailsModal from 'src/containers/User/UserDetailsModal';
import {
  resetAddPostResponseData,
  resetPostData,
} from 'src/state/post/actions';
import { resetTodoData } from 'src/state/todo/actions';
import { getUserData } from 'src/state/user/actions';

const User: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const dispatch = useDispatch();

  const { loading, users } = useSelector((state: ReduxStore) => ({
    users: state.user.data,
    loading: state.common.userLoading,
  }));

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleUserClicked = (id: number, name: string) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
  };

  const handleResetUser = () => {
    setSelectedUserId(undefined);
    setSelectedUserName('');
    dispatch(resetTodoData());
    dispatch(resetPostData());
    dispatch(resetAddPostResponseData());
  };

  const usersList = (
    <Row
      xs={1}
      sm={2}
      md={3}
      lg={4}
      className="g-4 pt-4 justify-content-center align-items-center text-center"
    >
      {users &&
        users.map((user) => (
          <Col key={user.id}>
            <UserProfile
              id={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              website={user.website}
              onClick={handleUserClicked}
            />
          </Col>
        ))}
    </Row>
  );

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center container-height">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        usersList
      )}
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          userName={selectedUserName}
          resetUser={handleResetUser}
        />
      )}
    </>
  );
};

export default User;
