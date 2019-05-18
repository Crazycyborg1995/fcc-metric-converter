let form = document.querySelector('#convertForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  let input = document.querySelector('#query').value.toString();
  document.querySelector('#query').value = '';
  let url = window.location.href + `api/convert?input=${input}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.string) {
        document.querySelector('#result').textContent = data.string;
      }
      if (data.error) {
        let alert = `<div class="alert alert-primary animator" role="alert">
        ${data.error}
      </div>`;
        setTimeout(() => {
          document.querySelector('.alert-container').innerHTML = alert;
        }, 500);

        setTimeout(() => {
          document.querySelector('.alert-container').innerHTML = ' ';
          // document.querySelector('.alert-container').remove();
        }, 2000);
      }
    });
});
