(() => {
  // js/bs.ts
  function createToast(level, title, message, extra) {
    let iconName = "mdi-alert";
    switch (level) {
      case "warning":
        iconName = "mdi-alert";
        break;
      case "success":
        iconName = "mdi-check-circle";
        break;
      case "info":
        iconName = "mdi-information";
        break;
      case "danger":
        iconName = "mdi-alert";
        break;
    }
    const container = document.createElement("div");
    container.setAttribute("class", "toast-container position-fixed bottom-0 end-0 m-3");
    const main = document.createElement("div");
    main.setAttribute("class", `toast bg-${level}`);
    main.setAttribute("role", "alert");
    main.setAttribute("aria-live", "assertive");
    main.setAttribute("aria-atomic", "true");
    const header = document.createElement("div");
    header.setAttribute("class", `toast-header bg-${level} text-body`);
    const icon = document.createElement("i");
    icon.setAttribute("class", `mdi ${iconName}`);
    const titleElement = document.createElement("strong");
    titleElement.setAttribute("class", "me-auto ms-1");
    titleElement.innerText = title;
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn-close");
    button.setAttribute("data-bs-dismiss", "toast");
    button.setAttribute("aria-label", "Close");
    const body = document.createElement("div");
    body.setAttribute("class", "toast-body");
    header.appendChild(icon);
    header.appendChild(titleElement);
    if (typeof extra !== "undefined") {
      const extraElement = document.createElement("small");
      extraElement.setAttribute("class", "text-muted");
      header.appendChild(extraElement);
    }
    header.appendChild(button);
    body.innerText = message.trim();
    main.appendChild(header);
    main.appendChild(body);
    container.appendChild(main);
    document.body.appendChild(container);
    const toast = new window.bootstrap.Toast(main);
    return toast;
  }

  // js/util.ts
  function hasError(data) {
    return "error" in data;
  }
  function isTruthy(value) {
    const badStrings = ["", "null", "undefined"];
    if (Array.isArray(value)) {
      return value.length > 0;
    } else if (typeof value === "string" && !badStrings.includes(value)) {
      return true;
    } else if (typeof value === "number") {
      return true;
    } else if (typeof value === "boolean") {
      return true;
    } else if (typeof value === "object" && value !== null) {
      return true;
    }
    return false;
  }
  async function apiRequest(url, method, data) {
    const token = window.CSRF_TOKEN;
    const headers = new Headers({ "X-CSRFToken": token });
    let body;
    if (typeof data !== "undefined") {
      body = JSON.stringify(data);
      headers.set("content-type", "application/json");
    }
    const res = await fetch(url, { method, body, headers, credentials: "same-origin" });
    const contentType = res.headers.get("Content-Type");
    if (typeof contentType === "string" && contentType.includes("text")) {
      const error = await res.text();
      return { error };
    }
    const json = await res.json();
    if (!res.ok && Array.isArray(json)) {
      const error = json.join("\n");
      return { error };
    } else if (!res.ok && "detail" in json) {
      return { error: json.detail };
    }
    return json;
  }
  async function apiGetBase(url) {
    return await apiRequest(url, "GET");
  }
  function* getElements(...key) {
    for (const query of key) {
      for (const element of document.querySelectorAll(query)) {
        if (element !== null) {
          yield element;
        }
      }
    }
  }
  function getNetboxData(key) {
    if (!key.startsWith("data-")) {
      key = `data-${key}`;
    }
    var parent_div = document.getElementById("netbox-data");
    for (const element of parent_div.children) {
      const value = element.getAttribute(key);
      if (isTruthy(value)) {
        return value;
      }
    }
    return null;
  }
  function toggleVisibility(element, action) {
    if (element !== null) {
      if (typeof action === "undefined") {
        const current = window.getComputedStyle(element).display;
        if (current === "none") {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      } else {
        if (action === "show") {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      }
    }
  }
  function toggleLoader(action) {
    for (const element of getElements("div.card-overlay")) {
      toggleVisibility(element, action);
    }
  }

  // js/config.ts
  function initConfig() {
    toggleLoader("show");
    const url = getNetboxData("data-object-url");
    if (url !== null) {
      apiGetBase(url).then((data) => {
        if (hasError(data)) {
          createToast("danger", "Error Fetching Device Config", data.error).show();
          console.error(data.error);
          return;
        } else if (hasError(data.get_config)) {
          createToast("danger", "Error Fetching Device Config", data.get_config.error).show();
          console.error(data.get_config.error);
          return;
        } else {
          const configTypes = ["running", "startup", "candidate"];
          for (const configType of configTypes) {
            const element = document.getElementById(`${configType}_config`);
            if (element !== null) {
              const config = data.get_config[configType];
              if (typeof config === "string") {
                element.innerHTML = config;
              } else {
                element.innerHTML = JSON.stringify(data.get_config[configType], null, 2);
              }
            }
          }
        }
      }).finally(() => {
        toggleLoader("hide");
      });
    }
  }
  if (document.readyState !== "loading") {
    initConfig();
  } else {
    document.addEventListener("DOMContentLoaded", initConfig);
  }
})();
