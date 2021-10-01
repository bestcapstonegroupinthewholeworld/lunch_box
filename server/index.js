const { db } = require("./db");
const seed = require("../script/seed");
const PORT = process.env.PORT || 8080;

const app = require("./app");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }

    io.on("connection", (socket) => {
      console.log("use is connected");
      socket.on("start", () => {
        io.in(pin).emit("start game");
      });
    });

    // start listening (and create a 'server' object representing our server)
    server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
