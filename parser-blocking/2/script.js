function delay(duration) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + duration) {}
}
delay(2000);

console.log("Hello world!");

var span = document.getElementsByTagName("span")[0];
span.style.color = "blue";
