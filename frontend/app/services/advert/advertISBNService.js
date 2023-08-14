import axios from "axios";
import * as MyConfig from "../../../config";


const getBookInfo = async (isbn) => {
  console.log("AdvertISBNService::getBookInfo: " + isbn);
  // const response = await axios.get(MyConfig.OPEN_LIBRARY_API + isbn)
  const response = await axios.get(MyConfig.GOOGLE_LIBRARY_API + isbn);
  const data = response.data;
  if (data.totalItems === 0) {
    return null;
  }
  const bookData = data.items[0].volumeInfo;
  const book = {
    title: bookData.title,
    subtitle: bookData.subtitle || "",
    authors: bookData.authors || [],
    publisher: bookData.publisher || "",
    publishedDate: bookData.publishedDate || "",
    pageCount: bookData.pageCount || "",
    ISBN: bookData.industryIdentifiers.find((item) =>
      item.type === "ISBN_13").identifier || "",
    categories: bookData.categories || [],
    imageLinks: bookData.imageLinks || [],
  };

  return book;
};

const advertISBNService = {
  getBookInfo,
};

export default advertISBNService;
