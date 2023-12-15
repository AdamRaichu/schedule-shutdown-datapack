const Glob = require("glob");
const JSZip = require("jszip");
const fs = require("fs");

var withDelay = new JSZip();
var noDelay = new JSZip();

const delays = ["one_minute", "five_minutes", "fifteen_minutes", "one_hour", "five_hours", "NO_AUTO_SHUTDOWN"];
var zipFiles = {};
var loadJson = {
  replace: false,
  values: ["schedule_shutdown:clear_all"],
};

delays.forEach(function (delay) {
  zipFiles[delay] = new JSZip();
  if (delay === "NO_AUTO_SHUTDOWN") {
    return;
  }
  var o = JSON.parse(JSON.stringify(loadJson));
  o.values.push(delay);
  zipFiles[delay].folder("data").folder("minecraft").folder("tags").folder("functions").file("load.json", JSON.stringify(o));
});

function addFile(path, data) {
  Object.keys(zipFiles).forEach(function (name) {
    zipFiles[name].file(path.replace(/\\/g, "/"), data);
  });
}

// options is optional
Glob.glob("./src/data/**/*.mcfunction")
  .then(function (files) {
    files.forEach((file) => {
      if (fs.statSync(file).isDirectory()) {
        return;
      }
      var data = fs.readFileSync(file);
      addFile(file.substring(4), data);
    });
    delays.forEach(function (delay) {
      var path = "./dist/" + delay + ".zip";
      zipFiles[delay].generateAsync({ type: "nodebuffer" }).then(function (output) {
        fs.mkdirSync("./dist", { recursive: true });
        fs.writeFileSync(path, output, {});
        console.log("Wrote " + path);
      });
    });
  })
  .catch(function (err) {
    console.error(err);
  });
