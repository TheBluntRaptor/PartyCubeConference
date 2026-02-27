// Communication between control panel and overlay via postMessage
// Works on both file:// and http:// origins

class PartyBroadcast {
  constructor(role) {
    this.role = role; // "control" or "overlay"
    this.listeners = {};
    this.targetWindow = null;

    window.addEventListener("message", (event) => {
      if (!event.data || !event.data.__plc) return;
      const { type, data } = event.data;
      const handlers = this.listeners[type];
      if (handlers) {
        handlers.forEach((handler) => handler(data));
      }
    });
  }

  // Set the target window to send messages to
  setTarget(win) {
    this.targetWindow = win;
  }

  send(type, data = {}) {
    const message = { __plc: true, type, data };

    if (this.targetWindow) {
      try {
        this.targetWindow.postMessage(message, "*");
      } catch (e) {
        // Window may have been closed
      }
    }

    // Overlay also tries to send to opener
    if (this.role === "overlay" && window.opener) {
      try {
        window.opener.postMessage(message, "*");
      } catch (e) {}
    }
  }

  on(type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  // Convenience methods
  sendMatchData(matchData) {
    this.send("SET_MATCH_DATA", matchData);
  }

  sendSceneChange(scene) {
    this.send("SCENE_CHANGE", { scene });
  }

  sendRevealStep(step, data = {}) {
    this.send("REVEAL_STEP", { step, ...data });
  }

  sendFadeOut() {
    this.send("FADE_OUT");
  }

  sendReset() {
    this.send("RESET");
  }
}
