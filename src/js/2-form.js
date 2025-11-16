const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

// Об'єкт, як в ТЗ: поза всіма функціями
const formData = {
  email: '',
  message: '',
};

// Відновлюємо форму при завантаженні сторінки
loadFormData();

// Делегування: слухаємо всю форму
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;

  // Якщо раптом в формі буде щось зайве – ігноруємо
  if (!(name in formData)) return;

  // Зберігаємо обрізане значення в об'єкт
  formData[name] = value.trim();

  // Пишемо в localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    formData.email = parsed.email ?? '';
    formData.message = parsed.message ?? '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing saved form data:', error);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  // Беремо актуальні значення з форми, обрізаємо пробіли
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  formData.email = email;
  formData.message = message;

  // Перевірка на заповненість полів
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  // Виводимо актуальний об'єкт в консоль
  console.log(formData);

  // Чистимо сховище
  localStorage.removeItem(STORAGE_KEY);

  // Скидаємо об'єкт
  formData.email = '';
  formData.message = '';

  // Очищаємо форму
  form.reset();
}
