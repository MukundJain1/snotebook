import React, {useEffect} from 'react';
import Notes from './Notes';
import AddNote from './AddNote';
import { Container } from 'react-bootstrap';

const Home = (props) => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <Container className="my-5">
      <AddNote showAlert={props.showAlert} />
      <hr className="my-4" />
      <Notes showAlert={props.showAlert} />
    </Container>
  );
};

export default Home;