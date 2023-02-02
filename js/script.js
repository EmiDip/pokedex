let pokename = 'psyduck';

const desc = 'https://pokeapi.co/api/v2/pokemon-species/' + pokename;
let pokemonAPI;

const h1 = document.querySelector('h1');
const pokeimg = document.querySelector('.text-center > img');
const p = document.querySelector('.w-50 > p');

const height = document.querySelector('li:nth-child(1) > strong');
const weight = document.querySelector('li:nth-child(3) > strong');

const move = document.querySelector('li:nth-child(4) > strong');
const categorie = document.querySelector('li:nth-child(2) > strong');

const genderfemale = document.querySelector('.bi-gender-female');
const gendermale = document.querySelector('.bi-gender-male');


function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}

const specificationsWeight = document.querySelector('#specifications-weight');

window.onload = async function () {
  pokemonAPI = await fetchPokemonApi();

    // getValue();
    fetchName();
    fetchDesc();
    fetchHW();
    fetchImg();
    fetchCategory();
    fetchType();
    fetchStats();
    fetchEvolution();

    // const poundsWeight = parseInt(specificationsWeight.textContent);
    // // console.log({ poundsfetchDesc() });
    // const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
    // // console.log({ kgWeight });
    // specificationsWeight.textContent = `${kgWeight}kg`;
  }

// async function getValue() {
//   const pokeName = document.querySelector(".name-pokemon").value;
//   // console.log(pokeName);
//   return pokeName;
//   }

  async function fetchPokemonApi() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokename);
    return await response.json();
  } 

async function fetchName(){
  
    h1.textContent = pokemonAPI.name;

    const span = document.createElement('span');
    span.textContent = '#' + pokemonAPI.id;
    h1.appendChild(span);

    // console.log(data.id);
  }

async function fetchImg(){

  const repimg = pokemonAPI.sprites.other.home.front_default;
  pokeimg.setAttribute("src", repimg);

    // console.log(data);
  }

async function fetchDesc(){

    const response = await fetch (desc);
    const data = await response.json();

    p.textContent = data.flavor_text_entries[0].flavor_text;

    // console.log(data.shape);

  }

async function fetchHW(){

    height.textContent = pokemonAPI.height/10 + "m";

    weight.textContent = pokemonAPI.weight/10 + "Kg";

    move.textContent = pokemonAPI.abilities[0].ability.name;
    // console.log(data.abilities[0].ability.name);
  }

async function fetchCategory(){
    const response = await fetch (desc);
    const data = await response.json();

    categorie.textContent = data.genera[7].genus;

    // console.log(data.genera[7].genus);

    const gender = data.gender_rate;
    
    switch (gender){
      case -1:
        genderfemale.style.display = 'none';
        gendermale.style.display ='none';
        break;

      case 0:
        genderfemale.style.display = 'none';
        break;

      case 8:
        gendermale.style.display ='none';
        break;

      default:
        genderfemale.style.display = 'inline';
        gendermale.style.display ='inline';
    }
  
    // console.log(gender)
  }

async function fetchType(){

  for (let i = 0; i < pokemonAPI.types.length; i++) {

        const element = pokemonAPI.types[i]; //récupère indice type

        const litype = document.createElement('li'); //créer un element liste 
        const buttontype = document.createElement('button'); //créer un element button

        buttontype.classList.add(element.type.name); //ajoute une class à l'élement 'buttontype'
        buttontype.innerHTML = element.type.name; //ajoute un texte à l'élément 'buttontype'
      
        document.querySelector('.type-list').appendChild(litype); // applique l'element liste 'litype' dans le .type-list
        litype.appendChild(buttontype); //applique le 'buttontype' dans le 'litype'

        const typeUrl ='https://pokeapi.co/api/v2/type/' + element.type.name;
        const resp = await fetch (typeUrl);
        const dataType = await resp.json();

          for (let i = 0; i < dataType.damage_relations.double_damage_from.length; i++) {
            
            const element = dataType.damage_relations.double_damage_from[i];
    
            const weakness = dataType.damage_relations.double_damage_from[i].name;         
    
            const liDamage = document.createElement('li'); //créer une liste pour les faiblesses
            const buttonDamage = document.createElement('button'); //créér un bonton pour les faiblesses
    
            buttonDamage.classList.add(weakness); //créer une classe au bouton buttonDamage
            buttonDamage.innerHTML = weakness; // créer un texte au bouton buttonDamage
    
            document.querySelector('.damage').appendChild(liDamage); //applique l'élément liDamage dans le .damage
            liDamage.appendChild(buttonDamage); //applique le button dans la liste
    
            // console.log(weakness);
          }  
  }
}  

async function fetchStats() {
 
  for (let i = 0; i < pokemonAPI.stats.length; i++) {
    const baseStat = pokemonAPI.stats[i].base_stat;  //Récupère les stats
    const nameStat = pokemonAPI.stats[i].stat.name; //Récupère le nom des stats

    const resultat = Math.round((baseStat*15)/200);//calcul la proportion

    const classname = (nameStat+"-"+resultat);
    // console.log (nameStat, resultat);
    // console.log(nameStat);

    let stats = document.querySelector('.stats');// selectionne le document html
    stats.classList.add(classname); // Ajoute une classe 

    // console.log (classname);
   
  }

}

// 

