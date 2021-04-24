const express = require("express");
const path = require("path");
const app = express();

app.use("/public", express.static(path.join(__dirname, "/public")));

app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (err) {
    next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
