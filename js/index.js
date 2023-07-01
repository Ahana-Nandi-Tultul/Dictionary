const loadWordInfo = async(searchText, searchField) => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`);
    const data = await res.json();
    displayResponse(data[0], searchText, searchField);
}

const displayResponse = async (data, searchText, searchField) => {
    if(data === undefined){
        alert('You should give a valid word');
        return 0;
    }
    // console.log(data);
    searchField.value = '';
    const dictionaryDiv = document.getElementById('dictionary');
    dictionaryDiv.innerHTML = '';
    const dictionaryInfoDiv = document.createElement('div');
    dictionaryInfoDiv.classList.add('p-3')
    dictionaryInfoDiv.innerHTML = `
    <div class="d-flex justify-content-between">
        <div >
            <h1 class="fw-bold fs-1">${searchText}</h1>
            <p>${data.phonetics[0].text}</p>
        </div>
        <div>
        <i class="fa fa-play-circle-o fa-5x" onclick="playAudio('${data.phonetics[0].audio}')" aria-hidden="true"></i> 
        </div>
    </div>
    `;
    for(const meaning of data.meanings){
        dictionaryInfoDiv.innerHTML += `
        <div class="d-flex align-items-center gap-4 mt-4">
                    <h2 id="parts-of-speceh">${meaning.partOfSpeech}</h2>
                    <hr style="width:100%">
        </div>
        `;
        if(meaning.definitions){
            
            meaningDefination(meaning.definitions, dictionaryInfoDiv);
        }
    }
    if(data.meanings[0].synonyms && data.meanings[0].synonyms.length >= 1){
        const synonymsDiv = document.createElement('div');
        synonymsDiv.innerHTML = `<span class="text-secondary fw-bold fs-">Synonyms: </span>`;
        for(const syn of data.meanings[0].synonyms){
            synonymsDiv.innerHTML += `<span class="text-danger"> ${syn} </span>`;
        }
        dictionaryInfoDiv.appendChild(synonymsDiv);
    }
    if(data.meanings[0].antonyms && data.meanings[0].antonyms.length >= 1){
        const antonymsDiv = document.createElement('div');
        antonymsDiv.innerHTML = `<span class="text-secondary fw-bold fs-">Synonyms: </span>`;
        for(const ant of data.meanings[0].antonyms){
            antonymsDiv.innerHTML += `<span class="text-primary"> ${ant} </span>`;
        }
        dictionaryInfoDiv.appendChild(antonymsDiv);
    }
    const sourceDiv = document.createElement('div');
    sourceDiv.innerHTML = `
    <hr>
    <span class="text-secondary  fs-5">Source: <span class="text-decoration-underline fw-bold"> ${data.sourceUrls[0]? data.sourceUrls[0]: 'No souce Url'}</span> </span>
    `;
    dictionaryInfoDiv.appendChild(sourceDiv);
    dictionaryDiv.appendChild(dictionaryInfoDiv)
}

function playAudio(url){
    console.log(url);
    const bounce = new Audio(url);
    bounce.autoPlay = false;
    bounce.play();
    // console.log(bounce);
    
}

const meaningDefination = (definations, dictionaryInfoDiv) => {
    // console.log(dictionaryInfoDiv, definations);
    const meaningDiv = document.createElement('div');
    meaningDiv.innerHTML = `<h4 class="text-secondary">Meaning</h4>`
    if(definations.length >= 1){
        const ul = document.createElement('ul')
        for(const array of definations){

            // console.log(array.definition);
            ul.innerHTML += `
            <li>${array.definition}</li>
            `;
        }
        meaningDiv.appendChild(ul);
        
    }
    else{
        meaningDiv.innerHTML += `<p> No defination found.</p>`
    }
    dictionaryInfoDiv.appendChild(meaningDiv)
    
}

document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    if(!searchFieldValue){
        alert('You should give a word.')
    }
    else{
        
        loadWordInfo(searchFieldValue, searchField);
    }
})

// let searchText = 'keyboard';
// loadWordInfo(searchText);

