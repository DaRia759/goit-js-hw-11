import fetchImages from './fetchImages';
import Notiflix, { Notify } from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css";
import gallery from './imageList';

const input = document.querySelector(".search-form");
const loadingBtn = document.querySelector(".load-more");
const gallery = document.querySelector(".gallery");

let inputRequest = "";
let page = 1;
let per_page = 40;

input.addEventListener('submit', onSubmit);
loadingBtn.addEventListener('click', loadMoreFunction);


function onSubmit(e) {
    e.preventDefault();
    
    loadingBtn.classList.add('is-hidden');

    inputRequest = e.currentTarget.searchQuery.value.trim().toLowerCase();

    fetchImages(inputRequest, page, per_page)
        .then(({ data }) => {
                if (data.totalHits === 0) {
                    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                } else {
                    imageList(data.hits);
                    Notiflix.Notify.info("Hooray! We found `${data.totalHits}` images.");
                }
            })
        .catch(error => console.log(error))
        .finally();
    
};

function loadMoreFunction() {
    
};

function clearList() {
    gallery.innerHTML = "";
};