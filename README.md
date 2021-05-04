# Smapshot Front-end – Embed 3D

This repository contain the code to run an 3d embed with an image of Smapshot and with the owner's id of the image.

## Usage

Replace the two variable in uppercase `OWNER_ID_OR_SLUG` and `ORIGINAL_IMAGE_ID`in the following template URL `http://localhost:8080/owner/OWNER_ID_OR_SLUG/original_image/ORIGINAL_IMAGE_ID` to get an URL ready for iframe.

```html
  <iframe title="Smapshot georef" width="700" height="400" src="https://smapshot-beta.heig-vd.ch/embed/owner/imaginerio/original_image/014AM005013"></iframe>
```

If image isn't geolocalised yet, the URL will display a localized message. The language used is automatically read from the browser and fallback to english. To ensure a specific language, you can add an url parameter at the end of the URL. e.g. `?lang=fr` (supported languages: en, fr, de, it, pt)

## Installation

```bash
npm install -g @vue/cli
npm install
```

## Serve for development

By using the terminal

```bash
npm run serve
```

OR

By using the GUI

```bash
vue ui
```

Then:

- go to given address.
- Import the project.
- go to `Task` tab and launch `Serve` task

## Build for development

```bash
npm run build
```

OR

By using the GUI

```bash
vue ui
```

Then:

- go to given address.
- Import the project.
- go to `Task` tab and launch `Build` task

## Test Build with local server (w/o https)

```bash
npm run serve_build
```

## Configuration

The following environment variables can be set at build time:

Variable                                | Default value                                                         | Description
:---                                    | :---                                                                  | :---
`VUE_APP_SMAPSHOT_API_URL`              | `/api` (prod) or `http://localhost:1337/` (dev)                       | The base URL for all HTTP requests made to the API.
`VUE_APP_PUBLIC_PATH`                   | `/embed` (prod) or `/` (dev)                                          | The sub path where app is deployed (ex: /embed for smapshot.heig-vd.ch/embed).
`VUE_APP_SMAPSHOT_VT_URL`               | `/tilesets` (prod) or `http://localhost:3005/tilesets` (dev)          | The base URL for generated vector tiles points used on the 2D map.
`VUE_APP_SMAPSHOT_PROXY_URL`            | `/proxy/` (prod) or `http://localhost:3000` (dev)                     | Proxy URL to allow usage of tiles without header `Access-Control-Allow-Origin`
`VUE_APP_MAPTILER_CUSTOM_TOKEN`         |                                                                       | The access token used to access MapTiler custom tiles and geocoding services.
`VUE_APP_MAPTILER_SATELLITE_TOKEN`      |                                                                       | The access token used to access MapTiler satellite tiles.
`VUE_APP_MAPTILER_TERRAIN_TOKEN`        |                                                                       | The access token used to access MapTiler terrain tiles.
`VUE_APP_BING_MAP_TOKEN`                |                                                                       | The access token used to access Bing Map tiles.
`VUE_APP_VORARLBERG_TERRAIN_URL`        | `https://smapterrain.heig-vd.ch/tilesets/Austria-terrain-tiles-4326`  | The URL to access Terrain tilesets for Austria Vorarlberg.
`VUE_APP_IMAGINERIO_PREFIX_TERRAIN_URL` | `https://smapterrain.heig-vd.ch/brazil/tilesets/`                     | The URL prefix to access Terrain tilesets for Brazil ImagineRio.

Production version on smapshot.heig-vd.ch
