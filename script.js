const busStopIdInput = document.getElementById("busStopID");
const arrivalInfo = document.getElementById("arrivalInfo");

async function fetchBusArrival(busStopId) {
  const response = await fetch(`https://sg-bus-arrivals-sigma-schoolsc1.replit.app/?id=${busStopId}`);
  if (response.ok) {
  const data = await response.json();
  return data
  } else {
    throw new Error("Error fetching bus arrival data");
  }
}

function formatArrivalData(arrivalData) {
  const buses = arrivalData.services
  let formattedData = [];
  let numOfBuses = 0;
  for (const bus of buses) {
    const arrivalTimeString = `${bus.next_bus_mins} min(s)`
    if (bus.next_bus_mins <= 0) {
      arrivalTimeString = "Arriving"
    }
    formattedData.push(`
    <div>
      <strong>Bus ${bus.bus_no}:</strong> ${arrivalTimeString}
    </div>
    `)
    numOfBuses ++
  }
  formattedData.push(`
  <div>
    ${numOfBuses} Buses
  </div>
  `)
  return formattedData.join("")
}


function displayBusArrival(busStopId) {
  arrivalInfo.innerHTML = "Loading...";
  fetchBusArrival(busStopId)
   .then((arrivalData) => {
      const formattedArrivalData = formatArrivalData(arrivalData);
      arrivalInfo.innerHTML = formattedArrivalData;
    })
    .catch((error) => {
      console.error("Error:", error);
    })
}

let refreshInterval;

function getBusTiming() {    
  if(refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
    
  const busStopId = document.getElementById("busStopId").value;
    
  displayBusArrival(busStopId);
  refreshInterval = setInterval(() => {displayBusArrival(busStopId)}, 5000 )
}