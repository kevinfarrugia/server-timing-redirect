# server-timing-redirect

Demo node application redirecting the user (301 and 302) to another route to test server-timing response headers and print out the user-agent string on each page.

## Usage

```
$ node server.js
```

Navigate to `localhost:3000` and click the 301 and 302 links to test the redirection.

`server-timing` headers are visible on the HTML document and logged as performance marks. These may be retrieved using `performance.getEntriesByType("mark")` in the DevTools console.

## License and Copyright

This software is released under the terms of the [MIT license](https://github.com/kevinfarrugia/server-timing-redirect/blob/main/LICENSE).
