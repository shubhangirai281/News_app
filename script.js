const API_KEY= "ebb5a2a8f07d43efb13e3bcd3d5f11fe";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews (query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);

}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML ="";

    articles.forEach(articles=>{
        if(!articles.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,articles);
        cardsContainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article){
    const newsImg= cardClone.querySelector('#news-img');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSrc= cardClone.querySelector('#news-src');
    const newsDesc= cardClone.querySelector('#news-desc');

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML = article.description;

     const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
     });

     newsSrc.innerHTML= `${article.source.name} . ${date}`;

     cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank");
     });
}

let currSelectedNav =null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav?.classList.add('active');
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
});
