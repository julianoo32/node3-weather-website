const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    message2.textContent = "Loading";
    message1.textContent = "Loading";

    const location = search.value;
    if (!location) {
        console.log('Enter a location')
    }
    const url = 'http://localhost:3000/weather?address=' + location;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                message1.textContent = data.error;
                message2.textContent = "";
            } else {
                message1.textContent = data.foundLocation;
                message2.textContent = data.forecastData;
            }
        });
    });
})
