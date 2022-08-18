
async function main(){
let courses = await fetch('http://localhost:3000/courses')
.then((Response)=>Response.json())
.then((data)=>data);

let courseContainer = document.querySelector('.course-container');
courses.forEach(createCards);
function createCards(course){
    let card = document.createElement('a');
    card.className = 'course_card';
    card.href = course.link;

    let image = document.createElement('img');
    image.setAttribute('src', course.image);
    card.appendChild(image);

    let title = document.createElement('p');
    title.textContent = course.title;
    card.appendChild(title);

    let author = document.createElement('p');
    author.textContent = course.author;
    author.style = "font-size: small;font-weight: lighter;";
    card.appendChild(author);

    let score = document.createElement('span');
    score.style.color = 'gold';
    score.textContent = course.rating;
    card.appendChild(score);
    
    let rat = course.rating;
    rat = Math.round(rat);
    for(let i=0;i<rat;i++){
        let checked = document.createElement('span');
        checked.className = "fa fa-star checked";
        card.appendChild(checked);
    }
    for(let i=0;i < 5 - rat;i++){
        let checked = document.createElement('span');
        checked.className = "fa fa-star";
        card.appendChild(checked);
    }

    let people = document.createElement('span');
    people.style.color = 'grey';
    people.textContent = '(' + (course.people) + ')';
    card.appendChild(people);

    let price = document.createElement('p');
    price.style = "font-weight: bolder; font-size: large;";
    price.textContent = '$' + (course.price);
    card.appendChild(price);

    courseContainer.appendChild(card); 
}

let noCourses = document.createElement('p');
noCourses.textContent = 'Sorry there is no course with this search criteria';
noCourses.style.fontSize = 'larger';
noCourses.id = 'sorry_noCourses'
noCourses.style = 'display:none';
courseContainer.appendChild(noCourses);

let submitButton = document.querySelector('.search_submit');

function searchUtil(event){
    event.preventDefault();
    let val = submitButton.nextElementSibling.value;
    if(val !== ''){
        let coursesDisplayed = document.querySelectorAll('.course_card');

        let sorry = document.getElementById('sorry_noCourses');
        if(sorry !== null)
            sorry.style= 'display:none';

        for(let i=0;i<coursesDisplayed.length;i++){
            coursesDisplayed[i].style = 'display:block';
        }
        let cnt = coursesDisplayed.length;
        for(let i=0;i<coursesDisplayed.length;i++){
            if(!coursesDisplayed[i].querySelector('p').textContent.toLowerCase().includes(val.toLowerCase())){
                coursesDisplayed[i].style = 'display:none';
                cnt--;
            }
        }
        if(cnt == 0){
            sorry.style = 'display:block';
        }
    }
}
// add search utility to the search bar
submitButton.addEventListener("click",searchUtil);

let tabs = document.querySelectorAll('#Courses_head div button');
tabs.forEach((button)=>{
    // add class "tabs" to the tabs buttons 
    button.className = "tabs";

    // add onclick tabs
    button.addEventListener('click', (event)=>{
        let val = button.textContent;
        let coursesDisplayed = document.querySelectorAll('.course_card');
        for(let i=0;i<coursesDisplayed.length;i++){
            coursesDisplayed[i].style = 'display:block';
        }
        for(let i=0;i<coursesDisplayed.length;i++){
            if(!coursesDisplayed[i].querySelector('p').textContent.toLowerCase().includes(val.toLowerCase())){
                coursesDisplayed[i].style = 'display:none';
            }
        }
    })
});

let topCategoryCards = document.querySelectorAll('.top-categories a');
let imgscategory = document.querySelectorAll('.top-categories a img');
imgscategory.forEach((e)=>{
    e.style = "width:90%;";

})
topCategoryCards.forEach((e)=>{
    e.className = "col-lg-3 col-md-4 col-sm-12";
    e.style = "margin-buttom:4%;margin-top:4%";
    
})
}
main();