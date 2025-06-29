// form.js (frontend)
document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => data[key] = value);

    const response = await fetch('http://localhost:3001/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        alert('¡Formulario enviado correctamente!');
        this.reset();
    } else {
        alert('Error al enviar el formulario: ' + result.error);
    }
});