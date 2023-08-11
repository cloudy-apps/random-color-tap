async function changeColor(deviceId) {
  const path = `/v1.0/devices/${deviceId}/commands`;
  const hue = Math.floor(Math.random() * 1000) % 360;
  const payload = {
    commands: [
      { code: "switch_led", value: true },
      { code: "colour_data_v2", value: { h: hue, s: 1000, v: 1000 } },
    ],
  };

  const response = await fetch(
    "https://tuya-connector.jsfn.run/request?method=POST&path=" +
      encodeURIComponent(path),
    {
      mode: "cors",
      body: JSON.stringify(payload),
    }
  );

  return response.ok;
}

export default function (req, res, next) {
  if (req.url.startsWith("/tap/")) {
    const deviceId = req.url.replace("/tap/", "");
    changeColor(deviceId);
    res.end("");
  }

  next();
}
