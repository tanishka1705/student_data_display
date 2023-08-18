const std = [];


const existingData = localStorage.getItem('studentData');
if (existingData) {
  const parsedData = JSON.parse(existingData);
  std.push(...parsedData);
}

function generateRows() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; 
  
    for (const student of std) {
      const row = tableBody.insertRow();
  
      const imgCol = row.insertCell(0);
      imgCol.innerHTML = `<img src="${student.img}" style="width: 30px; height: 30px;"/>`;
  
      const nameCol = row.insertCell(1);
      nameCol.textContent = student.name;
  
      const batchCol = row.insertCell(2);
      batchCol.textContent = student.batch;

      const dsaScoreCol = row.insertCell(3);
      dsaScoreCol.textContent = student.dsaScore;
  
      const skillScoreCol = row.insertCell(4);
      skillScoreCol.textContent = student.skillScore;
  
      const codingScoreCol = row.insertCell(5);
      codingScoreCol.textContent = student.codingScore;
  
      const percentageCol = row.insertCell(6);
      percentageCol.textContent = student.percentage + "%";
  
      const statusCol = row.insertCell(7);
      statusCol.textContent = student.status;
  
      if (student.status === "Regular") {
        statusCol.style.backgroundColor = "green";
        statusCol.style.color = "white";
      } else {
        statusCol.style.backgroundColor = "red";
        statusCol.style.color = "white";
      }
  
      const actionCol = row.insertCell(8);
      actionCol.innerHTML = `<button class="delete-btn" onclick="deleteRow(this)">Delete</button>`;
    }
  }


window.addEventListener('load', generateRows);

document.getElementById("uForm").addEventListener("submit", getDetails);

function getDetails(event) {
  event.preventDefault();
  
 
  const img = document.getElementById("img").value;
    const name = document.getElementById("name").value;
    const batch = document.getElementById("batch").value;
    const dsaScore = parseInt(document.getElementById("dsaScore").value);
    const skillScore = parseInt(document.getElementById("skillScore").value);
    const codingScore = parseInt(document.getElementById("codingScore").value);

    const totalScore = dsaScore + skillScore + codingScore;
    const percentage = ((totalScore / 300) * 100).toFixed(2);
    const status = percentage > 50 ? "Regular" : "Async";

 
  std.push({
    img,
    name,
    batch,
    dsaScore,
    skillScore,
    codingScore,
    percentage,
    status
  });


  const data = JSON.stringify(std);
  localStorage.setItem('studentData', data);

  
  //refresh the table with the updated student data.
  generateRows();

  document.getElementById("uForm").reset();
}
//delete first then save to localstorage

function deleteRow(button) {
    const delRow = button.parentNode.parentNode;
    const getIndex = delRow.rowIndex -1; 
    std.splice(getIndex, 1)
    delRow.remove();

    //after delete updated array saved 
    const data = JSON.stringify(std);
    localStorage.setItem('studentData', data);

    generateRows();
}

