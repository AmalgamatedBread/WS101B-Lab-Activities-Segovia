// Flight records so it gets updated
let registeredFlights = {
    "Kuwait": [],
    "America": [],
    "Poland": [],
    "Manila": [],
    "Catarman": [],
    "Bobon": []
};


function averageFlightDuration(destinationDict) {
    let durations = Object.values(destinationDict);
    let sum = durations.reduce((a, b) => a + b, 0);
    return sum / durations.length;
}


function filterFlightsByStatus(flightList) {
    let availability = [];

    for (let flight of flightList) {
        if (typeof flight === "boolean") {
            availability.push(`Flight ${flight}: Not available`);
        } else {
            availability.push(`Flight ${flight}: Available`);
        }
    }

    console.log("Flights:", availability);
}

// Find longest flight
function findLongestFlight(destinationsDict) {
    let values = Object.values(destinationsDict);
    let longestFlight = Math.max(...values);
    let destination = null;

    for (let [key, value] of Object.entries(destinationsDict)) {
        if (value === longestFlight) {
            destination = key;
            break;
        }
    }

    console.log(`The longest lasts ${longestFlight} from ${destination}`);
}


function groupFlightsByDestination(flightNumber, destination) {
    let exists = Object.values(registeredFlights).some(flights =>
        flights.includes(flightNumber)
    );

    if (!exists) {
        registeredFlights[destination].push(flightNumber);
        console.log("Flight registered successfully");
    } else {
        for (let [key, value] of Object.entries(registeredFlights)) {
            if (value.includes(flightNumber)) {
                console.log(
                    `Flight ongoing for flight ${flightNumber} in ${key}, please choose another line`
                );
            }
        }
    }

    console.log(registeredFlights);
    return registeredFlights;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function main() {
    const prompt = require("prompt-sync")({ sigint: true }); 
    while (true) {
        let flightNumber = parseInt(prompt("Enter flight number: "));
        let destination = prompt("Enter destination: ");

        let records = groupFlightsByDestination(flightNumber, destination);
        console.log("Updating records, another plane is set for the next flight");
        await sleep(3000); 
        console.log("Another flight is open");
    }
}

// Run
main();
