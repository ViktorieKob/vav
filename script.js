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
document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    if (!calendarEl) {
      console.error("❌ Element #calendar nebyl nalezen!");
      return;
    }
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      selectable: true,
      unselectAuto: false, // neodznačí automaticky
      selectAllow: function (info) {
        const day = new Date(info.startStr).getDay();
        return day === 0 || day === 6; // sobota a neděle
      },
      select: function (info) {
        console.log("📅 Vybraný termín:", info.startStr);
  
        const formSection = document.getElementById("reservation-form-section");
        const dateSpan = document.getElementById("selected-date");
  
        if (formSection && dateSpan) {
          formSection.classList.remove("hidden");
          dateSpan.textContent = info.startStr;
          // Přejdi k formuláři (scroll)
          formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  
    calendar.render();
  });
  