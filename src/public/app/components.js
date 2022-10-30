
const closeBtn = ()=>{
  return `<svg class="close" onclick="updateStore({roverSeleted: ''})" height="50" width="50" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(-2 -2)"><path fill="#000" d="M16,2.66666667 C8.62666667,2.66666667 2.66666667,8.62666667 2.66666667,16 C2.66666667,23.3733333 8.62666667,29.3333333 16,29.3333333 C23.3733333,29.3333333 29.3333333,23.3733333 29.3333333,16 C29.3333333,8.62666667 23.3733333,2.66666667 16,2.66666667 Z" fill-rule="nonzero"></path><polygon fill="#fff" points="22.667 20.787 20.787 22.667 16 17.88 11.213 22.667 9.333 20.787 14.12 16 9.333 11.213 11.213 9.333 16 14.12 20.787 9.333 22.667 11.213 17.88 16"></polygon><polygon points="0 0 32 0 32 32 0 32"></polygon></g></svg>`
}

const mainPage = async () => {
  const rovers = await getRovers();
  return `
  <h1 class="welcome">
    WELCOME TO ${store.user.name}'S PROJECT!
  </h1>
  <h2 class="select-rover">PLEASE SELECT ROVER</h2>
  <div class="hoverImg column">
    ${rovers.map((e)=>`<div onclick="updateStore({roverSeleted: '${e.name}'})"><figure><img src="${e.avatar}" class="avatar"></figure><span><h1 class="select-rover">${e.name}</h1></span></div>`)}
  </div>
  `;  
};

const roverInfo = async (roverName) => {
  const rover = await getRover(roverName);
  const { name, launchDate, landingDate, maxSpeed, cost, modelUrl, distanceCovered } = rover;
  const moreInfo = await roverMore(rover);
  return `
  <div>
    <model-viewer class="model nav-info-left border" src="${modelUrl}" camera-controls>
      ${closeBtn()}
      <div>
        <p>Launch Date: ${launchDate}</p>
        <p>Landing Date: ${landingDate}</p>
        <p>Max Speed: ${maxSpeed}</p>
        <p>Cost: ${cost}</p>
        <p>Distance Covered: ${distanceCovered}</p>
      </div>
    </model-viewer>
    ${moreInfo}
  </div>

`
}

const roverMore = async (rover) => {
  const { name, about } = rover;
  const photos = await getPhoto(name);
  return `
    <div class="nav-info-right">
      <div class="border">
        <h1>${name}</h1>
        <p>${about}</p>
        <h2>Some photos</h2>
      <div>
      <div class="nav-info-right scroll border">
      ${photos.map((e) => 
        `
        <div style="background-color: wheat;">
        <img src="${e.img_src}">
        EARTH-DATE: ${e.earth_date}
        <br>
        CAMERA: ${e.camera.full_name}
        </div>
        `
      )}
      </div>
    </div>
  `
};