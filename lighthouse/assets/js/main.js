function delay(duration) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + duration) {}
}

delay(1500);
