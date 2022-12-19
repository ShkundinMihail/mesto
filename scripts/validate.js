
const checkValidity = (input, config) => {
    const error = document.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) { //Проверяем валидность через встроенное свойство
        input.classList.add(config.inputErrorClass);                
        error.textContent = input.validationMessage; // Также инпут хранит ошибку в этом поле, проверять атрибуты minLenght и тп не нужно. Все уже проверила input.validity
    }
    else {
        input.classList.remove(config.inputErrorClass);
        error.textContent = '';                                                      
    }                                                                                

};
const toggleButton = (inputs, button, config) => {                                   //
    const isValid = inputs.every(input => input.validity.valid);                     //                     
    if (isValid) {                                                                   //
        button.classList.remove(config.inactiveButtonClass);                         //
        button.disabled = '';                                                        //функция дизейбла кнопки. 
    } else {                                                                         //                                                                               //                                                                                   
        // button.classList.add(config.inactiveButtonClass);                         //
        // button.disabled = 'disabled';                                             //
        //button.classList.add(config.errorClass)                                    //
    }                                                                                //
};                                                                                   //


const enableValidation = (config) => {
    const forms = [...document.querySelectorAll(config.formSelector)];
    forms.forEach(form => {
        const inputs = [...form.querySelectorAll(config.inputSelector)];   //находим инпуты в форме
        const button = form.querySelector(config.submitButtonSelector);    //кнопка
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        });
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                checkValidity(input, config)
                toggleButton(inputs, button, config);
            });
        });
    });
}

enableValidation({                                                                   //  запутывает.........
    formSelector: '.popup__author-edit',                                             //
    inputSelector: '.popup__input-style',                                            // но с другой стороны удобно если где-то накосячил.
    submitButtonSelector: '.popup__save',                                            //  _        _____   _         ______  ______  _         _______   _______
    inactiveButtonClass: 'popup__save_disabled',                                     // | \    | |     | | \    |  |       |       | \    |  |         |
    inputErrorClass: 'popup__input-style_error',                                     // |  \   | |     | |  \   |  |_____  |______ |  \   |  |______   |_______
    errorClass: 'popup__save_disabled'                                               // |   \  | |     | |   \  |        | |       |   \  |         |  |
});                                                                                  // |    \_| |_____| |    \_|  ______| |______ |    \_|  _______|  |_______




// const checkValidity = (input, config) => {
//     const error = document.querySelector(`#${input.id}-error`); //находим span по id инпута
//     const reg = /^(ftp|http|https):\/\/[^ "]+$/;                //регуляр для проверки Url
//     if (!input.value.length) {
//         input.classList.add(config.inputErrorClass);            //если поле пустое      
//         error.textContent = 'оба поля обязательные';
//     }
//     else if (input.getAttribute('type') === 'url' && !reg.test(input.value)) { //для поля url
//         error.textContent = "в поле «Ссылка на картинку» должен быть URL";
//         input.classList.add(config.inputErrorClass);
//     }
//     else if (input.getAttribute('type') === 'text' && (input.value.length < input.getAttribute('minlength') || input.value.length > input.getAttribute('maxlength'))) {
//         input.classList.add(config.inputErrorClass);                                 //               ／＞　 フ                                     
//         error.textContent = input.getAttribute('data-valid-value');                  //               | 　_　_| 
//     }                                                                                //             ／` ミ＿xノ
//     else {                                                                           //            /　　　　 |
//         input.classList.remove(config.inputErrorClass);                              //           /　 ヽ　　 ﾉ
//         error.textContent = '';                                                      //           │　　|　| |
//     }                                                                                //      ／￣|　　 |　| |
// };                                                                                   //      (  ￣ヽ＿_ヽ_)__)
//                                                                                      //       ＼二)              
