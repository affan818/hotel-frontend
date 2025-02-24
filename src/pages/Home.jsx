import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to the Theatre</h1>
      <p>Book your favorite show now!</p>
      <Button as={Link} to="/booking" variant="primary">
        Book Now
      </Button>
    </Container>
  );
};

export default Home;
