document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-company-access-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.alert('Unable to complete your request from this page. Please contact support for account assistance.');
    });
  });
});
