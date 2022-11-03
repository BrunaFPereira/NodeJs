const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function manejaErros (erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url)
                    return res.status;
    }))
    return arrayStatus;
 }  catch(erro) {
    manejaErros(erro); 

 }
    
}

function geraArrayDeUrls(arrayLinks) {
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join());
}



async function validaUrls (arrayLinks) {
    const links = geraArrayDeUrls(arrayLinks);
    const StatusLinks = await checaStatus(links)
//spreed opeador
    const resultados = arrayLinks.map((objeto, indice) => ({
        ...objeto, 
        status: StatusLinks[indice] 
    }))
    return resultados; 
}




module.exports = validaUrls;