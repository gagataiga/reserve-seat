let reservedSeats = {
	record1: {
		seat: "b19",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record2: {
		seat: "b20",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record3: {
		seat: "b21",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	},
	record4: {
		seat: "b22",
		owner: {
			fname: "Joe",
			lname: "Smith"
		}
	}
};


let makeRows = (sectionLength, rowLength, placement) => {
  const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];

  let html = "";
  let counter = 1;

  rows.forEach(row => {

    switch (placement) {
      case "left": html += `<div class="label">${row}</div>`; break;
      case "right": counter = counter + (rowLength - sectionLength); break;
      default: counter = counter + ((rowLength - sectionLength) / 2); break;
    }

    for (let i = 0; i < sectionLength; i++) { 
      html += `<div class="a" id=${row + counter}>${counter}</div>`
      counter++;
    }

    switch (placement) {
      case "left": counter = counter + (rowLength - sectionLength); break;
      case "right": html += `<div class="label">${row}</div>`; break;
      default: counter = counter + ((rowLength - sectionLength) / 2); break;
    }

  });

  document.getElementById(placement).innerHTML = html;
}

makeRows(3,15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");

// making reserved seats
for (const key in reservedSeats) { 
  const obj = reservedSeats[key];
  
  document.getElementById(obj.seat).className = "r";
  document.getElementById(obj.seat).innerHTML = "R";
}
  
(function () { 
  "use strict";

  let selectSeats = [];
  let seats = document.querySelectorAll(".a");

  seats.forEach(seat => {
    seat.addEventListener("click", (event) => {
      seatSelectProcess(seat.id);
    });  
  });

  let seatSelectProcess = (thisSeatId) => { 
    if (!document.getElementById(thisSeatId).classList.contains("r")) {
      const index = selectSeats.indexOf(thisSeatId);

      if (index > -1) {
        selectSeats.splice(index, 1);
        document.getElementById(thisSeatId).className = "a";
      } else { 
        selectSeats.push(thisSeatId);
        document.getElementById(thisSeatId).className = "s";
      }
      manageConfirmForm();
    }
  }

  document.getElementById("reserve").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("resform").style.display = "block";
  })

  document.getElementById("cancel").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("resform").style.display = "none";
  })


  let manageConfirmForm = () => { 
    if (selectSeats.length > 0) {
      document.getElementById("confirmres").style.display = "block";

      if (selectSeats.length === 1) {
         document.getElementById("selectedseats").innerHTML = `you have selected seat ${selectSeats[0]}`
      } else { 
        let seatString = selectSeats.toString();

        // regular expression
        seatString = seatString.replace(/,/g, ",");
        seatString = seatString.replace(/,(?=[^,]*$)/, " and ");
        document.getElementById("selectedseats").innerHTML = `you have selected some seats ${seatString}`;
      }

    } else { 
      document.getElementById("confirmres").style.display = "none";
      document.getElementById("selectedseats").innerHTML = 'You need to select some seats to reserve <br> <a href="#" id="error">close</a> this dialog box and pick at least one seat.';
      document.getElementById("error").addEventListener("click", () => {
        document.getElementById("resform").style.display = "none";
      });
    }
  }
  manageConfirmForm();

  document.getElementById("confirmres").addEventListener("submit", (e) => {
    e.preventDefault();
    processReservation();
   });

  let processReservation = () => {
    const hardCodeRecords = Object.keys(reservedSeats).length;

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    let counter = 1;
    let nextRecord = "";

    selectSeats.forEach((thisSeat) => {
      document.getElementById(thisSeat).className = "r";
      document.getElementById(thisSeat).innerHTML = "R";
      
      nextRecord = `record${hardCodeRecords + counter}`;
      reservedSeats[nextRecord] = {
        seat: thisSeat,
        owner: {
          fname: fname,
          lname: lname
        }
      }
      counter++;
    });
    document.getElementById("resform").style.display = "none";
    selectSeats = [];
    manageConfirmForm();

    console.log(reservedSeats);
  };

})();