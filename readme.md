# Dog breed search (Coding Assignment)

This project was created with vite + typescript. Using axios to fetch http request.

## Project structure overview

```sh
public
src
├── api
│   └── dog.ts
├── assets
├── commponents
│   └── Image.tsx
├── pages
│   ├── index.tsx
│   └── Search.tsx
├── utils
│   ├── api.tsx
│   └── querystring.tsx
└── main.tsx
```

Folder util is quite handful. As I progress on my career in web development, common issue such as request timeout not working properly and querystring that returns empty string (e.g. query='') are bad practices that had to be resolve in custom made util.

## Entrypoint

Moving on to `main.tsx` is where we prepopulate the routes. The implementation is similar to NextJS projects to showcase how similar implementation can be done. Although not perfect yet for nested directory.
