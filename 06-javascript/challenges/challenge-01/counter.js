let count = 0;
let step = 1;

const countEl = document.getElementById("count");

const updateCount = () => {
  countEl.textContent = `${count}`;
};

document.getElementById("increment").addEventListener("click", () => {
  count += step;
  updateCount();
});

document.getElementById("decrement").addEventListener("click", () => {
  count -= step;
  updateCount();
});

document.getElementById("reset").addEventListener("click", () => {
  count = 0;
  updateCount();
});

document.querySelectorAll(".step-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".step-btn").forEach(b => b.classList.remove("active-step"));
    btn.classList.add("active-step");
    step = Number(btn.dataset.step);
  });
});