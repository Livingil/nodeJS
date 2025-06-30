const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const pkg = require("./package.json");
const { addNote, getNotes, removeNote } = require("./notes.controller");

const argv = yargs(hideBin(process.argv))
  .version(pkg.version)
  .command({
    command: "add",
    describe: "Add new note to list",
    builder: {
      title: { type: "string", describe: "Note title", demandOption: true },
    },
    handler({ title }) {
      addNote(title);
    },
  })
  .command({
    command: "list",
    describe: "Print all notes",
    async handler() {
      const notes = await getNotes();
      console.log("Here is the list of notes:");
      notes.forEach((note) => {
        console.log(note.id, note.title);
      });
    },
  })
  .command({
    command: "remove",
    describe: "Remove note by ID",
    builder: {
      id: {
        type: "string",
        describe: "Note ID to remove",
        demandOption: true,
      },
    },
    async handler(argv) {
      const notes = await removeNote(argv.id);
      console.log("Note removed successfully");
    },
  })
  .parse();
