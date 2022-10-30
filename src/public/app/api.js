// ------------------------------------------------------  API CONFIG
const get = async (endpoint, params=null) => {
  if(params){
    params = Object.entries(params).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
  }else{
    params = "";
  }
  const res = await fetch(`http://localhost:3000/${endpoint}?${params}`,{
    method:"GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await res.json();
}

// APIs

const getRovers = async ()=>{
  return await get(`rovers`)
}

const getRover = async (rover)=>{
  return await get(`rover/${rover}`)
}

const getPhoto = async (rover)=>{
  return await get(`rover/${rover}/photos`, {
    sol: 10
  });
}