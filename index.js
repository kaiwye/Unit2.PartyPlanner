// === Constant ====
const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/events";

const Guests =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/guests";

const RSVPs =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/rsvps";

// === State ===

let parties = [];
let selectedParty = null;
let selectedPartyId = null;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

// === Guests and RSVPs ===
async function getData(data) {
  try {
    const response = await fetch(data);
    const result = await response.json();
    guestList = result.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedParty = result.data;
    selectedPartyId = id;
    render();
  } catch (err) {
    console.error(err);
  }
}

// === Components ===
function PartyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
    `;
  const $link = $li.querySelector("a");
  if (party.id === selectedPartyId) {
    $link.style.fontWeight = "bold";
    $link.style.fontStyle = "italic";
  }
  $li.addEventListener("click", () => getParty(party.id));
  return $li;
}

function boldSelected(party) {
  if (party) {
    const changeText = document.querySelector("#selected");
    changeText.innerHTML = `<b>${party.name}</b>`;
  }
}

function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("upcomingParties");

  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);

  return $ul;
}

function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an party to find out more!";
    return $p;
  }
  const $party = document.createElement("section");
  $party.classList.add("party");
  $party.innerHTML = `
  <h3>${selectedParty.name} #${selectedParty.id}</h3>
  <p>${new Date(selectedParty.date)}</p>
  <p>${selectedParty.location}</p>
  <p>${selectedParty.description}</p>
  `;
  return $party;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
        <section>
            <h2>Upcoming Parties</h2>
            <PartyList></PartyList>
        </section>
        <section id="selected">
            <h2>Party Details</h2>
            <PartyDetails></PartyDetails>
        </section>
    </main>
    `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties(API);
  await getData(Guests);
  await getData(RSVPs);
  render();
}

init();
