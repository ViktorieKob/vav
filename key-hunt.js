document.addEventListener("DOMContentLoaded", function () {
    const tajnyKlic = "tajny123";
  
    document.body.addEventListener("click", function (e) {
      const target = e.target;
  
      if (target.dataset.key === tajnyKlic) {
        alert("🔓 Našla jsi klíč! Odemkla se tajná část stránky 🎉");
  
        const hiddenArea = document.getElementById("tajna-sekce");
        if (hiddenArea) {
          hiddenArea.classList.remove("hidden");
          hiddenArea.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
  