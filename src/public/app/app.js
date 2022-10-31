// add our markup to the page
const root = document.getElementById('root')

const updateStore = (newState) => {
    store = store.merge(Immutable.Map(newState))
    root.innerHTML = `<h1 class="loading">LOADING....</h1>`
    render(root)
}

const render = async () => {
    root.innerHTML = await App();
}


// create content
const App = async () => {
    const roverSeleted = store.get("roverSeleted");
    if(roverSeleted) return await roverInfo(roverSeleted);
    return mainPage();
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render()
})