

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (newState) => {
    store = Object.assign(store, newState)
    root.innerHTML = `<h1 class="loading">LOADING....</h1>`
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = await App(state);
}


// create content
const App = async (state) => {
    let { roverSeleted} = state;
    if(roverSeleted) return await roverInfo(roverSeleted);
    return mainPage();
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})