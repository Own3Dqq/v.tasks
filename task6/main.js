// Подія – це сигнал від браузера, що щось сталося. 
// Всі DOM-вузли подають такі сигнали (хоча події бувають не тільки в DOM).


// ----------------
// Події миші:
// click – відбувається, коли клацнули на елемент лівою кнопкою миші (на пристроях із сенсорними екранами воно відбувається при торканні).
// contextmenu – відбувається, коли клацнули на елемент правою кнопкою миші.
// mouseover / mouseout – коли миша наводиться на / залишає елемент.
// mousedown / mouseup – коли натиснули / відпустили кнопку миші на елементі.
// mousemove – під час руху миші.

// Події клавіатури:
// keydown та keyup – коли користувач натискає / відпускає клавішу.

// Події елементів форми:
// submit – користувач надіслав форму <form>.
// focus – користувач фокусується на елементі, наприклад, натискає на <input>.

// Події документа:
// DOMContentLoaded – коли HTML завантажено й оброблено, DOM документа повністю побудований і доступний.

// CSS події:
// transitionend – коли CSS-анімацію завершено.
// -----------------


// Є три способи призначення обробників подій:

// Атрибут HTML: onclick="...".
// Властивість DOM: elem.onclick = function.
// Спеціальні методи: elem.addEventListener(event, handler[, phase]) для додавання, removeEventListener для видалення.

// HTML-атрибути використовуються рідко тому, що JavaScript у HTML-тегу виглядає трохи дивно. До того ж багато коду там не напишеш.

// DOM-властивості можна використовувати, але ми не можемо призначити більше одного обробника на один тип події. У багатьох випадках із цим обмеженням можна миритися.

// Останній спосіб найбільш гнучкий, проте потрібно писати більше коду. Є кілька типів подій, які працюють лише через нього, наприклад transitionend та DOMContentLoaded. Також addEventListener підтримує об’єкти-обробники подій. В цьому випадку викликається метод об’єкту handleEvent.

// Не важливо, як ви призначаєте обробник, він отримує об’єкт події першим аргументом. Цей об’єкт містить подробиці про те, що сталося.

// btn.onclick = function(e) {
//     console.log('clicked', e);
// }


let btn = document.querySelector('#btn');
// let  removeBtn = document.querySelector('#btn-remove');

// function handleClick(event) {
//     event = event || window.event;

//     console.log('clicked from addEventListener', event);
// }


// btn.addEventListener('click', handleClick);

// removeBtn.addEventListener('click', function () {
//     btn.removeEventListener('click', handleClick);
// });



// event - Назва події, наприклад "click".
// handler - Посилання на функцію-обробник.

// options - Додатковий об’єкт із властивостями:
//   - once: якщо true, тоді обробник буде автоматично вилучений після виконання.
//   - capture: фаза, на якій повинен спрацювати обробник,  Так історично склалося, що options може бути false/true, це те саме, що {capture: false/true}.
//   - passive: якщо true, тоді обробник ніколи не викличе preventDefault(), докладніше про це буде розказано у розділі Типові дії браузера.

// Для видалення потрібно передати саме ту функцію-обробник, яка була присвоєна.
// Коли відбувається подія, браузер створює об’єкт події, записує в нього деталі та передає його як аргумент функції-обробнику.


// Ми можемо призначити обробником не лише функцію, а й об’єкт за допомогою addEventListener. 
// У такому разі, коли відбувається подія, викликається метод об’єкта handleEvent.

// class Button {
//     constructor(elem) {
//         this.elem = elem;
//     }
//     handleEvent(event) {
//         switch (event.type) {
//             case 'click':
//                 this.elem.innerHTML = "Нажата кнопка " + Math.random();
//                 break;
//         }
//     }
// }

// let btmInstance = new Button(btn)
// btn.addEventListener('click', btmInstance);

// ________________________________________________________________________________________________________________
// Випливання Bubbling
// Принцип випливання дуже простий.
// Коли на елементі відбувається подія, обробники спочатку спрацьовують на ньому,
// потім на його батьківському элементі, потім вище і так далі, вгору по ланцюжку предків.
// Наприклад, є 3 вкладені елементи FORM > DIV > P


// Майже усі події спливають.

// Найглибший елемент, який викликає подію, називається цільовим елементом, і він доступний через event.target.
// Відмінності від this ( = event.currentTarget) :
//   - event.target - це "цільовий" елемент, на якому сталася подія, в процесі спливання він незмінний.
//   - this - це "поточний" елемент, до якого дійшло спливання, на ньому зараз виконується обробник.

// Спливання йде з "цільового" елементу прямо вгору. За умовчанням подія спливатиме до елементу <html>, а потім до об'єкту document, а іноді навіть до window, викликаючи усі обробники на своєму шляху.
// Але будь-який проміжний обробник може вирішити, що подія повністю оброблена, і зупинити спливання.
// Для цього треба викликати метод event.stopPropagation ().

// event.stopPropagation () перешкоджає просуванню події далі, але на поточному елементі усі обробники будуть викликані.
// Для того, щоб повністю зупинити обробку, існує метод event.stopImmediatePropagation (). 
// Він не лише запобігає спливанню, але і зупиняє обробку подій на поточному елементі.


// ________________________________________________________________________________________________________________
// Занурення capturing

// Стандарт DOM Events описує 3 фази проходу події :

// Фаза занурення (capturing phase) - подія спочатку йде зверху вниз.
// Фаза мети (target phase) - подія досягла цільового (початкового) елементу.
// Фаза спливання (bubbling stage) - подія починає спливати.

// Обробники, додані через on<event>-свойство або через HTML- атрибути
// чи через addEventListener (event, handler) з двома аргументами, нічого не знають про фазу занурення
// а працюють тільки на 2-ій і 3-ей фазах.

// Щоб упіймати подію на стадії занурення, треба використати третій аргумент capture
// Якщо аргумент false (за умовчанням), то подія буде спіймана при спливанні.
// Якщо аргумент true, то подія буде перехоплена при зануренні

// let p = document.querySelector('#p');
// let b = document.querySelector('#b');
// let span = document.querySelector('#span');

// p.addEventListener('click', function (e) {
//     console.log(this.tagName);

//     console.log('target ' + e.target.tagName, "currentTarget " + e.currentTarget.tagName);
// }, true);

// span.addEventListener('click', function (e) {
//     console.log(this.tagName);
//     // e.stopPropagation(); 
//     // e.stopImmediatePropagation();
//     console.log('target ' + e.target.tagName, "currentTarget " + e.currentTarget.tagName);
// }, true);

// span.addEventListener('click', function (e) {
//     console.log(this.tagName);
//     // e.stopPropagation(); 
//     // e.stopImmediatePropagation();
//     console.log('target ' + e.target.tagName, "currentTarget " + e.currentTarget.tagName);
// }, true);

// b.addEventListener('click', function (e) {
//     console.log(this.tagName);
//     console.log('target ' + e.target.tagName, "currentTarget " + e.currentTarget.tagName);
// }, true);


// ________________________________________________________________________________________________________________
//  e.preventDefault();

// let form = document.querySelector('.form');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log(e);
// })

// ________________________________________________________________________________________________________________

// let menu = document.querySelector('#menu');

// class Menu {
//     constructor(elem) {
//       this._elem = elem;
//       elem.onclick = this.onClick.bind(this); 
//     }

//     save() {
//       alert('сохраняю');
//     }

//     load() {
//       alert('загружаю');
//     }

//     search() {
//       alert('ищу');
//     }

//     onClick(event) {
//         console.log(event.target.dataset.action);
//       let action = event.target.dataset.action;
//       if (action) {
//         this[action]();
//         // this.load() => // data-action="load"
//       }
//     };
//   }

// console.log(new Menu(menu));

// ________________________________________________________________________________________________________________


// Спливання та перехоплення дозволяють нам реалізувати один з найпотужніших шаблонів обробки подій під назвою делегування подій.
// Ідея в тому, що якщо у нас є багато елементів, які обробляються подібним чином, то замість того, щоб призначати обробник кожному з них, ми ставимо один обробник на їхнього спільного предка.
// У обробнику ми отримуємо event.target, щоб побачити, де насправді сталася подія і обробити її.

let ul = document.querySelector('#ul');

ul.addEventListener('mousedown', function (e) {
    e.preventDefault();
})

ul.addEventListener('click', function (e) {
    console.log(e.altKey);

    if (e.target == this) {
        return false;
    }
    
    if (!e.altKey) {
        clearSelected(this.children);
    }

    addSelected(e.target);
})

function clearSelected(elems) {
    for (let elem of elems) {
        console.log(elem.classList.remove('selected'));
    }
}

function addSelected(target) {
    target.classList.add('selected');
}
