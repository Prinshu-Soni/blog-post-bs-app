import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddPost from 'src/containers/Post/AddPost';
import UserActionTabs from 'src/containers/User/UserActionTabs';

type Props = {
  userId: number;
  userName: string;
  resetUser: () => void;
};

const UserDetailsModal: React.FC<Props> = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [addPostFormVisible, setAddPostFormVisible] = useState<boolean>(false);
  const [activeTabItem, setActiveTabItem] = useState<number>(0);

  const handleClose = () => {
    setShow(false);
    props.resetUser();
  };

  useEffect(() => {
    setShow(true);
  }, []);

  const setActiveTab = (index: number) => {
    setActiveTabItem(index);
  };

  const handleAddClicked = () => {
    if (activeTabItem === 1) {
      setAddPostFormVisible(true);
    }
  };

  const handleAddPostCancelClick = () => {
    setAddPostFormVisible(false);
    setActiveTabItem(0);
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="mw-500"
      dialogClassName="justify-content-center"
      centered
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${props.userName} ${addPostFormVisible ? '- Add Post' : ''}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!addPostFormVisible && (
          <UserActionTabs userId={props.userId} activeTab={setActiveTab} />
        )}
        {addPostFormVisible && (
          <AddPost onCancelClick={handleAddPostCancelClick} />
        )}
      </Modal.Body>
      {!addPostFormVisible && (
        <Modal.Footer>
          <Button onClick={handleAddClicked}>Add</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default UserDetailsModal;
