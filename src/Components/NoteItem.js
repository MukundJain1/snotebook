import { useContext } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Trash2, Edit2 } from 'lucide-react'
import NoteContext from '../Context/Notes/noteContext';
import '../index.css';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    
    const handleDelete = (id)=>{
        deleteNote(id);
        props.showAlert("Deleted the Note", "danger");
    }
    return (
        <Card style={{ width: '18rem', margin: '20px', border: '1px solid black' }}>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                    {note.description}
                </Card.Text>
                <Card.Text>
                    {note.content}
                </Card.Text>
                <Card.Text>
                    {note.created_at} <br /> {note.updated_at}
                </Card.Text>
                <Col className='justify-content-between'>
                    <Button style={{ marginRight: '40px' }} onClick={() => {handleDelete(note.id)}}> <Trash2 /> </Button>
                    <Button style={{ marginLeft: '40px' }} onClick={()=> {updateNote(note)}}> <Edit2 /> </Button>
                </Col>

            </Card.Body>
        </Card>
    )
}

export default NoteItem;