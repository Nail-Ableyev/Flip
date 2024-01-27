const input = document.querySelector("input"),
    previewContainer = document.querySelector(".previewImage__container"),
    pageRefresherContainer = document.querySelector(".pageRefresher__container"),
    actionButtonWrapper = document.querySelector(".mainActionButtons__wrapper"),
    imageSelectorContainer = document.querySelector(".imageSelector__container"),
    imageSelectorLabel =  document.querySelector(".imageSelectorLabel"),
    imageSelectorText = document.querySelector(".imageSelector__text"),
    cardCreatorContainer = document.querySelector(".cardCreator__container"),
    flipCardWrapper = document.querySelector(".flipCard__wrapper"),
    flipCardContainer = document.querySelector(".flipCard__container"),
    adviceArea = document.querySelector(".adviceArea")
    
const imageArray=[]

input.addEventListener("change", function(){
    const files = input.files
    
    for(let i =0; i<files.length;i++){
        imageArray.push(files[i])
    }
    displayPreviews()

    if (files.length){
        cardCreatorContainer.classList.remove("cardCreator__container--hidden");
        previewContainer.classList.remove("previewImage__container--hidden");
        adviceArea.classList.add("adviceArea--hidden")
    }
})

function displayPreviews(){
    let images = ""
    imageArray.forEach((image, index) => {
        images += `<div class="previewImage">
                        <img src="${URL.createObjectURL(image)}" alt="preview of ${image.name}">
                        <span class="previewImage__close" onclick="deletePreview(${index})"></span>
                    </div>`
    })
    previewContainer.innerHTML = images
}

function deletePreview(index){
      imageArray.splice(index,1)
      displayPreviews()
}

function displayCards(listToDisplay){
    let cardsReady=""
    listToDisplay.forEach((image,index) => {
        const cleanName = image.name.replace(/\.[^/.]+$/, "")

        cardsReady+=
        `<div class="flipCard">
            <div data-isnotflipped="true" class="flipCard__inner" onclick="flipCard(this)">
                <div class="flipCard__front"><img src="${URL.createObjectURL(image)}" alt="${cleanName}"></div>
                <div class="flipCard__back">${cleanName}</div>
            </div>
        </div>`
    })
    flipCardContainer.innerHTML=cardsReady

    previewContainer.classList.add("previewImage__container--hidden")

    cardCreatorContainer.classList.add("cardCreator__container--hidden")

    flipCardWrapper.classList.remove("flipCard__wrapper--hidden")

    pageRefresherContainer.classList.remove("pageRefresher__container--hidden")

    imageSelectorLabel.classList.add("buttonGeneral--transformed")

    textRemover()

}

function flipCard(currentElement){
    if (currentElement.dataset.isnotflipped==="true"){
        currentElement.classList.add("flipCard--flipped")
        currentElement.dataset.isnotflipped="false"
    }
    else{
        currentElement.classList.remove("flipCard--flipped")
        currentElement.dataset.isnotflipped="true"
    } 
}

function showAllCards(){
    document.querySelectorAll('.flipCard__inner').forEach((element) => {
        element.classList.add("flipCard--flipped")
        element.dataset.isnotflipped="false"
      });
}

function hideAllCards(){
    document.querySelectorAll('.flipCard__inner').forEach((element) => {
        element.classList.remove("flipCard--flipped")
        element.dataset.isnotflipped="true"
    });
}

function textRemover(){
    let text = imageSelectorText.textContent;

    let timerId = setInterval(() => {
        if (text.length<1){
          clearInterval(timerId);
        }
        text=text.slice(0,-1);
        imageSelectorText.textContent=text;
    }, 50);
}

