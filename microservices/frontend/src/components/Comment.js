import Card from "react-bootstrap/Card";
import React from "react";
// import Button from "react-bootstrap/Button";
import ConfirmationModal from "./ConfirmationModal";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat)


export default function Comment({id, body, author, date, userId, deleteFunc }) {

    // function handleClick() {
    //   console.log(1)
    // }

  return (
    <Card className="">
      <Card.Body className="pt-0 mt-0">
        <Card.Title className="d-flex p-0 m-0">
          <div>
              <small className="text-muted">{author.email} commented </small>
          </div>
            {userId === author.user_id &&

            <div className="ml-auto">
                {/*<Button className="ml-auto pt-0" variant="link" onClick={handleClick}>Delete</Button>*/}
                <ConfirmationModal title="Delete comment" objectId={id} deleteFunc={deleteFunc}/>
            </div>
            }
        </Card.Title>
        <Card.Text>{body}</Card.Text>
        <Card.Text>
          <small className="text-muted font-italic">{dayjs(date).format('LLL')}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
