let carsList = [
  { id: 1, owner: "Rahul Kumar", vName: "Audi A8", vNumber: "UP-4586", entryDate: "01-10-2000", exitDate: "11-12-2023" },
  { id: 2, owner: "Rohit Kumar", vName: "Honda City", vNumber: "UP-4476", entryDate: "10-10-2022", exitDate: "01-02-2000" },
  { id: 3, owner: "Mohit Kumar", vName: "Swift Desire", vNumber: "UP-4686", entryDate: "10-05-2023", exitDate: "11-09-2019" },
  { id: 4, owner: "Sohit Kumar", vName: "Toyota Qualis", vNumber: "UP-4486", entryDate: "15-12-2019", exitDate: "05-07-2022" },
  { id: 5, owner: "Banti Kumar", vName: "Tata Sumo", vNumber: "UP-4486", entryDate: "10-10-2023", exitDate: "20-03-2021" },
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
  for (i=0;i<formInputs.length;i++) {
    if (formInputs[i].value === "") {
      alert("Please fill out all the Fields..");
      return
      break
    }
  };
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

function searchItem(e) {
  e.preventDefault();
  const searchField = searchForm.searchField.value;
  console.log(searchField);
  const searchTerms = searchForm.searchTerm.value.split(' ');
     var foundItems = [];
     searchTerms.forEach(query => {
       var searchResults = carsList.filter(item => item[searchField].toLowerCase().includes(query.toLowerCase()));
       foundItems = foundItems.concat(searchResults);
     })
    foundItems = [...new Set(foundItems)];
    console.log(foundItems);
    renderTable(foundItems);
}

formInputs = document.querySelectorAll("#reg_form input");
function resetForm() {
  formInputs.forEach((item, i) => item.value = "");
  setCurrentDate();
}

function deleteItem() {
  const clickedItem = this.attributes.data.value;
  carsList = carsList.filter( item => item.id != clickedItem );
  renderTable(carsList);
}

const entDate = document.querySelector("#entryDate");
function setCurrentDate() {
  let d = new Date();
  let currentDay = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
  let currentMonth = (d.getMonth()+1) < 10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);
  currentDate = d.getFullYear() + "-" + currentMonth + "-" + currentDay;
  console.log(currentDate);
  entDate.value = currentDate;
}
setCurrentDate();
