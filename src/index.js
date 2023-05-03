import fetchImages from './fetchImages';
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import gallery from './imageList';

const input = document.querySelector("#search-form");
const loadingBtn = document.querySelector(".load-more");
const galleryList = document.querySelector(".gallery");

let inputRequest = "";
let page = 0;
const per_page = 40;

input.addEventListener('submit', onSubmit);
loadingBtn.addEventListener('click', loadMoreFunction);

function onSubmit(e) {
    e.preventDefault();
    
    // loadingBtn.classList.add('is-hidden');

    inputRequest = e.currentTarget.searchQuery.value.trim().toLowerCase();

    page = 1;
    
    fetchImages(inputRequest, page, per_page)
        .then((inputRequest) => {
            if (inputRequest.totalHits === 0 || inputRequest.totalHits < 40 ) {
                loadingBtn.classList.add('is-hidden');
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            } else {
                gallery(inputRequest.hits);
                lightbox.refresh();
                Notiflix.Notify.success(`Hooray! We found ${inputRequest.totalHits} images.`);
                loadingBtn.classList.remove('is-hidden');

            }
        })
        .catch(error => Notiflix.Notify.warning("Oooops, something went wrong! Try new request!"))
        .finally(
            clearList()
        );
    
    
};

function loadMoreFunction() {
    page += 1;

    fetchImages(inputRequest, page, per_page)
        .then((inputRequest) => {
            gallery(inputRequest.hits);

            const allPages = Math.ceil(inputRequest.totalHits / per_page);

            if (allPages > page) {
                loadingBtn.classList.remove('is-hidden');
                
            } else {
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            }
        })
};

function clearList() {
    galleryList.innerHTML = "";
};

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 300,
});

