//decalred variables 
const searchInp = document.querySelector('input')
const infoText = document.querySelector('.info-text')
const wrapper = document.querySelector('.wrapper')
const volume = document.querySelector('.volume')
const removeIcon = document.querySelector('.removeIcon')
let audio;

//function for creating the content
const createDictwrapper = (data,word)=>{

    infoText.innerHTML = ''

if(data.title){
    infoText.innerHTML = `<p>Can't find the meaning of <span class="user-word">"${word}"</span>. Please try another word</p>`;
    wrapper.classList.remove('active'); 
}else{

    let definitions = data[0].meanings[0].definitions[0]
    let phonetics = `${data[0].meanings[0].partOfSpeech}`
    console.log(definitions)

    wrapper.classList.add('active')

    document.querySelector('.mainWord').innerText = data[0].word
    document.querySelector('.adjective').innerText = phonetics
    document.querySelector('.meaning span').innerText = definitions.definition
    audio = new Audio(data[0].phonetics[0].audio)
 
    if(definitions.example == undefined){
        document.querySelector('.example').style.display = 'none'
    }else{
        document.querySelector('.example').style.display = 'block'
        document.querySelector('.example span').innerText = definitions.example
    }
   

 if(definitions.synonyms[0] == undefined){   
    
    document.querySelector('.synonyms').style.display = 'none'
 }else{
    document.querySelector('.synonyms').style.display = 'block'
    document.querySelectorAll('.synonyms span').forEach((span, index) => {
        span.innerText = definitions.synonyms[index];
        span.addEventListener('click', (e) => {
            console.log(e.target.innerText); 
            searchInp.value = e.target.innerText;
            fetchDicApi(searchInp.value); 
        });
    });
 }}

}

//function for fecthing the api 
const fetchDicApi = async (word) => {

    infoText.innerHTML = `<p>Searching the meaning of <span class="user-word">"${word}"</span></p>`;

    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let data = await response.json();
        console.log()
         createDictwrapper(data, word);
    } catch (error) {
        console.log(error);
    }

};

//function for audio playing
volume.addEventListener('click',()=>{
   console.log(audio)
   audio.play()
})

//function for removing imput vale and focusing 
removeIcon.addEventListener('click', () => {
    searchInp.value = ''; 
    wrapper.classList.remove('active'); 
    removeIcon.style.display = 'none'; 
    infoText.innerHTML = 'Type a word and press enter to get the meaning, example, pronunciation, and synonyms on that typed word.'
});

//function for the inpput triggering and remve icon appearing
searchInp.addEventListener('input', () => {
    if (searchInp.value.length > 0) {
        removeIcon.style.display = 'block'; 
    } else {
        removeIcon.style.display = 'none'; 
    }
});


//fucntionfor calling the fetchApi function when presign the enter button
searchInp.addEventListener('keypress', async (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
        await fetchDicApi(e.target.value.trim());
    }
});
