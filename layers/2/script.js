document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("is-open");
  });

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    const col = Math.floor(Math.random() * 7);
    for (let i = 0; i < col; i++) {
      const div = document.createElement("div");
        div.innerHTML = `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
              `;
      grid.append(div);
    }
    fragment.append(grid);
  }
  document.getElementById("container").append(fragment);
});
