const { override, addLessLoader } = require('customize-cra');

const primaryColor = 'rgb(67, 160, 71)';

module.exports = override(
    addLessLoader({
        modifyVars: {
            '@primary-color': primaryColor // for example, you use Ant Design to change theme color.
        },
        javascriptEnabled: true
    })
);
