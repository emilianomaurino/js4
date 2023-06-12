



const requestPoke = async (poke) => {
    try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
    const data = await response.json();
    console.log(data)
    return data;
    } catch (error) {
        console.error(error);
    }

};



