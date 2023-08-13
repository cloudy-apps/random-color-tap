const cors = { mode: "cors", method: "POST" };

async function changeColor(deviceId, color, credentials) {
  const { clientId, clientSecret } = credentials;
  const value = {
    h: Number(color.h),
    s: Number(color.s * 10),
    v: Number(color.v * 10),
  };

  const commands = {
    commands: [
      { code: "switch_led", value: true },
      { code: "colour_data_v2", value },
    ],
  };

  const url = `https://tuya-connector.jsfn.run/commands?deviceId=${deviceId}&clientId=${clientId}&clientSecret=${clientSecret}`;
  const payload = { ...cors, body: JSON.stringify(value) };

  console.log(url, payload);
  const response = await fetch(url, payload);

  return response.ok;
}

export default async function (req, res, next) {
  if (req.url.startsWith("/tap/")) {
    const [deviceId, colorString] = req.url.replace("/tap/", "").split("/");
    const [h, s, v] = colorString.split(",");
    const color = { h, s, v };

    try {
      const { clientid, clientsecret } = req.headers;
      const credentials = {
        clientId: clientid,
        clientSecret: clientsecret,
      };

      res.end(String(await changeColor(deviceId, color, credentials)));
    } catch (error) {
      console.log(error);
      res.writeHead(500).end();
    }
  }

  next();
}
