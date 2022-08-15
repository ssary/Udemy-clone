
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
    console.log(rat);
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
    console.log(card);  
}


}
main();