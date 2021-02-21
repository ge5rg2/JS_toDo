const clock = document.getElementById("count");

function gettime() {
  const xmasDay = new Date("2022-01-01:00:00:00+0900").getTime();
  const today = new Date().getTime();
  const gap = xmasDay - today;
  const day = Math.ceil(gap / (1000 * 60 * 60 * 24));
  const hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.ceil((gap % (1000 * 60)) / 1000);
  clock.innerText = `${day}일 ${hour < 10 ? `0${hour}`:hour}시간 ${min < 10 ? `0${min}`:min}분 ${sec < 10 ? `0${sec}`:sec}초 남았습니다.`;
}

function init(){
    gettime();
    setInterval(gettime, 1000);
}
init();