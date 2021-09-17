import axios from "axios";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

// const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token');

const appId = "f6061d4f96ac4588b843ec662758b43c";
// const token =
//   "006f6061d4f96ac4588b843ec662758b43cIACrNi1d4amk8Vehbnv/9LnD/2x/2KLuM+cHIJI3cmnO1vYBwyAAAAAAEACI9+ReAJFDYQEAAQAAkUNh";

const fetchToken = async () => {
  const { data } = await axios.get("/token/access_token", {
    params: { channelName: "lunch_box" },
  });
  console.log(data);

  return data.token;
};
// const token = fetchToken();

export const config = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
  token: fetchToken(),
};

export const useClient = createClient(config);

export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export const channelName = "lunch_box"; //the token is associated with this channel Name
