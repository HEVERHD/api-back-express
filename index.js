const express = require("express");
const app = express();


app.set("port", 3000);

app.listen(app.get("port"), () => {
  console.log(`App is running on port ${app.get("port")}`);
});