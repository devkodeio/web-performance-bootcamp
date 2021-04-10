document.addEventListener("keyup", (e) => {
  switch (event.key) {
    case "n":
      console.log("Main thread blocks for 5 seconds");
      delay(5000);
      break;
  }
});
function delay(duration) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + duration) {}
}
