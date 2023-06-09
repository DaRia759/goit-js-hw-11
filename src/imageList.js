const imageList = document.querySelector('.gallery');

export default function gallery(images) {

    const image = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<a class="photo-link" href="${largeImageURL}">
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img"/>
        <div class="info">
            <p class="info-item">
            <b>Likes</b>
            ${likes}
            </p>
            <p class="info-item">
            <b>Views</b>
            ${views}
            </p>
            <p class="info-item">
            <b>Comments</b>
            ${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
            ${downloads}
            </p>
        </div>
        </div>
        </a>`;
        })
        .join('');
    
    imageList.insertAdjacentHTML('beforeend', image);
    
};