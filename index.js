let carsList = [
  { id: 1, owner: "Rahul Kumar", vName: "Audi A8", vNumber: "UP-4586", entryDate: "10-10-2023", exitDate: "11-12-2023" },
  { id: 2, owner: "Rohit Kumar", vName: "Mercedes", vNumber: "UP-4486", entryDate: "10-10-2023", exitDate: "11-12-2023" },
  { id: 2, owner: "Mohit Kumar", vName: "Mercedes", vNumber: "UP-4486", entryDate: "10-10-2023", exitDate: "11-12-2023" },
  { id: 2, owner: "Sohit Kumar", vName: "Mercedes", vNumber: "UP-4486", entryDate: "10-10-2023", exitDate: "11-12-2023" },
  { id: 2, owner: "Banti Kumar", vName: "Mercedes", vNumber: "UP-4486", entryDate: "10-10-2023", exitDate: "11-12-2023" },
]

const tbody = document.querySelector("#cars_table");
function createListItem(item) {
  tr = document.createElement("tr");
  tdOwner = document.createElement("td");
  tdOwner.innerText = item.owner;
  tdName = document.createElement("td");
  tdName.innerText = item.vName;
  tdNumber = document.createElement("td");
  tdNumber.innerText = item.vNumber;
  tdEntryDate = document.createElement("td");
  tdEntryDate.innerText = item.entryDate;
  tdExitDate = document.createElement("td");
  tdExitDate.innerText = item.exitDate;
  tdDelete = document.createElement("td");
  tdDelete.classList.add("del");
  tdDelete.onclick = deleteItem;
  tdDelete.setAttribute("data", item.id);

  tdDelete.innerText = "delete";
  tr.appendChild(tdOwner);
  tr.appendChild(tdName);
  tr.appendChild(tdNumber);
  tr.appendChild(tdEntryDate);
  tr.appendChild(tdExitDate);
  tr.appendChild(tdDelete);
  tbody.appendChild(tr);
}

function renderTable(list) {
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  list.forEach((item, i) => {
    createListItem(item)
  });
}

renderTable(carsList);

reg_form = document.querySelector("#reg_form");
reg_form.addEventListener('submit', addNewCar);

function addNewCar(e) {
  e.preventDefault();
  const newItem = { id: Math.floor(Math.random()*1000000),
                    owner: reg_form.owner.value,
                    vName: reg_form.vName.value,
                    vNumber: reg_form.vNumber.value,
                    entryDate: reg_form.entryDate.value,
                    exitDate: reg_form.exitDate.value };
  carsList.push(newItem);
  renderTable(carsList);
  resetForm();
}
searchForm = document.querySelector("#searchEntry");
searchForm.addEventListener('submit', searchItem);
// function searchItem(e) {
//   e.preventDefault();
//   console.log(searchForm.searchTerm.value);
//
// }

function searchItem(e) {
  e.preventDefault();
  const searchTerms = searchForm.searchTerm.value.split(' ');
     var foundItems = [];
     searchTerms.forEach(query => {
       var searchResults = carsList.filter(item => item.owner.toLowerCase().includes(query.toLowerCase()));
       foundItems = foundItems.concat(searchResults);
     })
    foundItems = [...new Set(foundItems)];
    console.log(foundItems);
    renderTable(foundItems);
}


formInputs = document.querySelectorAll("#reg_form input");
function resetForm() {
  formInputs.forEach((item, i) => {
    if (item.name !== "submit") {
      item.value = "";
    }
  });
}

function deleteItem() {
  const clickedItem = this.attributes.data.value;
  carsList = carsList.filter( item => item.id != clickedItem );
  renderTable(carsList);
}
