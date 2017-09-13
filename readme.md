# Installation

Requires node.js version 8 or more recent

Clone and install dependencies:

```
git clone git@github.com:iandotkelly/hub-utils
cd hub-utils
npm install
```
# Help

```
./index.js --help
```

# Create JSON for bulk device creation

```
./index.js devices -p [range-start] [range-end]

```

e.g.

```
./index.js devices -p 1000 1999
```

To create devices IDd 1000 to 1999 ... only number IDs allowed.  Output is sent
to stdout so needs to be piped to a file or the clipboard.

`-p` or `--pretty` will pretty print the output.
