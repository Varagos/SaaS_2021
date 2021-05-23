import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import { connect} from "react-redux";
import { addComment } from "../actions/commentActions";


const NewComment = (props) => {

    const [open, setOpen] = useState(false)
    const [text, setText ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const comment = {question_id: props.questionId, text}
        props.addComment(comment)
        handleClose()
    }

    const handleClose = () => {
        setOpen(false)
        setText("")
    }
    return (
        <>
        <Button variant="info" onClick={()=> setOpen(!open)} aria-controls="collapse-input" aria-expanded={open} >
            Comment
        </Button>
            <Collapse in={open}>
                <div id="collapse-input">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Comment body</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={text}
                            required
                            onChange={(e) => setText(e.target.value) }/>
                        <Button className="mt-3 mr-5" variant="info" type="submit">Submit</Button>
                        <Button className="mt-3" variant="outline-danger" onClick={handleClose}>Cancel</Button>
                    </Form>
                </div>
            </Collapse>

        </>
    )
}
export default connect(null, {addComment})(NewComment);
