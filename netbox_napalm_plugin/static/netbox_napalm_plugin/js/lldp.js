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

  // js/lldp.ts
  var CISCO_IOS_PATTERN = new RegExp(/^([A-Z][A-Za-z]+)[^0-9]*([0-9/]+)$/);
  var CISCO_IOS_OVERRIDES = new Map([
    ["TwentyFiveGigE", "Twe"]
  ]);
  function getData(row, query, attr) {
    return row.querySelector(query)?.getAttribute(attr) ?? null;
  }
  function getInterfaceAlias(name) {
    if (name === null) {
      return name;
    }
    if (name.match(CISCO_IOS_PATTERN)) {
      const [base, numeric] = (name.match(CISCO_IOS_PATTERN) ?? []).slice(1, 3);
      if (isTruthy(base) && isTruthy(numeric)) {
        const aliasBase = CISCO_IOS_OVERRIDES.get(base) || base.slice(0, 2);
        return `${aliasBase}${numeric}`;
      }
    }
    return name;
  }
  function updateRowStyle(data) {
    for (const [fullIface, neighbors] of Object.entries(data.get_lldp_neighbors_detail)) {
      const [iface] = fullIface.split(".");
      const row = document.getElementById(iface);
      if (row !== null) {
        for (const neighbor of neighbors) {
          const deviceCell = row.querySelector("td.device");
          const interfaceCell = row.querySelector("td.interface");
          const configuredDevice = getData(row, "td.configured_device", "data");
          const configuredChassis = getData(row, "td.configured_chassis", "data-chassis");
          const configuredIface = getData(row, "td.configured_interface", "data");
          const interfaceAlias = getInterfaceAlias(configuredIface);
          const remoteName = neighbor.remote_system_name ?? "";
          const remotePort = neighbor.remote_port ?? "";
          const [neighborDevice] = remoteName.split(".");
          const [neighborIface] = remotePort.split(".");
          if (deviceCell !== null) {
            deviceCell.innerText = neighborDevice;
          }
          if (interfaceCell !== null) {
            interfaceCell.innerText = neighborIface;
          }
          const nonConfiguredDevice = !isTruthy(configuredDevice) && isTruthy(neighborDevice);
          const validNode = configuredDevice === neighborDevice || configuredChassis === neighborDevice;
          const validInterface = configuredIface === neighborIface || interfaceAlias === neighborIface;
          if (nonConfiguredDevice) {
            row.classList.add("info");
          } else if (validNode && validInterface) {
            row.classList.add("success");
          } else {
            row.classList.add("danger");
          }
        }
      }
    }
  }
  function initLldpNeighbors() {
    toggleLoader("show");
    const url = getNetboxData("object-url");
    if (url !== null) {
      apiGetBase(url).then((data) => {
        if (hasError(data)) {
          createToast("danger", "Error Retrieving LLDP Neighbor Information", data.error).show();
          toggleLoader("hide");
          return;
        } else {
          updateRowStyle(data);
        }
        return;
      }).finally(() => {
        toggleLoader("hide");
      });
    }
  }
  if (document.readyState !== "loading") {
    initLldpNeighbors();
  } else {
    document.addEventListener("DOMContentLoaded", initLldpNeighbors);
  }
})();
