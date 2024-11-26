import { useState, useEffect, useRef } from "react";
import "./App.css";
import NavBar from "./NavBar";
import FiltersBar from "./FiltersBar";
import Headers from "./Headers";
import ItemRow from "./ItemRow";
import { fakerES, faker, fakerEN, fakerRU } from "@faker-js/faker";

function App() {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [language, setLanguage] = useState(fakerEN);
  const [sliderValue, setSliderValue] = useState(50);
  const [reviewValue, setReviewValue] = useState(5);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [inputSeed, setInputSeed] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);
  const [enter, setEnter] = useState(false);
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log(`Initial page: ${page} with seed: ${seed}`);
    generateSeed();
    generateBooks(0, language, input);
  }, []);

  useEffect(() => {
    if (!loading && isFilterClicked == true) {
      console.log(`Generating books for page: ${page} with seed: ${seed}`);
      generateBooks(20, language, input, sliderValue);
    }
  }, [page, input, language, sliderValue, reviewValue]);

  function generateBooks(numberOfBooks, language, seed, likesValue = 50) {
    setLoading(true);
    faker.seed(seed);
    const newBooks = [];
    const currentYear = new Date().getFullYear();

    let startingBookNumber = totalBooks === 0 ? 1 : totalBooks + 1;

    for (let i = 0; i < numberOfBooks; i++) {
      const publicationDate = faker.date.between({
        from: `${currentYear - 50}-01-01`,
        to: `${currentYear}-12-31`,
      });

      const book = {
        cover: faker.image.urlPicsumPhotos({
          width: 120,
          height: 200,
          blur: 1,
        }),
        number: startingBookNumber + i,
        title: language.company.name(),
        author: language.person.fullName(),
        publicationDate: publicationDate.getFullYear(),
        publisher: language.company.name(),
        isbn: generateISBN(),
        likes: Math.round(likesValue / 10),
        averageRating: language.number.float({
          min: 1,
          max: 5,
          precision: 0.1,
        }),
        reviews: generateRandomReviews(Math.round(reviewValue), language),
      };
      newBooks.push(book);
    }

    setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    setTotalBooks((prevTotal) => prevTotal + numberOfBooks);
    setLoading(false);
  }

  function generateRandomReviews(numberOfReviews, language) {
    return Array.from({ length: numberOfReviews }).map(() => ({
      reviewText: language.commerce.productDescription(),
      reviewAuthor: language.person.fullName(),
    }));
  }

  function generateISBN() {
    const part1 = "978";
    const part2 = Math.floor(Math.random() * 9) + 1;
    const part3 = Math.floor(Math.random() * 900) + 100;
    const part4 = Math.floor(Math.random() * 90000) + 10000;
    const part5 = Math.floor(Math.random() * 9) + 1;

    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
  }

  function handleLanguage(event) {
    const selectedLanguage = event.target.value;
    let selectedFaker;
    if (selectedLanguage === "fakerEN") {
      selectedFaker = fakerEN;
    } else if (selectedLanguage === "fakerES") {
      selectedFaker = fakerES;
    } else {
      selectedFaker = fakerRU;
    }
    setLanguage(selectedFaker);
    const randomSeed = Math.floor(Math.random() * 10000000);
    setSeed(randomSeed);
    setPage(1);
    setBooks([]);
    setTotalBooks(0);
    setIsFilterClicked(true);
  }

  function generateSeed() {
    const randomSeed = Math.floor(Math.random() * 10000000);
    setInput(randomSeed);
    setPage(1);
    setBooks([]);
    setTotalBooks(0);
    setIsFilterClicked(true);
  }

  function handleInputChange(event) {
    const input = event.target.value;
    setInput(input);
  }

  function handleInputSeed(event) {
    if (event.key === "Enter") {
      setTotalBooks(0);
      const seedValue = Number(event.target.value);
      setSeed(seedValue);
      setPage(1);
      setBooks([]);
      setIsFilterClicked(true);
      setEnter(!enter);
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(`trigger at line 157`);
    generateBooks(20, language, seed);
  }, [enter]);

  function handleSliderChange(event) {
    const value = event.target.value;
    generateSeed();
    setSliderValue(value);
    setPage(1);
    setBooks([]);
    setTotalBooks(0);
    setIsFilterClicked(true);
  }

  function increaseReviews() {
    if (reviewValue < 5) {
      generateSeed();
      setReviewValue(reviewValue + 0.1);
      setPage(1);
      setBooks([]);
      setTotalBooks(0);
      setIsFilterClicked(true);
    }
  }

  function decreaseReviews() {
    if (reviewValue > 0) {
      generateSeed();
      setReviewValue(reviewValue - 0.1);
      setPage(1);
      setBooks([]);
      setTotalBooks(0);
      setIsFilterClicked(true);
    }
  }

  function handleScroll(e) {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <>
      <div className="pageBody" onScroll={handleScroll}>
        <NavBar />
        <FiltersBar
          handleLanguage={handleLanguage}
          generateSeed={generateSeed}
          seed={seed}
          input={input}
          inputSeed={inputSeed}
          handleInputChange={handleInputChange}
          handleInputSeed={handleInputSeed}
          handleSliderChange={handleSliderChange}
          sliderValue={sliderValue}
          reviewValue={reviewValue}
          increaseReviews={increaseReviews}
          decreaseReviews={decreaseReviews}
        />
        <Headers />
        {books.map((book, index) => (
          <ItemRow
            key={index}
            cover={book.cover}
            number={book.number}
            title={book.title}
            author={book.author}
            publicationDate={book.publicationDate}
            publisher={book.publisher}
            isbn={book.isbn}
            likes={book.likes}
            averageRating={book.averageRating}
            reviews={book.reviews}
          />
        ))}
      </div>
    </>
  );
}

export default App;
