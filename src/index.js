import fetchImages from './fetchImages';
import Notiflix, { Notify } from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import gallery from './imageList';

const input = document.querySelector("#search-form");
const loadingBtn = document.querySelector(".load-more");
const galleryList = document.querySelector(".gallery");

let inputRequest = "";
let page = 1;
const per_page = 40;

input.addEventListener('submit', onSubmit);
loadingBtn.addEventListener('click', loadMoreFunction);

input.style.backgroundColor = 'lightblue';
input.style.fontFamily = "cursive";
input.style.fontSize = '20px';
input.style.display = 'flex';
input.style.justifyContent = 'space-between';


function onSubmit(e) {
    e.preventDefault();
    
    loadingBtn.classList.add('is-hidden');

    inputRequest = e.currentTarget.searchQuery.value.trim().toLowerCase();

    fetchImages(inputRequest, page, per_page)
        .then((inputRequest) => {
            if (inputRequest.totalHits === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            } else {
                gallery(inputRequest.hits);
                Notiflix.Notify.info("Hooray! We found `${inputRequest.totalHits}` images.");
            }
        })
        .catch(Notiflix.Notify.warning("Oooops, something went wrong! Try new request!"))
        .finally(
            clearList()
        );
    
};

function loadMoreFunction() {
    page += 1;

    loadingBtn.classList.remove('is-hidden');

    fetchImages(inputRequest, page, per_page)
        .then((inputRequest) => {
            gallery(inputRequest.hits);

            const allPages = Math.ceil(inputRequest.totalHits / per_page);

            if (allPages > page) {
                loadingBtn.classList.add('is-hidden');
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            }
        })
};

function clearList() {
    galleryList.innerHTML = "";
};