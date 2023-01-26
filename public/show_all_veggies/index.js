// fetch veggies from database and display

let containerElement = document.getElementById("container");

// function to send veggie data from server to front end
const getVeggieData = async () => {
  let data = await fetch("/veggies"); //get /veggies route from server
  data.json().then((parsedData) => {
    console.log(parsedData); //array of objects

    // map through and put in HTML
    parsedData.forEach((object) => {
      let pTag = document.createElement("p"); //make pTag in html
      pTag.textContent = object.name; //set pTag text to object name
      containerElement.appendChild(pTag); //put the ptag inside the container element
    });
  });
};
getVeggieData();
