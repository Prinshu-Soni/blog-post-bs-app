import React from 'react';
import { Card } from 'react-bootstrap';

type Props = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  childern?: React.ReactNode;
  onClick: (id: number, name: string) => void;
};

const UserProfile: React.FC<Props> = (props: Props) => {
  return (
    <Card
      className="shadow c-pointer"
      onClick={() => props.onClick(props.id, props.name)}
    >
      <Card.Body>
        <Card.Title className="text-truncate">{props.name}</Card.Title>
        <Card.Text className="text-truncate">{props.email}</Card.Text>
        <Card.Text>{props.phone}</Card.Text>
        <Card.Text>{props.website}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
