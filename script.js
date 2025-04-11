/*

console.log("✅ Script JS načten");

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  if (!calendarEl) {
    console.error("❌ Element #calendar nebyl nalezen!");
    return;
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    selectAllow: function (info) {
      const day = new Date(info.startStr).getDay();
      return day === 0 || day === 6; // pouze sobota a neděle
    },
    select: function (info) {
      const formSection = document.getElementById("reservation-form-section");
      const dateSpan = document.getElementById("selected-date");
      const dateInput = document.getElementById("date");

      if (formSection && dateSpan && dateInput) {
        formSection.classList.remove("hidden");
        dateSpan.textContent = info.startStr;
        dateInput.value = info.startStr;
      }
    },
  });

  calendar.render();
});
*/

/*
document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    if (!calendarEl) {
      console.error("❌ Element #calendar nebyl nalezen!");
      return;
    }
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      selectable: true,
      unselectAuto: false,
  
      // Tohle funguje na PC (výběr rozsahu nebo kliknutí myší)
      selectAllow: function (info) {
        const day = new Date(info.startStr).getDay();
        return day === 0 || day === 6;
      },
      select: function (info) {
        zobrazFormular(info.startStr);
      },
  
      // Tohle přidáme pro mobily – kliknutí na konkrétní den
      dateClick: function (info) {
        const day = new Date(info.dateStr).getDay();
        if (day === 0 || day === 6) {
          zobrazFormular(info.dateStr);
        }
      }
    });
  
    calendar.render();
  
    // Funkce pro zobrazení formuláře
    function zobrazFormular(datum) {
      const formSection = document.getElementById("reservation-form-section");
      const dateSpan = document.getElementById("selected-date");
  
      if (formSection && dateSpan) {
        formSection.classList.remove("hidden");
        dateSpan.textContent = datum;
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
  */
  console.log('✅ Script JS načten');

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  if (!calendarEl) {
    console.error("❌ Element #calendar nebyl nalezen!");
    return;
  }

  fetch("events.json")
    .then((response) => response.json())
    .then((events) => {
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        selectable: true,
        events: events,
        selectAllow: function (info) {
          const day = new Date(info.startStr).getDay();
          return (day === 0 || day === 6); // pouze sobota nebo neděle
        },
        select: function (info) {
          const formSection = document.getElementById("reservation-form-section");
          const dateSpan = document.getElementById("selected-date");
          if (formSection && dateSpan) {
            formSection.classList.remove("hidden");
            dateSpan.textContent = info.startStr;
          }
        },
        eventClick: function (info) {
          alert(`Tento termín je označen jako: ${info.event.title}`);
        }
      });

      calendar.render();
    })
    .catch((error) => {
      console.error("Chyba při načítání událostí:", error);
    });
});
