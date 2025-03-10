import axios from "axios"; 

const API_URL = 'http://localhost:8080/book';

export const createBook = async (bookData) => {
    // Check if bookData is FormData (has image) or regular JSON
    if (bookData instanceof FormData) {
      return axios.post(`${API_URL}/createBook`, bookData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => response.data);
    } else {
      // Regular JSON submission (no image)
      return axios.post(`${API_URL}/createBookJson`, bookData)
        .then(response => response.data);
    }
};

export const getAllBooks = async() => {
    const response = await axios.get(`${API_URL}/allBooks`);
    return response.data;
}

export const getBookById = async (id) => {
    const response = await axios.get(`${API_URL}/getbook/${id}`);
    return response.data;
}

export const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
}

export const getExternalBookDetails = async (isbn) => {
    const response = await axios.get(`${API_URL}/external/${isbn}`);
    return response.data;
  };
