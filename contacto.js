emailjs.init("Fpe5tRctjPyoNIDyD");

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_xppniqp", "template_2a0lq7k", this)
    .then(function() {
        document.getElementById("success-message").style.display = "block";
        document.getElementById("contact-form").reset();
    }, function(error) {
        alert("Error al enviar el formulario: " + JSON.stringify(error));
    });
});
