let novaImagem = chrome.runtime.grtURL('Scarlett.jpeg')

//Função para subistituir imagens
function substituiImagens(){
    let imagens = document.getElementsByName('img')
    for (const img of imagens){
        if(img.classList.contains('substituida')) continue
        let novaImg = new Image()
        novaImg.src = novaImagem
        novaImg.style.width = img.offsetWidth + "px"
        novaImg.style.height = img.offsetHeight + "px"
        novaImg.style.objectFit = "cover"
        novaImg.classList.add('substituida')
        img.parentNode.replaceChild(novaImg, img)
    }    
}

function substituiFundo(){
    let elementosComFundo = document.querySelectorAll('*')
    for (const elemento of elementosComFundo){
        if(elemento.computedStyleMap.backgroundImage){
            elemento.style.backgroundImage = `url('${novaImagem}')`
            elemento.style.backgroundSize = "cover"
        }
    }
}
function substituiIframes(){
    let iframes = document.getElementsByTagName("iframe")
        for(const iframe of iframes){
        let img = document.createElement("img")
        img.src = novaImagem
        img.style.width = iframe.offsetWidth + "px"
        img.style.height = iframe.offsetHeight + "px"
        img.style.objectFit = "cover"
        iframes.parentNode.replaceChild(img, iframes)
    }
    
}

function substituiTudo(){
    substituiImagens()
    substituiIframes()
    substituiFundo()
}

substituiTudo()

//Declara uma variavel para o Observador
let timeoutId

const Observador = MutationObserver(() =>{
    clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            substituiTudo()
    },100)

})

const config = {childList:true, subtree: true}
Observador.observe(document.body, config)




