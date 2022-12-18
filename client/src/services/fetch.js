async function fetchSubcategories(url) {
    let result = await fetch(url);
    let subcategories = await result.json();
    return subcategories;
}

async function anotherFunction(url){
    //...fetch something
    console.log(url);
}


module.exports = { fetchSubcategories, anotherFunction };