import axios from "axios";


export default async function fetchImages(inputRequest, page, per_page) {

    const KEY = "35927005-0d9b5dfd4ead8e82c902493f1";
    const BASE_URL = "https://pixabay.com/api";
    const URL = `${BASE_URL}/?key=${KEY}&q=${inputRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
    
    const response = await axios.get(URL);
        
    return response.data; 
    
};
