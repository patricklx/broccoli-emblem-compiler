function TransformEachInToBlockparams() {
  // set later within HTMLBars to the syntax package
  this.syntax = null;
}

TransformEachInToBlockparams.prototype.transform = function(ast) {
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();
  var b = pluginContext.syntax.builders;

  walker.visit(ast, function(node) {
    if (pluginContext.validate(node)) {
      var map = function(item) {return item.original;};
      var params = node.sexpr.params.splice(0, 2);
      node.program.blockParams = params.slice(0,1).map(map);
      if(node.inverse) node.inverse.blockParams = params.slice(0,1).map(map);
    }
  });

  return ast;
};

TransformEachInToBlockparams.prototype.validate = function TransformEachInToBlockparams_validate(node) {
  return (node.type === 'BlockStatement' || node.type === 'MustacheStatement') &&
    node.sexpr.path.original === 'each' &&
    node.sexpr.params.length === 3 &&
    node.sexpr.params[1].type === 'PathExpression' &&
    node.sexpr.params[1].original === 'in';
};

module.exports = TransformEachInToBlockparams;
