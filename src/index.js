// Code here
document.addEventListener('DOMContentLoaded',onPageLoad); //page loads

//Runs on page load;
function onPageLoad (){ 
    displayTheFirstBeer()
    getBeerMenu();
}

//Get the first beer and display its details.
function displayTheFirstBeer(){
    fetch('http://localhost:3000/beers/1')  //fetching the first beer details
    .then(response=>response.json())
    .then(beer=>{
        document.getElementById('beer-name').textContent = beer.name;
        document.querySelector('#beer-image').src = beer.image_url;
        document.getElementById('beer-description').textContent= beer.description;
        const reviewList = document.getElementById('review-list')   
        const existingReviews = Array.from(reviewList.children);
        existingReviews.forEach(review=>review.remove());    // Remove the existing placeholder review

        beer.reviews.forEach(review => { // for every review create a list item
        let newItem = document.createElement('li');
        newItem.textContent = review;
        reviewList.appendChild(newItem);
        });      
    })
    .catch(error=>console.log(error))
}

//Fetch all beers and display them to nav menu section;
function getBeerMenu(){
fetch('http://localhost:3000/beers')
.then(response=>response.json())
.then(beers =>{
const beerList = document.getElementById('beer-list');
const existingItems = Array.from(beerList.children);
existingItems.forEach(item=>item.remove());   // Remove the existing children placeholders.
beers.forEach(beer=>{
let beerItem = document.createElement('li');
beerItem.textContent = beer.name;
beerList.appendChild(beerItem);
});
})
.catch(error=>console.log(error))
}


//Adding a user tailored review;
document.querySelector('#review-form').addEventListener('submit',(e)=>{
    e.preventDefault(); 
    const customerReview = document.getElementById('review').value;
    let newList = document.createElement('li');
    newList.textContent = customerReview;
    document.getElementById('review-list').appendChild(newList);
});