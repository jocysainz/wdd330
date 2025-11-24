export default class Alert {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Failed to load alerts.json");

      const alerts = await response.json();
      if (alerts.length > 0) {
        this.render(alerts);
      }
    } catch (err) {
      this.renderError("Could not load alerts.");
    }
  }

  render(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;

      p.style.backgroundColor = alert.backgroundColor || "#333";
      p.style.color = alert.textColor || "#fff";

      p.style.padding = "10px";
      p.style.textAlign = "center";
      p.style.margin = "0";
      p.style.fontWeight = "bold";
      p.style.borderRadius = "8px";

      section.appendChild(p);
    });

    const main = document.querySelector("main");
    if (main) main.prepend(section);
  }

  renderError(message) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    const p = document.createElement("p");
    p.textContent = message;
    p.style.backgroundColor = "#FF6347";
    p.style.color = "#fff";
    p.style.padding = "10px";
    p.style.textAlign = "center";
    p.style.margin = "0";
    p.style.fontWeight = "bold";
    p.style.borderRadius = "8px";

    section.appendChild(p);

    const main = document.querySelector("main");
    if (main) main.prepend(section);
  }
}
