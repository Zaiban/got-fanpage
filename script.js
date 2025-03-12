console.log('Hello Got');

(async () => {
    const result = await fetch('https://thronesapi.com/api/v2/Characters');

    console.log(result);


    const data = await result.json();

    console.log('data: ', data);

    const spinnerDiv = document.getElementById("spinner-div");
    spinnerDiv.remove();

    const tableBody = document.getElementById("table-body");

    for (let i = 0; i < data.length; i++) {
        tableBody.innerHTML += `<tr><td>${i + 1}</td><td>${data[i].fullName}</td><td>${data[i].title}</td></tr>`;

    }

})();
