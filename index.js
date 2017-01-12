const express = require('express');

const app = express();

app.use('/', express.static(`${__dirname}/dist/`));

app.listen(3000, console.log('Connected on 3k'));

// todo: isomorphic refactor
// const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const renderToString = require('react-dom/server').renderToString;
// const createIsomorphicWebpack = require('isomorphic-webpack').createIsomorphicWebpack;
// const webpackConfiguration = require('./webpack/webpack.dev');

// const compiler = webpack(webpackConfiguration);
// createIsomorphicWebpack(webpackConfiguration);

// const app = express();

// app.use(webpackDevMiddleware(compiler, {
//   noInfo: false,
//   publicPath: '/static',
//   quiet: false,
//   stats: 'minimal',
// }));

// const renderFullPage = (body) => {
//   return `
//   <!doctype html>
//   <html>
//     <head></head>
//     <body>
//       <div id='app'>${body}</div>
//       <script src='/static/app.js'></script>
//     </body>
//   </html>
//   `;
// };

// app.get('/', (req, res) => {
//   const appBody = renderToString(require('./src/app/index.jsx').default);
//   res.send(renderFullPage(appBody));
// });

// // app.use(express.static(`${__dirname}/dist/`));

// app.listen(3000, console.log('Connected on 3k'));
