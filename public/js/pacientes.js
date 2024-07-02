document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/pacientes')
    .then(response => response.json())
    .then(data => {
        data.forEach(function(paciente) {
            adicionaPacienteNaTabela(paciente);
        });
    })
    .catch(error => {
        console.error('Erro ao obter pacientes:', error);
    });
});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector('#tabela-pacientes');
    tabela.appendChild(pacienteTr);
}

function montaTr(paciente) {
    var pacienteTr = document.createElement('tr');
    pacienteTr.classList.add('paciente');

    pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome'));
    pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
    pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
    pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement('td');
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
