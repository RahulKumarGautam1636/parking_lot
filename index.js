let carsList = [
  { id: 1, owner: "Rahul Kumar", vName: "Audi A8", vNumber: "UP-4586", entryDate: "01-10-2000", exitDate: "11-12-2023" },
  { id: 2, owner: "Rohit Kumar", vName: "Honda City", vNumber: "UP-4476", entryDate: "10-10-2022", exitDate: "01-02-2000" },
  { id: 3, owner: "Mohit Kumar", vName: "Swift Desire", vNumber: "UP-4686", entryDate: "10-05-2023", exitDate: "11-09-2019" },
  { id: 4, owner: "Sohit Kumar", vName: "Toyota Qualis", vNumber: "UP-4786", entryDate: "15-12-2019", exitDate: "05-07-2022" },
  { id: 5, owner: "Banti Kumar", vName: "Tata Sumo", vNumber: "UP-4886", entryDate: "10-10-2023", exitDate: "20-03-2021" },
]

const tbody = document.querySelector("#cars_table");
const submitBtn = document.querySelector("#submitBtn");
let update = false;

function createListItem(item) {
  tr = document.createElement("tr");                  // Create Table Elements.
  tr.onclick = function() {
    updateEntry(item.id);
  };
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

  tr.appendChild(tdOwner);                          // Assign them to Table list.
  tr.appendChild(tdName);
  tr.appendChild(tdNumber);
  tr.appendChild(tdEntryDate);
  tr.appendChild(tdExitDate);
  tr.appendChild(tdDelete);
  tbody.appendChild(tr);
}

function renderTable(list) {                        // Render new rows in Table.
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  list.forEach((item, i) => {
    createListItem(item)
  });
}

renderTable(carsList);                              // Initial Rendering of Table.

reg_form = document.querySelector("#reg_form");
reg_form.addEventListener('submit', addNewCar);

function addNewCar(e) {                             // Add new item/car in Table list.
  e.preventDefault();                               // Prevent default behaviour of Form.
  for (i=0;i<formInputs.length;i++) {               // Check for Unfilled input Fields.
    if (formInputs[i].value === "") {
      alert("Please fill out all the Fields..");    // Prompt error message.
      return
      break
    }
  };
  const newItem = { id: Math.floor(Math.random()*1000000),              // Structure the newly created entry.
                    owner: reg_form.owner.value,
                    vName: reg_form.vName.value,
                    vNumber: reg_form.vNumber.value,
                    entryDate: reg_form.entryDate.value.split("-").reverse().join("-"),
                    exitDate: reg_form.exitDate.value.split("-").reverse().join("-") };
  if (update) {
    carsList.forEach((item, i) => { if (item.id === targetItem.id) carsList[i] = newItem; });      // Replace with modified item.
    update = false;
    submitBtn.innerText = "SUBMIT";
  } else {
    carsList.push(newItem);                                               // Add in the Cars list array.
  }
  renderTable(carsList);                                                  // Re-render the Table.
  resetForm();                                                            // Reset Input fields.
}
searchForm = document.querySelector("#searchEntry");
searchForm.addEventListener('submit', searchItem);

function searchItem(e) {                                                // Search for an entry.
  e.preventDefault();                                                   // Prevent default form behaviour.
  const searchField = searchForm.searchField.value;
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
function resetForm() {                                                  // Reset the Form.
  formInputs.forEach((item, i) => item.value = "");
  setCurrentDate();
}

function deleteItem(e) {                                                // Delete an item from Table list.
  const clickedItem = this.attributes.data.value;
  carsList = carsList.filter( item => item.id != clickedItem );
  renderTable(carsList);
  e.stopPropagation();
}

const entDate = document.querySelector("#entryDate");
function setCurrentDate() {                                             // Set Current Date on 'Entry Date' field as default.
  let d = new Date();
  let currentDay = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
  let currentMonth = (d.getMonth()+1) < 10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);
  currentDate = d.getFullYear() + "-" + currentMonth + "-" + currentDay;
  entDate.value = currentDate;
}
setCurrentDate();

function updateEntry(x) {
  update = true;
  submitBtn.innerText = "UPDATE";
  targetItem = carsList.filter(item => item.id === x)[0];
  reg_form.owner.value = targetItem.owner;
  reg_form.vName.value = targetItem.vName;
  reg_form.vNumber.value = targetItem.vNumber;
  reg_form.entryDate.value = targetItem.entryDate.split("-").reverse().join("-");
  reg_form.exitDate.value = targetItem.exitDate.split("-").reverse().join("-");
}
