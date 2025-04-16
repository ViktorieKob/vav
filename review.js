
  const TAJNY_KOD = "admin123";

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recenze-form");
    const vypis = document.getElementById("recenze-vypis");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const jmeno = document.getElementById("jmeno").value.trim();
      const datum = document.getElementById("datum").value;
      const tema = document.getElementById("tema").value.trim();
      const zpetnaVazba = document.getElementById("zpetna-vazba").value.trim();

      const novaRecenze = {
        jmeno,
        datum,
        tema,
        zpetnaVazba,
        id: Date.now()
      };

      const recenze = JSON.parse(localStorage.getItem("recenze")) || [];
      recenze.push(novaRecenze);
      localStorage.setItem("recenze", JSON.stringify(recenze));
      zobrazRecenze();
      form.reset();
    });

    zobrazRecenze();
  });

  function zobrazRecenze() {
    const vypis = document.getElementById("recenze-vypis");
    const recenze = JSON.parse(localStorage.getItem("recenze")) || [];
    vypis.innerHTML = "";

    recenze.forEach((recenze) => {
      const div = document.createElement("div");
      div.classList.add("recenzni-bublina");

      div.innerHTML = `
        <strong>👤 ${recenze.jmeno}</strong> (${recenze.datum})<br />
        <em>${recenze.tema}</em><br />
        ${recenze.zpetnaVazba}
      `;

      if (window.mamPravaMazat) {
        const btn = document.createElement("button");
        btn.classList.add("smazat-btn");
        btn.textContent = "Smazat";
        btn.onclick = () => smazatRecenzi(recenze.id);
        div.appendChild(btn);
      }

      vypis.appendChild(div);
    });
  }

  function smazatRecenzi(id) {
    let recenze = JSON.parse(localStorage.getItem("recenze")) || [];
    recenze = recenze.filter((r) => r.id !== id);
    localStorage.setItem("recenze", JSON.stringify(recenze));
    zobrazRecenze();
  }

  function overKod() {
    const kod = document.getElementById("admin-code").value.trim();
    if (kod === TAJNY_KOD) {
      window.mamPravaMazat = true;
      zobrazRecenze();
      alert("✅ Správcovský režim aktivován!");
    } else {
      alert("❌ Neplatný kód");
    }
  }

// 🛡️ Odemknutí admin panelu pomocí Ctrl + A
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key.toLowerCase() === 'a') {
      const panel = document.getElementById('admin-panel');
      if (panel) {
        panel.classList.remove('hidden');
        console.log('🔓 Admin panel odemčen pomocí Ctrl + A');
      }
      e.preventDefault(); // zabrání výběru všeho (výchozí chování Ctrl+A)
    }
  });
  