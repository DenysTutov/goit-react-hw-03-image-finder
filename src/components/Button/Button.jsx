import { LoadMore, Container } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <Container>
      <LoadMore type="button" onClick={onClick}>
        Load more
      </LoadMore>
    </Container>
  );
};

export default Button;
