console.log("✅ Script review.js načten");

const ADMIN_KOD = "mojetajneheslo";

document.addEventListener("DOMContentLoaded", () => {
  const recenzeContainer = document.getElementById("recenze-container");

  fetch("https://sheet.best/api/sheets/1HkiN2Tlh3-70SqQbJQRsZLTmIBM1NoEJgNeHg9kW9O0")
    .then((res) => res.json())
    .then((data) => {
      data.reverse().forEach((recenze, index) => {
        const recenzeEl = document.createElement("div");
        recenzeEl.classList.add("recenze-bublina");

        recenzeEl.innerHTML = `
          <h3>${recenze["Jméno"]}</h3>
          <p class="datum">${recenze["Datum výletu"] || "Bez data"}</p>
          <p class="text">${recenze["Text recenze"]}</p>
          <button class="btn-smaz hidden" data-index="${index}">❌ Smazat</button>
        `;

        recenzeContainer.appendChild(recenzeEl);
      });
    })
    .catch((err) => {
      console.error("Chyba při načítání recenzí:", err);
    });

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "a") {
      const kod = prompt("Zadej administrátorský kód:");
      if (kod === ADMIN_KOD) {
        document.querySelectorAll(".btn-smaz").forEach(btn => btn.classList.remove("hidden"));
      }
    }
  });
});
/*pokračování*/

document.addEventListener("DOMContentLoaded", () => {
    const sheetID = "1HkiN2Tlh3-70SqQbJQRsZLTmIBM1NoEJgNeHg9kW9O0";
    const sheetName = "Odpovědi formuláře 1";
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  
    fetch(url)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2));
        const rows = json.table.rows;
  
        const container = document.getElementById("reviews-container");
        container.innerHTML = "";
  
        rows.forEach(row => {
          const jmeno = row.c[1]?.v || "Neznámý";
          let datum = "-";
if (row.c[2]?.v) {
  const raw = row.c[2].v;

  // Zkusíme detekovat formát "Date(2025,3,13)"
  const match = raw.match(/Date\((\d+),(\d+),(\d+)\)/);
  if (match) {
    const rok = match[1];
    const mesic = String(parseInt(match[2]) + 1).padStart(2, "0"); // měsíc je 0-based
    const den = String(match[3]).padStart(2, "0");
    datum = `${den}.${mesic}.${rok}`;
  } else {
    datum = raw; // fallback - pokud by byl klasický text
  }
}





          const vylet = row.c[3]?.v || "-";
          const recenze = row.c[4]?.v || "-";
  
          const card = document.createElement("div");
          card.className = "review-card";
          card.innerHTML = `
            <p><strong>👤 ${jmeno}</strong> (${datum})</p>
            <p><em>${vylet}</em></p>
            <p>${recenze}</p>
          `;
  
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Nepodařilo se načíst recenze:", err);
      });
  });
  

 