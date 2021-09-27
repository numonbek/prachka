import 'jquery-validation/dist/jquery.validate.min';
import 'jquery-validation/dist/localization/messages_ru';

function showSuccess() {
  const opts = {
    buttons: [],
    touch: false,
  };

  const instanceTemp = $.fancybox.getInstance();
  if (instanceTemp) opts.beforeShow = () => instanceTemp.close();

  $.fancybox.open({ src: '#successful-send', opts });
}

function submitForm(form) {
  // eslint-disable-next-line no-console
  console.log('Отправка формы!!');

  form.reset();
  showSuccess();
}

function submitHandlerForms(form) {
  submitForm(form);
}

function validateForm(form) {
  $(form).validate({
    errorClass: 'input-validation input-validation--invalid',
    validClass: 'input-validation input-validation--valid',
    errorElement: 'span',
    errorPlacement: ($error, $element) => {
      $element.closest('.input, .checkbox, .radio, .select')
        .find('.input-validation__message')
        .html($error);
    },
    normalizer: (value) => $.trim(value),
    rules: {
      agreement: { required: true },
      name: { required: true, minlength: 3 },
      email: { email: true },
      tel: {
        normalizer: (value) => value.replace(/\D+/g, ''),
        required: true,
        minlength: 11,
      },
    },
    messages: {
      agreement: 'Укажите согласие c правилами пользования',
    },
    submitHandler: submitHandlerForms,
  });
}

function initFormValidation() {
  $('.js-form-validation').each((i, form) => {
    validateForm(form);
  });
}

export default initFormValidation;
