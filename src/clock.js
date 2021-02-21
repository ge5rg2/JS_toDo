const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getDate() {
    const today = new Date();
    const dateTitle = clockContainer.querySelector('h2');
    const dayNameTitle = clockContainer.querySelector('h3');
      
    const dateString = today.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
      
    const dayName = today.toLocaleString('ko-KR', { weekday: 'long' });
      
    dateTitle.innerText = dateString;
    dayNameTitle.innerText = dayName;
}
      

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getDate();
    setInterval(getTime, 1000);
}

init();