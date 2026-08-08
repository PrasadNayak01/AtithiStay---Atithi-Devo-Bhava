(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

let taxToggle = document.getElementById("switchCheckDefault");
taxToggle.addEventListener("change", () => {
  let taxInfo = document.getElementsByClassName("gst");
  for (tax of taxInfo) {
    if (tax.style.display !== "inline") {
      tax.style.display = "inline";
    } else {
      tax.style.display = "none";
    }
  }
});

const ratingInput = document.getElementById("rating");
const ratingOutput = document.getElementById("ratingValue");

ratingOutput.textContent = ratingInput.value;

ratingInput.addEventListener("input", function () {
  ratingOutput.textContent = this.value;
});
