console.log('Hello Got');

async function rowClick(id) {
    try {
        console.log('clicked: ', id)

        const result = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
        const data = await result.json();

        console.log('data: ', data);

        const charImg = document.getElementById("char-img");
        const nameP = document.getElementById("name-p");
        const titleP = document.getElementById("title-p");
        const houseP = document.getElementById("house-p");

        charImg.src = data.imageUrl;

        nameP.innerHTML = `<b>Name: </b> ${data.fullName}`;
        titleP.innerHTML = `<b>Title: </b> ${data.title}`;
        houseP.innerHTML = `<b>Family: </b> ${data.family}`;

    } catch (e) {
        console.error("error happened: ", e);
    }
}

(async () => {
    try {
        const result = await fetch('https://thronesapi.com/api/v2/Characters');
        const data = await result.json();
        const spinnerDiv = document.getElementById("spinner-div");
        spinnerDiv.remove();
        const tableBody = document.getElementById("table-body");
        for (let i = 0; i < data.length; i++) {
            tableBody.innerHTML += `<tr onclick="rowClick(${i})"><td>${i + 1}</td><td>${data[i].fullName}</td><td>${data[i].title}</td></tr>`;
        }

        rowClick(0);
    } catch (e) {
        console.log('error happened: ', e);
    }

})();
