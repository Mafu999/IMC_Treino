document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('#form-adiciona');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var paciente = obtemPacienteDoFormulario(form);

        if (!validaPeso(paciente.peso) || !validaAltura(paciente.altura)) {
            alert("Peso ou altura inválidos.");
            return;
        }

        fetch('http://localhost:3000/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paciente)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Paciente adicionado:', data);
        })
        .catch(error => {
            console.error('Erro ao adicionar paciente:', error);
        });

        form.reset();
    });
});

function obtemPacienteDoFormulario(form) {
    return {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    };
}

function validaPeso(peso) {
    return (peso >= 0 && peso < 1000);
}

function validaAltura(altura) {
    return (altura >= 0 && altura <= 3.0);
}

function calculaImc(peso, altura) {
    var imc = peso / (altura * altura);
    return imc.toFixed(2);
}
