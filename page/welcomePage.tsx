/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { h, renderSSR, withStyles } from "https://deno.land/x/nano_jsx@v0.0.33/mod.ts";

const css = new TextDecoder().decode(await Deno.readFile('./page/styles.css'));

function WelcomePage() {
  return withStyles(css)(
    <html>
      <head>
        <title>Deno Middleware</title>
      </head>
      <body>
        <main>
          <h1>To start please check the Insomnia template at <a href="https://github.com/lucasliet/deno-middleware">our Github Page</a></h1>
          <h2>or import it <a href="insomnia://app/import?uri=https://raw.githubusercontent.com/lucasliet/deno-middleware/master/.github/Insomnia_2022-08-06.yaml">here</a></h2>
        </main>
      </body>
    </html>
  );
}

export default function render() {
  return renderSSR(<WelcomePage />)
}
