/** @jsx h */
/// <reference no-default-lib='true'/>
/// <reference lib='dom' />
/// <reference lib='dom.asynciterable' />
/// <reference lib='deno.ns' />
import { h, renderSSR, withStyles } from 'https://deno.land/x/nano_jsx@v0.0.33/mod.ts';

const css = new TextDecoder().decode(await Deno.readFile('./page/styles.css'));

const repoURL = 'https://github.com/lucasliet/deno-user-auth';
const insomniaImportUrl = 'insomnia://app/import?uri=https://raw.githubusercontent.com/lucasliet/deno-user-auth/master/.github/Insomnia_2022-08-06.yaml';

const { name, avatar_url }: { name: string, avatar_url: string } =
  await fetch('https://api.github.com/users/lucasliet').then(r => r.json());

const { description }: { description: string } =
  await fetch('https://api.github.com/repos/lucasliet/deno-user-auth').then(r => r.json());

function WelcomePage() {
  return withStyles(css)(
    <html lang='en'>
      <head>
        <meta charset='UTF-8'/>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
        <link rel="shortcut icon" href="https://deno.land/favicon.ico" type="image/x-icon" />
        <link rel='icon' href='https://deno.land/favicon.ico' sizes='32x32' />
        <link rel='icon' href='https://deno.land/logo.svg' type='image/svg+xml'/>
        <title>Deno User Authentication</title>
      </head>
      <body>
        <header>
          {description && 
            <span>{description}</span>
          }
        </header>
        <main>
          <section>
            <h1>To start please check the documentation at <a href={repoURL}>our Github Page</a></h1>
            <h2>or import Imsomnia config <a href={insomniaImportUrl}>here</a></h2>
          </section>
        </main>
        <footer>
          {name && avatar_url &&
            <span>made by <img src={avatar_url} /> <strong>{name}</strong></span>
          }
        </footer>
      </body>
    </html>
  );
}

export default function render() {
  return renderSSR(<WelcomePage />)
}
