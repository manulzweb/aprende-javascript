# Contenido del Wiki

Esta carpeta contiene las páginas del **wiki de GitHub** de este
repositorio, escritas en Markdown y siguiendo la convención de nombres
de GitHub Wiki.

## Archivos

| Archivo | Página en el wiki |
|---------|-------------------|
| `Home.md` | Página de inicio |
| `_Sidebar.md` | Menú lateral de navegación |
| `_Footer.md` | Pie de página |
| `00-Variables.md` … `08-Observables.md` | Una página por módulo |

> Los archivos que empiezan por `_` (`_Sidebar`, `_Footer`) son
> especiales: GitHub los usa para el menú lateral y el pie de todas las
> páginas. El resto se convierten en páginas normales (el nombre del
> archivo, sin `.md`, es el título y la URL).

## Cómo publicarlo en el Wiki de GitHub

El wiki de GitHub es un **repositorio git aparte** (`*.wiki.git`). Para
subir estas páginas:

1. Activa el wiki en GitHub: *Settings → Features → Wikis* (y crea la
   primera página desde la web para inicializar el repo del wiki).
2. Clona el repo del wiki y copia estos archivos:
   ```bash
   git clone https://github.com/manulzweb/aprende-javascript.wiki.git
   cp wiki/*.md aprende-javascript.wiki/
   cd aprende-javascript.wiki
   git add .
   git commit -m "Añade páginas del wiki"
   git push
   ```

> ℹ️ Estas páginas se mantienen también aquí, dentro del repo principal,
> para tenerlas versionadas junto al código y poder editarlas en cualquier
> Pull Request.
