const chalk = require('chalk');

const fs = require('fs');



function extraiLink (texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;

    while((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temp[1]]: temp[2] })
    }
    return arrayResultados;
}


function trataErro (erro) {
    throw new Error(chalk.red(erro.code, 'Não tem arquivo no caminho'));
}

async function pegaArquivo (caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
       const texto = await fs.promises.readFile (caminhoDoArquivo, encoding)
       console.log(extraiLink(texto));
    } catch(erro) {
        trataErro(erro);
    } 
   }

   pegaArquivo('./arquivos/texto1.md');