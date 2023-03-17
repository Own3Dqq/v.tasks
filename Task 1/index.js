/* 
Дан масив об'єктів. Вивести масив телефонних номерів користувачів, у яких баланс більше 2000 доларів. 
І знайти суму всіх балансів користувачів
*/

import users from './data/data.json' assert { type: 'json' };
import { convertDollarsToNumber } from './helpers/helper.js';

const filterUserPhonesByBalance = (value, minBalance) => {
	const generateFilterArr = value
		.filter((item) => {
			return convertDollarsToNumber(item.balance) >= minBalance;
			А;
		})
		.map((item) => {
			return item.phone;
		});

	return generateFilterArr;
};

console.log(filterUserPhonesByBalance(users, 2000));

const getSumAllUsersBalance = (value) => {
	const findAllUsersBalance = value.reduce((acc, currentValue) => {
		return acc + convertDollarsToNumber(currentValue.balance);
	}, 0);

	return findAllUsersBalance;
};

getSumAllUsersBalance(users);
