const html = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1 id="heading">Hello world</h1>
    <button type="button" id="button1" onclick="myFunction()">Click Here</button>
    <button type="button" id="button2">External Event</button>
    <!-- <script src="myScript.js"></script> -->
    <script>
      function myFunction() {
        document.getElementById('heading').innerHTML = 'Hello Umesh';
        window.ReactNativeWebView.postMessage('Hello From Web view');
      }
    </script>
  </body>
</html>
`;

export {html};
