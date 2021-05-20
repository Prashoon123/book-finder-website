import { Cancel, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Book from "./components/Book";
import axios from "axios";
import { FadingCircle } from "better-react-spinkit";
import FlipMove from "react-flip-move";
import data from "./data/data.json";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [searching, setSearching] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setTimeout(() => setResult(data.items), 300);
  }, []);

  const findBooks = async (e) => {
    e.preventDefault();

    if (!input) {
      return alert("Please enter a valid book, subject or author name!");
    } else {
      setResult([]);
      setSearching(true);

      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=24&printType=books&key=${API_KEY}`
        )
        .then((data) => {
          setResult(data.data.items);
          setInput("");
          setSearching(null);
        })
        .catch((error) => {
          alert(
            "Sorry our API quota is over! The default result is being loaded!!"
          );
          setInput("");
          setSearching(null);
          setResult(data.items);
        });
    }
  };

  return (
    <Container>
      <TitleContainer>
        <h1>Book Finder</h1>
      </TitleContainer>

      <Form>
        <InputContainer>
          <Search />
          <Input
            type="text"
            placeholder="Enter book, author, subject"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Cancel onClick={() => setInput("")} className="app__cross" />
        </InputContainer>
        <Button type="submit" onClick={findBooks}>
          Search
        </Button>
      </Form>

      <BooksContainer>
        {searching && (
          <LoadingContainer>
            <h2>Searching for books...</h2>
            <div style={{ height: 10 }} />
            <FadingCircle size={80} color="black" />
          </LoadingContainer>
        )}

        <FlipMove leaveAnimation="none" className="app__books">
          {result?.map((book) => (
            <Book
              bookName={book.volumeInfo.title}
              key={book.etag}
              authors={book.volumeInfo.authors}
              publisher={book.volumeInfo.publisher}
              published={book.volumeInfo.publishedDate}
              description={book.volumeInfo.subtitle}
              cover={book?.volumeInfo?.imageLinks?.thumbnail}
              buyLink={book.saleInfo.buyLink}
              rating={book.volumeInfo.averageRating}
            />
          ))}
        </FlipMove>
      </BooksContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const TitleContainer = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 300px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid black;
  padding: 5px;
  width: 100%;

  > .app__cross:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;

  ::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  height: 40px;
  width: 200px;
  align-self: center;
  background-color: black;
  color: white;
  border: none;

  :hover {
    border: 1px solid white;
    cursor: pointer;
  }
`;

const BooksContainer = styled.div`
  display: flex;
  margin-top: 30px;

  > .app__books {
    display: grid;
    /* grid-template-columns: auto auto; */
    grid-gap: 20px;
    gap: 20px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;
