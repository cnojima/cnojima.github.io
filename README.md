# src-benchmark Performance Data Generation Tooling

## quick start
`npm install -d`
`npm start`
open browser to `http://localhost:5000`

## add testing environment:
1. add an entry to the list in `./benchmark/js/ui/geneerate-sdk-list.js`
2. add corresponding metadata with matching `key` to `./benchmark/js/stubs/data.js`
3. refresh browser.


# DEPRECATED - DO NOT USE: xk6 TLDR; just get me going
run this in terminal:
```
GOBIN=/usr/local/bin go install go.k6.io/xk6/cmd/xk6@latest
xk6 build --with github.com/grafana/xk6-browser
mv k6 /usr/local/bin/xk6-browser
xk6-browser run sanity.js
```

## Install and configure xk6-browser

Installation and use of `xk6-browser` will be stopped by security policy at Visa.  Even with temporary admin rights, `terminal` will refuse to run the `xk6-browser` binary as it was downloaded from an untrusted source.

The workaround is to build it locally for yourself:

### INSTALL LATEST `go` TOOLCHAIN
1. Try `go version` in your terminal - does it come back with 1.19+?
     1. uninstall older `go` JIC install paths are different with latest
     2. i.e., `brew uninstall go`
2. Install latest go binaries for your arch from here: https://go.dev/dl/
3. Confirm version with `go version`
```
go version go1.19.1 darwin/amd64
```
> Sanity check `go` environment with `go env`
```
...
  GO111MODULE=""
  GOARCH="amd64"
  GOBIN=""
  GOCACHE="/Users/mnojima/Library/Caches/go-build"
  GOENV="/Users/mnojima/Library/Application Support/go/env"
  GOEXE=""
  GOEXPERIMENT=""
...
```
> is `GOBIN` defined and not empty? this path is where go will install binaries and sources.  Environment vars can be set in `.profile`, `.bashrc`, `.zshrc`, etc., but is unecessary to build `xk6-browser`

### BUILD XK6-BROWSER
Follow steps here: https://k6.io/docs/javascript-api/xk6-browser/ or paste the following into a terminal:
```
GOBIN=/usr/local/bin go install go.k6.io/xk6/cmd/xk6@latest
```
> quick op usually
```
xk6 build --with github.com/grafana/xk6-browser
```
>***The above assumes `/usr/local/bin` is in your $PATH list.  If its not, your environment is not supported - please seek help.***

The build will take a few moments and produce a `k6` artifact in the working directory.  Move this to a folder in your $PATH (typically `/usr/local/bin`):
```
mv k6 /usr/local/bin/xk6-browser
```
> The above moves and renames the binary to reflect the documentation in the xk6 pages.

### SANITY CHECK
Run the follow test script in your terminal:
```
xk6-browser run sanity.js
```
xk6 will execute, dump many log statements, collect performance telemetry and take a screenshot.  The screenshot will be created in the working directory.
