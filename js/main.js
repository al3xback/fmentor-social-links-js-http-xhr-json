import { sendHttpRequest } from './util.js';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardLinkTemplate = document.getElementById('card-link-template');
const loadingEl = document.querySelector('.loading');

const URL =
	'https://gist.githubusercontent.com/al3xback/5d6b58d482529c424f840eccbaa94c72/raw/18540a76b752d2b50f2e0cd989b6e0f39cdf01e2/social-links-data.json';

const renderCardContent = (data) => {
	const { name, location, job, image, socialLinks } = JSON.parse(data);

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');

	const cardImageEl = cardEl.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = name;

	const cardTitleEl = cardEl.querySelector('.card__title');
	cardTitleEl.textContent = name;

	const cardSubtitleEl = cardEl.querySelector('.card__subtitle');
	cardSubtitleEl.textContent = location;

	const cardDescEl = cardEl.querySelector('.card__desc');
	cardDescEl.textContent = `"${job}."`;

	const cardLinksEl = cardEl.querySelector('.card__links');

	for (const socialLink of socialLinks) {
		const { name, url } = socialLink;
		const cardLinkTemplateNode = document.importNode(
			cardLinkTemplate.content,
			true
		);
		const cardLinkEl = cardLinkTemplateNode.querySelector('.card__link');

		const cardLinkAnchorEl = cardLinkEl.querySelector('.btn');
		cardLinkAnchorEl.href = url;
		cardLinkAnchorEl.textContent = name;

		cardLinksEl.appendChild(cardLinkTemplateNode);
	}

	loadingEl.parentElement.removeChild(loadingEl);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent);
