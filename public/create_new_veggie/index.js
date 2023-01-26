let submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", async () => {
  let nameString = document.getElementById("name-input").value;
  let colorString = document.getElementById("color-input").value;
  let ageNumber = +document.getElementById("age-input").value;
  let readyBool =
    document.getElementById("ready-bool").value === "true" ? true : false;

  console.log(nameString);

  const veggie = {
    nameString,
    colorString,
    ageNumber,
    readyBool,
  };

  console.log(JSON.stringify(veggie));

  let response = await fetch("http://localhost:3000/create_new_veggie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(veggie),
  });
  console.log(response);
});
