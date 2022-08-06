# Deno User Authentication
Simple user CRUD to use as a POC to [Deno Deploy](https://deno.com/deploy) with [Upstash](https://upstash.com/) redis persistence all in Edge Computing environment

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=deno-middleware&uri=https%3A%2F%2Fraw.githubusercontent.com%2Flucasliet%2Fdeno-middleware%2Fmaster%2F.github%2FInsomnia_2022-08-06.yaml)

## Speed Preview

![Speed Preview](https://raw.githubusercontent.com/lucasliet/deno-middleware/master/.github/speed_preview.gif)

---
## Routes

- **Login**

  Resource: **POST** `/login`

  Body:
  ```JSON
  {
    "user": "userName",
    "password": "userPassword"
  }
  ```

  Response:
  ```JSON
  {
    "expires_in": 3600,
    "access_token": "generated_token"
  }
  ```
  > expires_in represents token expiration in seconds
---
- **Register**

  Resource: **POST** `/register`

  Body:
  ```JSON
  {
    "user": "userName",
    "password": "userPassword"
  }
  ```

  Response:
  ```JSON
  {
    "message": "user userName registered sucessfully"
  }
  ```
---
- **Unregister**

  Resource: **POST** `/unregister`

  Authentication: `Bearer token`

  Body:
  ```JSON
  {
    "user": "userName"
  }
  ```

  Response:
  ```JSON
  {
    "message": "user teste unregistered sucessfully"
  }
  ```
---
- **Update**

  Resource: **PUT** `/update_password`

  Authentication: `Bearer token` 

  Body:
  ```JSON
  {
    "user": "userName",
    "password": "userPassword"
  }
  ```

  Response:
  ```JSON
  {
    "message": "user teste password updated sucessfully"
  }
  ```
---
- **Verify Token**

  Resource: **GET** `/verify_token`

  Authentication: `Bearer token` 

  Response:
  ```JSON
  {
    "expires_in": 3546,
    "user": "userName"
  }
  ```
  > expires_in represents token expiration in seconds