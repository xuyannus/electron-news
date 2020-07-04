const NewsAPI = require('newsapi')
const $ = require('jquery')
const newsapi = new NewsAPI('ca91c0ff89c24dc7a435e02088093f9a')

const newsListItem = $("#news-list")
const navItems = $(".nav-group-item")

let ariticles = []
let cat = "Business"
let country = "au"


function updateCat() {
  newsapi.v2.topHeadlines({
    category: cat,
    language: 'en',
    pageSize: 100,
    country: country
  }).then((response) => {
    ariticles = response.articles
    updateNews(ariticles)
  }).catch(err => {
    console.log(err)
  })
}

function updateNews(filteredArtciles) {
  // clean current news and add the search bar
  newsListItem.html("")
  newsListItem.append(`
    <li class="list-group-header">
      <input type="text" class="form-control" value="" placeholder="search topics ..." onchange="searchNews(this)">
    </li>
  `)

  for (let i = 0; i < filteredArtciles.length; i++) {
    let newItem = `
      <li class="list-group-item">
        <img class="img-circle media-object pull-left" src="${filteredArtciles[i].urlToImage}" width="50" height="50">
        <div class="media-body">
          <strong><a href="${filteredArtciles[i].url}" onclick="openArticle(event)">${filteredArtciles[i].title}</strong>
          <span class="">${filteredArtciles[i].publishedAt}</span>
          <span class="pull-right">${filteredArtciles[i].author}</span>
        </div>
        <p>${filteredArtciles[i].description}</p>
      </li>
    `
    newsListItem.append(newItem)
  }
}

function openArticle(event) {
  event.preventDefault()
  let link = event.target.href
  window.open(link, "width=1000, height=1000")
}

// init the pane
updateCat()

navItems.click((event) => {
  cat = event.target.id
  navItems.removeClass('active')
  $(event.target).addClass('active')
  updateCat()
})

function searchNews(input) {
  let query = $(input).val().toLowerCase()
  let sortedArticles = ariticles.filter((item) => {
    if (item.title.toLowerCase().includes(query)) {
      return true
    } else {
      return false
    }
  })
  updateNews(sortedArticles)
}

