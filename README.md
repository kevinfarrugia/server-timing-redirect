# server-timing-redirect

Demo node application redirecting the user (301 and 302) to another route to test server-timing response headers and print out the user-agent string on each page.

## Usage

**Same-origin**
```
$ node server.js -- 3000 http://localhost:3000
```

**Cross-origin**
```
$ node server.js -- 3001 http://localhost:3000
```

Navigate to `localhost:3000` (or the port you specified) and click the 301 and 302 links to test the redirection.

Navigation timing may be debugged using:

```js
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
  const redirect = entry.redirectEnd - entry.redirectStart;
  if (redirect > 0) {
    console.log(`${entry.name}: Redirect time: ${redirect}ms`);
  }
});
```

**Notes:**

- The `/301/` or `/302` responses include `Server-Timing` response headers. These are not forwarded to the final location.

## License and Copyright

This software is released under the terms of the [MIT license](https://github.com/kevinfarrugia/server-timing-redirect/blob/main/LICENSE).
