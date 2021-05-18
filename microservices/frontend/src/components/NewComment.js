import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import Form from "react-bootstrap/Form";


const NewComment = ({questionId}) => {

    const [open, setOpen] = useState(false)
    const [text, setText ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('text', text)
        const comment = {question_id: questionId, text}
        console.log('comment', comment)
    }

    const handleCancel = () => {
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
                        <Form.Control as="textarea" rows={3} value={text} onChange={(e) => setText(e.target.value) }/>
                        <Button className="mt-3 mr-5" variant="info" type="submit">Submit</Button>
                        <Button className="mt-3" variant="outline-danger" onClick={handleCancel}>Cancel</Button>
                    </Form>
                </div>
            </Collapse>

        </>
    )
}
export default NewComment;
