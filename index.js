var Filter = require('broccoli-filter');
var emblem = require('emblem');
var Handlebars = require('handlebars');
var compileSpec = require('htmlbars').compileSpec;
var handlebarsTemplateCompiler = require('ember-template-compiler').EmberHandlebars;

var eachTransform = require('./ext/plugins/transform-each-in-to-blockparams');
var withTransform = require('./ext/plugins/transform-with-as-to-blockparams');

var defaultHTMLBarsOptions = {
    disableComponentGeneration: true,

    plugins: {
        ast: [
            eachTransform,
            withTransform
        ]
    }
};

module.exports = TemplateCompiler
TemplateCompiler.prototype = Object.create(Filter.prototype);
TemplateCompiler.prototype.constructor = TemplateCompiler;
function TemplateCompiler (inputTree, options) {
    if (!(this instanceof TemplateCompiler)) {
        return new TemplateCompiler(inputTree, options);
    }
    Filter.call(this, inputTree, options);
    this.inputTree = inputTree;
    this.vanilla = options && options.vanilla || this.vanilla;
    this.extensions = options && options.extensions || this.extensions;
    this.targetExtension = options && options.targetExtension || this.targetExtension;
    this.options = options || {};
    this.htmlbarsOptions = this.options.htmlbarsOptions;

}

TemplateCompiler.prototype.vanilla = false;
TemplateCompiler.prototype.extensions = ['embl', 'emblem'];
TemplateCompiler.prototype.targetExtension = 'js';

TemplateCompiler.prototype.processString = function (string, relativePath) {
    var compiled;
    if (this.vanilla) {
        compiled = emblem.precompile(Handlebars, string);
        return '/* jshint ignore:start */\nexport default Handlebars.template(' + compiled + ');\n/* jshint ignore:end */\n';
    } else {
        emblem.handlebarsVariant = handlebarsTemplateCompiler;
        var ast = emblem.parse(string);
        compiled = compileSpec(ast, defaultHTMLBarsOptions);
        return 'export default Ember.HTMLBars.template(' + compiled + ');\n';
    }
}

