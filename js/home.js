function getDevelop(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8000/developers");
        xhr.send();
		xhr.addEventListener("load", function () {
			var json = JSON.parse(xhr.responseText);
			var data = json.developers;
			resolve(data);
			console.log(data);
        });
        xhr.addEventListener("error", function () {
            reject({ status: xhr.status, url });
        });
    });
}
getDevelop("http://localhost:8000/developers")
    .then((developers) => {
		console.log("developers", developers);
        renderAllDevelops(developers);
		})
	.catch((err) => console.log("error", err));

// function renderAllDevelop(developList) {
//     if (!developList) {
//         console.error("Pass the list of questions!");
//         return;
// 	    }

// }



// var developers =[
// 	{
// 		id: "1",
// 		ava: "img/dev01.jpg",
// 		nameFirst: "Марина Зубкова",
// 		birthday: "25.08.1990",
// 		born: "Харьков, Украина",
// 		education: "Каразина",
// 		addition:
// 			"Полиция",
// 		hobby:
// 			"Практикую йогу, люблю активный отдых, путешествия, книги, рисование",
// 	},
// 	{
// 		id:"2",
// 		ava: "img/dev04.jpeg",
// 		nameFirst: "Andrew Drobot",
// 		birthday: "27.12.1999",
// 		born: "Kharkiv, Ukraine",
// 		education: "KHHUE",
// 		addition: "0 xp",
// 		hobby: "Football, watch film's, gym, walking, learn new"
// 		},
// 		{
// 		id: "3",
// 		ava: "img/dev03.jpg",
// 		nameFirst: "Анастасия Фадеева",
// 		birthday: "10.09.2001",
// 		born: "Харьков, Украина",
// 		education: "ХНУРЭ",
// 		addition: "Не работала)",
// 		hobby:
// 			"Люблю организовывать различные мероприятия и лагеря. Хожу в зал, чтобы не стать буквой зю",
// 		}
// 	];
function renderAllDevelops(developers) {
	let cardBox=document.querySelector('.info')

for (let i = 0; i < developers.length; i++){    
	let boxText = document.createElement('div'); // for all
		boxText.classList.add('boxText')
	let boxText01 = document.createElement('div'); // для фото, имя, дата, и 3 с иконками без хобби
	boxText01.classList.add('boxText01')
	let card = document.createElement('span');
	card.classList.add('card');
	
	// let avatar1 = document.createElement('div');
	let avatar = document.createElement('img') //foto
	avatar.classList.add('avatar')
	avatar.setAttribute('src', `${developers[i].ava}`) //выводим фото

	// 1 str
	let name = document.createElement('div');
	let nameFirst = document.createElement('div') //name
	nameFirst.classList.add('name')
	nameFirst.innerHTML = developers[i].nameFirst
	name.appendChild(nameFirst)
	//2 str
	let birthday1 = document.createElement('div');
	let birthday = document.createElement('div') //birthday
	birthday.classList.add('birthday')
	birthday.innerHTML = developers[i].birthday
	birthday1.appendChild(birthday)
	
	//3 str
	let boxText1 = document.createElement('div')
	
	let icon1=document.createElement('img') //icon city
	icon1.setAttribute('src',"icons/icon_city.png")
	icon1.setAttribute('width', "20px")
	icon1.classList.add('icon')
    let born=document.createElement('span') //born
	born.innerHTML=developers[i].born

	boxText1.appendChild(icon1) //объединение icon и born
	boxText1.appendChild(born)
    
	// 4 str 
	let boxText2 = document.createElement('div')

	let icon2=document.createElement('img') //icon study
	icon2.setAttribute('src',"icons/icon_study.png")
	icon2.setAttribute('width', "20px")
	icon2.classList.add('icon')
    let education=document.createElement('span') //education
	education.innerHTML=developers[i].education

	boxText2.appendChild(icon2) //объединение icon и education
	boxText2.appendChild(education)

	// 5 str 
	let boxText3 = document.createElement('div')

	let icon3=document.createElement('img') //icon stars
	icon3.setAttribute('src',"icons/icon_stars.png")
	icon3.setAttribute('width', "20px")
	icon3.classList.add('icon')
    let addition=document.createElement('span') //education
	addition.innerHTML=developers[i].addition

	boxText3.appendChild(icon3) //объединение icon и addition
	boxText3.appendChild(addition)

		// 5 str 
	let boxText4 = document.createElement('div')
	boxText4.classList.add('hobby01');

	let boxText5 = document.createElement('div')
	boxText5.classList.add('hobby02');

	let icon4=document.createElement('img') //icon icon_edit
	icon4.setAttribute('src',"icons/icon_edit.png")
	icon4.setAttribute('width', "20px")
	icon4.classList.add('icon')
	let  newElem = document.createElement( "button" ); //Редактировать 
	const edit = document.createTextNode('Edit');
	newElem.appendChild(edit);
	newElem.classList.add('hobby02__button')

	let hobby = document.createElement('div') //hobby
	hobby.classList.add('hobby');
	hobby.innerHTML=developers[i].hobby

	boxText5.appendChild(icon4)
	boxText5.appendChild(newElem)
	// boxText4.appendChild(icon4) //объединение icon и addition
	boxText4.appendChild(hobby)
	boxText4.appendChild(boxText5)
	

	// boxText01.appendChild(avatar)
	// boxText01.appendChild(card)
	// card.appendChild(avatar)
	card.appendChild(name)
	card.appendChild(birthday1)
	card.appendChild(boxText1)
	card.appendChild(boxText2)
	card.appendChild(boxText3)
	
	// boxText01.appendChild(avatar)
	boxText01.appendChild(card)
	boxText01.appendChild(boxText4)
	
	boxText.appendChild(avatar)
	boxText.appendChild(boxText01)
	// boxText.appendChild(card)
	// boxText.appendChild(boxText4)
	// boxText.appendChild(boxText4)
	
	
	cardBox.appendChild(boxText)

	}
	return cardBox;
}
	