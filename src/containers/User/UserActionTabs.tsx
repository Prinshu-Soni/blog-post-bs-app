import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import Post from 'src/containers/Post';
import Todo from 'src/containers/Todo';

type Props = {
  userId: number;
  activeTab: (id: number) => void;
};

const UserActionTabs: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState(0);

  const handleTabClick = (newValue: string | null) => {
    if (newValue) {
      setValue(+newValue);
      props.activeTab(+newValue);
    }
  };

  return (
    <Container>
      <Tabs activeKey={value} onSelect={(event) => handleTabClick(event)}>
        <Tab eventKey={0} title="Todos" />
        <Tab eventKey={1} title="Posts" />
      </Tabs>
      {value === 0 && <Todo userId={props.userId} />}
      {value === 1 && <Post userId={props.userId} />}
    </Container>
  );
};

export default UserActionTabs;
