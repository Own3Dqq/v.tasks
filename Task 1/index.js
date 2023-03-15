/* 
Дан масив об'єктів. Вивести масив телефонних номерів користувачів, у яких баланс більше 2000 доларів. 
І знайти суму всіх балансів користувачів
*/

import users from './data/data.json' assert { type: 'json' };
import { convertDollarsToNumber } from './helpers/helper.js';

const filterUserPhonesByBalance = (value, index) => {
	const generateFilterArr = [];

	if (Number.isInteger(index) && Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) {
			const element = value[i];
			if (convertDollarsToNumber(element.balance) >= index) {
				generateFilterArr.push(element.phone);
			}
		}
	} else {
		throw 'TypeError: Arguments wrong type.';
	}

	return generateFilterArr;
};

filterUserPhonesByBalance(users, 2000);

const getSumAllUsersBalance = (value) => {
	let sumUsersBalance = 0;

	const findAllUsersBalance = value.map((item) => {
		return (sumUsersBalance += convertDollarsToNumber(item.balance));
	});

	return sumUsersBalance;
};

getSumAllUsersBalance(users);
