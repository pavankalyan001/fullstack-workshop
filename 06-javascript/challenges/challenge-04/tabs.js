// Tabs data (dynamic source)
const tabsData = [
  { title: 'Overview', content: 'Overview content here...' },
  { title: 'Features', content: 'Features content here...' },
  { title: 'Pricing', content: 'Pricing content here...' }
];

const tabsContainer = document.getElementById("tabs");
const contentContainer = document.getElementById("tabContent");

let activeTabIndex = 0;

// Create tabs dynamically
tabsData.forEach((tab, index) => {
  const button = document.createElement("button");
  button.className = "tab";
  button.textContent = tab.title;
  button.setAttribute("role", "tab");
  button.setAttribute("tabindex", index === 0 ? "0" : "-1");

  button.addEventListener("click", () => setActiveTab(index));
  button.addEventListener("keydown", (e) => handleKeyNavigation(e, index));

  tabsContainer.appendChild(button);
});

// Set active tab
function setActiveTab(index) {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    tab.setAttribute("tabindex", i === index ? "0" : "-1");
  });

  contentContainer.textContent = tabsData[index].content;
  activeTabIndex = index;
  tabs[index].focus();
}

// Keyboard navigation
function handleKeyNavigation(event, index) {
  if (event.key === "ArrowRight") {
    const next = (index + 1) % tabsData.length;
    setActiveTab(next);
  }

  if (event.key === "ArrowLeft") {
    const prev = (index - 1 + tabsData.length) % tabsData.length;
    setActiveTab(prev);
  }
}

// Initialize first tab
setActiveTab(0);
