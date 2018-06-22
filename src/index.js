// import './chartComponent';
// import './loginButton';
// import _ from 'lodash';

async function getComponent() {
    /* var element = document.createElement('div');
    var btn = document.createElement('button');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click and check the console';
    btn.onclick = _ => {
        console.log('what the fuck');
    };
    element.appendChild(btn);
    return element; */

    /**
     * Note the use of "webpackChunkName" in the comment:
     * This will cause our separate bundle to be named lodash.bundle.js 
     * instead of just [id].bundle.js. for more infor:
     * https://webpack.js.org/api/module-methods#import-
     */
    var element = document.createElement('div');
    const _ = await
    import ( /* webpackChunkName: "lodash" */ 'lodash');

    const { join } = _.default;

    element.innerHTML = join(['Hello', 'webpack'], ' ');
    return element;

}

// document.body.appendChild(component());
getComponent().then(component => {
    document.body.appendChild(component);
})