

async function enviarMensagem() {
    if (validacaoEntrada()) {

        const name = dadosDigitados("idName")
        const email = dadosDigitados("idEmail")
        const mensagem = dadosDigitados("idMensagem")

        const respostaApi = await enviarParaApi(name, email, mensagem)

        const retornoNomeApi = respostaApi.apiRecebeu.nome
        const retornoEmailApi = respostaApi.apiRecebeu.email
        const retornoMensagemApi = respostaApi.apiRecebeu.mensagem

        exibirRetornoApi(retornoNomeApi, retornoEmailApi, retornoMensagemApi)

        limparDadosDigitados()
    }
}

function dadosDigitados(valorEntrada) {
    const dadosInput = document.getElementById(valorEntrada).value;
    return dadosInput
}

async function enviarParaApi(dadoNome, dadoEmail, dadoMensagem) {
    const url = `https://target-api-simples.cyclic.app/generica`

    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: dadoNome,
            email: dadoEmail,
            mensagem: dadoMensagem
        })
    }

    const response = await fetch(url, options)
    const responseData = await response.json()

    return responseData

}

function exibirRetornoApi(dado1, dado2, dado3) {
    const elementoDeConfirmacao = document.getElementById("elementoConfirmacao")

    elementoDeConfirmacao.style.display = "flex"

    const elementoNome = document.getElementById("elemento1")
    elementoNome.innerText = "Nome: " + dado1

    const elementoEmail = document.getElementById("elemento2")
    elementoEmail.innerText = "Email: " + dado2

    const elementoMensagem = document.getElementById("elemento3")
    elementoMensagem.innerText = "Mensagem: " + dado3

    const elementoDados = document.getElementById("elementoDadosDaApi")
    elementoDados.style.display = "block "

}

function validacaoEntrada() {
    const validacaoNome = document.getElementById("idName").value
    const validacaoEmail = document.getElementById("idEmail").value
    const validacaoMensagem = document.getElementById("idMensagem").value

    if (validacaoNome == "") {
        alert("Digite o seu nome.")
        return false
    }
    if (validacaoEmail == "") {
        alert("Digite o seu E-mail.")
        return false
    }
    if (validacaoMensagem == "") {
        alert("Digite a sua mensagem.")
        return false
    }

    return true

}

function limparDadosDigitados(){
    document.getElementById("idName").value = ""
    document.getElementById("idEmail").value = ""
    document.getElementById("idMensagem").value = ""
}