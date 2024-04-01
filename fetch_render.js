// function for element creation + variables used at each page
function elm ()  {
  let elm = document.createElement(arguments[0]);
  if (arguments[1]){arguments[1].forEach(e=>elm.classList.add(e))}
  if (arguments[2]){elm.innerHTML = arguments[2]}
  return elm
}
const body = document.querySelector("body");
const aTeg = elm("a");
let delay = 0;

// Get data from database using provided URL. Passover URL, element (where to render) and "skip" option to render function
async function fetchRender(url, element, lookUp) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((reject) => document.write(reject));
  render(data, element, lookUp);
  return data;
}

// Function to render received data
function render(data, element, lookUp) {
  const dataWrap = elm("div",["level"]);
   // add idNo to class (to use it later for button event)
  if (data.id) {
    dataWrap.classList.add(`id${data.id}`, `id`);
  }
  dataWrap.style.cssText = `animation: fadeout 0.2s ${delay}s forwards `;
  element.appendChild(dataWrap);
  // crawling through received data
  for (const detail in data) {
    // delay for fade effect
    delay = delay + 0.01;
    // check condition for detail to render or skip
    const condition = lookUp.includes(detail) || lookUp.includes("all");
    const dataString = elm("p");
    let value;
    // add step down sign in "value" if data contain object
    if (typeof data[detail] === "object") {
      value = "&#10534";
    } else {
      value = data[detail];
    }
    // "skip" condition check to render data parcel
    if (condition) {
      dataString.innerHTML = `<span>${detail}</span> : ${value}`;
      dataWrap.appendChild(dataString);
    }
    // if object detected in value, repeat whole render logic for this object
    if (typeof data[detail] === "object") {
      render(data[detail], dataWrap, lookUp);
    }
  }

}
