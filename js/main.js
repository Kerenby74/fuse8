'use strict';
//Get list houses
function readTextFile(file, callback) {
	let houseFile = new XMLHttpRequest();
	houseFile.overrideMimeType("application/json");
	houseFile.open("GET", file, true);
	houseFile.onreadystatechange = function() {
		if (houseFile.readyState === 4 && houseFile.status == "200") {
			callback(houseFile.responseText);
		}
	};
	houseFile.send(null);
}
readTextFile("./js/house.json", function(h){
	let house = JSON.parse(h);
	let button = document.getElementById("button");
	button.addEventListener('click', function () {
		writeTextFile(house.houses, 'click');
	});
	writeTextFile(house.houses);

});

function writeTextFile (file, click) {
	if (!click) {
		let houses = file.slice(0, 3);
		mapHouses(houses);
	} else {
		const houseLength = file.length;
		let houses = file.slice(3 , houseLength);
		mapHouses(houses);
	}
}

function mapHouses(houses) {
	houses.forEach(function (h) {
				let my_div = document.getElementById("org_div1"),
					newA = document.createElement('a'),
					newDiv = newA.appendChild(document.createElement("div")),
					itemHead = newDiv.appendChild(document.createElement("div")),
					itemBody = newDiv.appendChild(document.createElement("div")),
					spanHead = itemHead.appendChild(document.createElement('span')),
					itemBodyName = itemBody.appendChild(document.createElement('p')),
					itemBodyAddress = itemBody.appendChild(document.createElement('p')),
					itemBodyPrice = itemBody.appendChild(document.createElement('p')),
					itemBodyPriceSpanOne = itemBodyPrice.appendChild(document.createElement('span')),
					itemBodyPriceSpanTwo = itemBodyPrice.appendChild(document.createElement('span')),
					itemBodyDescription = itemBody.appendChild(document.createElement('p'));

				newA.href = "#" + h.id;
				newDiv.classList.add('houses__item');
				itemHead.classList.add('houses__item__head');
				// itemHead.style.background = `url(${h.imgUrl}) no-repeat`;
				itemHead.style.background = "url(" + h.imgUrl + ") no-repeat";
				spanHead.textContent = h.status;
				if (h.status === 'Restaurant & Support available') {
					spanHead.style.backgroundColor = '#EC6608';
				}
				itemBody.classList.add('houses__item__body');

				itemBodyName.classList.add('houses__item__body__name');
				itemBodyName.textContent = h.name;

				itemBodyAddress.classList.add('houses__item__body__address');
				itemBodyAddress.textContent = h.address;

				itemBodyPrice.classList.add('houses__item__body__price');
				itemBodyPriceSpanOne.classList.add('houses__item__body__price__description');
				itemBodyPriceSpanOne.textContent = 'New Properties for Sale from';
				itemBodyPriceSpanTwo.textContent = h.price;
				itemBodyPriceSpanTwo.style.fontWeight = 'bold';
				itemBodyPriceSpanTwo.style.marginLeft = '5px';

				itemBodyDescription.classList.add('houses__item__body__description');
				itemBodyDescription.textContent = 'Shared Ownership Available';

				my_div.appendChild(newA);
	});
}