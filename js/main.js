import { sendHttpRequest } from './util.js';

const mainContainerEl = document.querySelector('main .container');
const cardTemplate = document.getElementById('card-template');

const URL =
	'https://gist.githubusercontent.com/al3xback/5d6b58d482529c424f840eccbaa94c72/raw/182592e121636c33b862813808ffe15d06c1cf4a/social-links-data.json';

const renderCardContent = (data) => {
	const { name, location, job } = JSON.parse(data);

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');

	const cardTitleEl = cardEl.querySelector('.card__title');
	cardTitleEl.textContent = name;

	const cardSubtitleEl = cardEl.querySelector('.card__subtitle');
	cardSubtitleEl.textContent = location;

	const cardDescEl = cardEl.querySelector('.card__desc');
	cardDescEl.textContent = `"${job}."`;

	mainContainerEl.appendChild(cardEl);
};

sendHttpRequest('GET', URL, renderCardContent);
