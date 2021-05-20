import { Rating } from "@material-ui/lab";
import styled from "styled-components";
import { forwardRef } from "react";

const Book = forwardRef(
  (
    {
      bookName,
      authors,
      publisher,
      published,
      cover,
      description,
      buyLink,
      rating,
    },
    ref
  ) => {
    const formattedAuthors = authors?.toString();

    return (
      <Container ref={ref}>
        <h3>{bookName}</h3>

        <Details>
          <div>
            <Image
              src={
                cover
                  ? cover
                  : "https://vglist.co/assets/no-cover-60a919fca497ced5f84133c0ce073e17475c47f4a4cb122f2150299dc549d223.png"
              }
              loading="lazy"
              alt="bookCover"
            />
          </div>

          <MoreDetails>
            {!description ? (
              <DetailsText>Description: No description available</DetailsText>
            ) : (
              <DetailsText>
                Description:{" "}
                {description?.length > 26
                  ? description.substring(0, 25) + "..."
                  : description}
              </DetailsText>
            )}
            {!formattedAuthors ? (
              <DetailsText>Author: No author available</DetailsText>
            ) : (
              <DetailsText>
                Author:{" "}
                {formattedAuthors?.length > 26
                  ? formattedAuthors.substring(0, 25) + "..."
                  : formattedAuthors}
              </DetailsText>
            )}
            <DetailsText>
              Publisher: {publisher ? publisher : "No publisher available"}
            </DetailsText>
            <DetailsText>
              Published: {published ? published : "No published date available"}
            </DetailsText>
            {rating && <Rating readOnly value={rating} precision={0.5} />}
            {buyLink && (
              <a target="_blank" href={buyLink} rel="noreferrer">
                <Button>Buy Book</Button>
              </a>
            )}
          </MoreDetails>
        </Details>
      </Container>
    );
  }
);

export default Book;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 3;
  background: #fff;
  margin: 10px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  height: 200px;
  width: 100px;
  object-fit: contain;
`;

const MoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-top: 20px;
  margin-left: 20px;
`;

const DetailsText = styled.p`
  margin: 3px;
`;

const Button = styled.button`
  height: 30px;
  width: 150px;
  background-color: black;
  color: white;
  border: none;
  margin-top: 3px;

  :hover {
    border: 1px solid black;
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;
