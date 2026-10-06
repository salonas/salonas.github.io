# salonas.github.io

Mi página personal: quién soy, con qué trabajo, mis proyectos y cómo contactarme.
Los dibujos y la música son míos.

Sitio: https://salonas.github.io

Hecha con React y Vite. Está en español e inglés, y parte en el idioma del navegador.

## Correrla en local

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm test         # pruebas
npm run build    # genera dist/
npm run preview  # sirve dist/ tal como queda publicado
```

## Formulario de contacto

Usa [EmailJS](https://www.emailjs.com/). Para que envíe en local, copia `.env.example` como
`.env` y completa las tres variables `VITE_EMAILJS_*`. En GitHub van como variables del
repositorio (Settings → Secrets and variables → Actions → Variables). Sin ellas el formulario
muestra un error en vez de enviar.

## Agregar un proyecto

1. Crear `src/projects/<slug>.js`, copiando la forma de uno que ya exista.
2. Sumarlo a la lista de `src/projects/index.js`.
3. Dejar sus imágenes, video y audio en `public/media/<slug>/`.

Cada proyecto se arma con bloques (`video`, `loops`, `shots`, `text`, `list`, `items`, `audio`)
en el orden en que aparecen en su archivo. Los textos van en los dos idiomas.

`npm test` avisa si falta un texto en algún idioma o si un archivo citado no existe.

## Publicación

Cada push a `master` corre las pruebas, construye el sitio y lo publica en GitHub Pages
(`.github/workflows/deploy.yml`).

## Currículum

Las fuentes están en `cv/es.html` y `cv/en.html`, con el estilo en `cv/cv.css`. Contacto enlaza al PDF del idioma activo, en `public/cv/`. Para regenerarlos después de editar, imprime cada HTML a PDF en tamaño carta desde el navegador, sin encabezado ni pie, y reemplaza el archivo.

## Créditos

- Fuentes: MGPixel y Notepen. Los símbolos de las caritas usan [GNU Unifont](https://unifoundry.com/unifont/), licencia SIL Open Font License 1.1.
- Íconos de contacto: [Simple Icons](https://simpleicons.org/), licencia CC0.
- Cursores: dibujados para este sitio.
