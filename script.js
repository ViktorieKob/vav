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
  console.log("✅ Script JS načten");

  function zobrazFormular(datum) {
    const formSection = document.getElementById("reservation-form-section");
    const dateSpan = document.getElementById("selected-date");
    const dateInput = document.getElementById("date");
  
    if (formSection && dateSpan && dateInput) {
      formSection.classList.remove("hidden");
      dateSpan.textContent = datum;
      dateInput.value = datum;
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
  
    if (!calendarEl) {
      console.error("❌ Element #calendar nebyl nalezen!");
      return;
    }
  
    fetch("events.json")
      .then((response) => response.json())
      .then((data) => {
        const busyDates = data.busy || [];
  
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: "dayGridMonth",
          firstDay: 1, // Pondělí
          locale: "cs",
          selectable: true,
          selectAllow: function (info) {
            const day = new Date(info.startStr).getDay();
            return (day === 6 || day === 0) && !busyDates.includes(info.startStr);
          },
          select: function (info) {
            zobrazFormular(info.startStr);
          },
          datesSet: function () {
            setTimeout(() => {
              const allDays = document.querySelectorAll(".fc-daygrid-day");
              allDays.forEach((dayCell) => {
                const dateStr = dayCell.getAttribute("data-date");
                const dateObj = new Date(dateStr);
                const day = dateObj.getDay();
  
                // Vymažeme staré classy
                dayCell.classList.remove("obsazeno", "volno", "nelze");
  
                // Přidáme novou podle podmínek
                if (busyDates.includes(dateStr)) {
                  dayCell.classList.add("obsazeno");
                } else if (day === 6 || day === 0) {
                  dayCell.classList.add("volno");
                } else {
                  dayCell.classList.add("nelze");
                }
              });
            }, 0);
          },
        });
  
        calendar.render();
      })
      .catch((error) => {
        console.error("❌ Chyba při načítání dat: ", error);
      });
  });
  
