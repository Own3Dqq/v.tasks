/* 
Дан масив об'єктів. Вивести масив телефонних номерів користувачів, у яких баланс більше 2000 доларів. 
І знайти суму всіх балансів користувачів
*/

import users from './data/data.json' assert { type: 'json' };
import { transformAndDeleteCharacters } from './helpers/helper.js';

const root = document.querySelector('.root');

const findBalanceMore2k = (value) => {
	const generateFilterArr = value.filter((item) => {
		if (transformAndDeleteCharacters(item.balance) >= 2000) {
			return item;
		}
	});

	return generateFilterArr;
};

const showPhoneUsers = () => {
	const arr = findBalanceMore2k(users);
	return arr.map((item) => {
		const div = document.createElement('div');
		div.classList.add('phone');
		div.innerHTML = item.phone;
		root.append(div);
	});
};

showPhoneUsers();

const getSumUsersBalance = () => {
	const getUsersInfo = findBalanceMore2k(users);
	let sumBalance = 0;

	getUsersInfo.map((item) => {
		return (sumBalance += transformAndDeleteCharacters(item.balance));
	});

	document
		.querySelector('.sum')
		.insertAdjacentHTML('afterbegin', `<h1 class='balance'>Summary Balance: ${sumBalance}$</h1>`);

	return sumBalance;
};

getSumUsersBalance();
