import axios from 'axios'
import * as MyConfig from '../../../config'


const getBookInfo = async (isbn) => {
  console.log("AdvertISBNService::getBookInfo: " + isbn);
  //const response = await axios.get(MyConfig.OPEN_LIBRARY_API + isbn)
  const response = await axios.get(MyConfig.GOOGLE_LIBRARY_API + isbn)
  let data = response.data
  if (data.totalItems === 0) {
    return null
  }
  let raw_data = data.items[0].volumeInfo
  let book = {
    title: raw_data.title,
    authors: raw_data.authors,
    publisher: raw_data.publisher,
    publishedDate: raw_data.publishedDate,
    pageCount: raw_data.pageCount,
    categories: raw_data.categories,
    imageLinks: raw_data.imageLinks,
  }

  return book;
}

const advertISBNService = {
  getBookInfo
}

export default advertISBNService;