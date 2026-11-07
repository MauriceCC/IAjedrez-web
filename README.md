# IAjedrez — El proceso de diseño

Sitio del proyecto de **Interacción Humano Computador** del equipo Los Renegados. Documenta el proceso desde las seis entrevistas de needfinding hasta la interfaz y su evaluación. Conserva la identidad visual de [IAjedrez](https://github.com/MauriceCC/IAjedrez).

## Ejecutar

Requiere Node.js 22.12 o superior.

```powershell
npm.cmd ci
npm.cmd run dev
```

Abre la dirección local que imprime Vite (normalmente http://127.0.0.1:5173/IAjedrez-web/).

```powershell
npm.cmd run build
npm.cmd run preview
```

La carpeta `dist/` es el sitio estático listo para GitHub Pages. La base `/IAjedrez-web/` se configura en `vite.config.js` y se aplica a imágenes, documentos, videos y recursos generados. La vista previa de producción está en http://127.0.0.1:4173/IAjedrez-web/.

## Publicar en GitHub Pages

1. En el repositorio `MauriceCC/IAjedrez-web`, abrir **Settings → Pages → Build and deployment → Source** y seleccionar **GitHub Actions**.
2. Subir los cambios a `main`, incluido el MP4 de `public/videos/`. Desde este repositorio:

   ```powershell
   git add .
   git commit -m "Preparar despliegue en GitHub Pages"
   git push origin main
   ```

3. En **Actions**, esperar a que termine **Publicar en GitHub Pages**. También se puede ejecutar manualmente con **Run workflow** después de subirlo.
4. La URL prevista es https://mauricecc.github.io/IAjedrez-web/.

El workflow instala con `npm ci`, verifica los videos, compila y publica `dist/`. No hay que subir `dist/` ni crear una rama `gh-pages`. Los MP4 se versionan como archivos normales: la entrevista de Hellen ocupa aproximadamente 81,4 MiB, por debajo del límite de 100 MiB por archivo. Hay que subirla con Git, no mediante el formulario web (límite de 25 MiB). Los originales MKV y ZIP continúan excluidos. No se requiere Python ni FFmpeg en GitHub Actions porque el MP4 preparado se incluye en el repositorio.

Cada push a `main` vuelve a publicar. Si se cambia el nombre del repositorio o se usa un dominio propio, ajustar `base` en `vite.config.js` y volver a compilar. La preparación local no activa Pages ni publica por sí sola.

Referencias: [Vite y GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages), [límites de archivos de GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).

## Contenido y fuentes

- **Escuchar:** muestra, perfiles y hallazgos de las seis entrevistas iniciales. Las fuentes son el Documento Grupal (§ 2.2) y las cuatro presentaciones de needfinding.
- **Investigar:** síntesis de Interactive Reasoning (Luis), PromptChainer (Hellen), Beyond Code Generation (Mauricio) y ThinkFlow (Rimsky), según los análisis aportados por el equipo. No se atribuye al sitio una revisión independiente de los artículos originales.
- **Diseñar:** fotografía presencial rotada visualmente 90° a la izquierda, captura y enlace del Miro, y secuencia de integración de propuestas.
- **Prototipo:** capturas reales de análisis, inicio y Aprende. Es una presentación del proyecto; el motor y la API están en el repositorio IAjedrez.
- **Evaluación:** registro Hellen–José y espacio pendiente Mauricio–Jair. No se inventan resultados de usabilidad.
- **Documentación:** los 12 documentos extraídos de los dos ZIP originales, con filtro y búsqueda por título o integrante. Las dos versiones de Exposición se conservan por separado.

`public/materiales/` conserva los DOCX, PPTX y PDF originales. `public/assets/` contiene las capturas y la foto original sin sobrescribirla. `design/` contiene el concepto visual generado y los criterios de implementación.

## Incorporar la segunda evaluación

Los originales MKV y ZIP están excluidos de Git; los MP4 de `public/videos/` sí se incluyen. En este equipo la entrevista Hellen–José ya está preparada como MP4 H.264/AAC, sin recodificar los flujos originales. Para reconstruirla o incorporar la otra entrevista, se necesita Python 3 y FFmpeg disponible en PATH.

1. Colocar `evaluacion-Mauricio-a-Jair.mkv` en la raíz del proyecto (junto al MKV de Hellen).
2. Ejecutar `npm.cmd run prepare:media`.
3. Reiniciar la vista previa o recargar la página. Para producción, ejecutar `npm.cmd run build`.

El script prepara los MP4 y actualiza `public/media.json`. La sección pendiente se convierte automáticamente en un reproductor cuando el manifiesto indica un video disponible. También se pueden copiar MP4 compatibles directamente a `public/videos/` con esos mismos nombres base y ejecutar el script. Incluir el MP4 y `public/media.json` en el siguiente commit para que GitHub Actions también disponga del video. Cada MP4 debe pesar menos de 100 MiB; la compilación comprueba el tamaño y la existencia de los videos declarados.

La entrevista disponible dura 9 min 30 s. No se incluyen subtítulos ni transcripción porque no se proporcionaron; no se generaron conclusiones a partir de su contenido.

## Interacciones y accesibilidad

Navegación móvil, enlace de salto, foco visible, acordeones nativos, búsqueda sin distinción de tildes, estados de filtro anunciados, pestañas con flechas/Home/End, imágenes ampliables con Escape y restitución del foco, video con controles nativos y respeto a movimiento reducido.

La captura de Miro se usa como evidencia local; el tablero remoto no fue accesible durante la revisión. Los hallazgos de needfinding y la evaluación del prototipo se presentan como fases distintas.
