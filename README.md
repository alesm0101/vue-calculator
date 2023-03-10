# calculator

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# calculator gh-pages
[website url](https://alesm0101.github.io/vue-calculator/)

## Pres Setup
in vue.config.js:
```
publicPath:  process.env.NODE_ENV === "production" ? "/vue-calculator" : "",
```

## Setup
from main branch:
```
git checkout -b gh-pages
yarn build
git add dist -f
git commit -m "Setup page"
git subtree push --prefix dist origin gh-pages
```

### Recreate gh-pages
```
git branch -D gh-pages
```
Then follow the setup stes again from main branch
