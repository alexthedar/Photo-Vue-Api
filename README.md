# photo-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Notes:
I did not know VueJS prior to this project.  With more practice I am sure that I could simplify the code using more advanced VueJS.  Is working to most specifications. There are a couple bugs that I am not fond of but it is a minimum viable product/
Used bulma for simplicity but I think it might be better to use bootstrap or bourbon.  No tests are written.

### Todo:
- Refactor and clean up code
- Refactor commonly called functions and common css to global.
- Use sass instead of straight css.  Webpack would not recognize sass and in interest of time built in css for now.
- Get rid of CDN's and use webpack to minify and chunk.
- Write tests so future changes won't break front-end.
- Use routing
- simplify data objects being passed through components



#### Built Using:
- vue-cli webpack template
- bulma CSS [link] (http://bulma.io/)
- font-awesome [link] (http://fontawesome.io/)
- normalize.css [link] (https://necolas.github.io/normalize.css/)

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/)

Currently app crashing on heroku - troubleshooting.
