// function getPasswordFromUser(success, fail) {
// 	let password = prompt('Password?', '');
// 	if (password === 'rockstar') success();
// 	else fail();
// }

// let user = {
// 	fName: 'Andrew',

// 	loginSuccess() {
// 		alert(`${this.fName} logged in`);
// 	},

// 	loginFail() {
// 		alert(`${this.fName} failed to log in`);
// 	},
// };

// getPasswordFromUser(user.loginSuccess, user.loginFail);

function sayName() {
	console.log(this);
	console.log(this.name);
}

const user = {
	name: 'John',
};

console.log(sayName.call(user));
