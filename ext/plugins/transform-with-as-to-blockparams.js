function TransformWithAsToBlockparams() {
  // set later within HTMLBars to the syntax package
  this.syntax = null;
}

TransformWithAsToBlockparams.prototype.transform = function TransformWithAsToBlockparams_transform(ast) {
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();
  var b = pluginContext.syntax.builders;

  walker.visit(ast, function(node) {
    if (pluginContext.validate(node)) {
      var map = function(item) {return item.original;};
      var params = node.sexpr.params.splice(1, 2);
      node.program.blockParams = params.slice(-1).map(map);
      if(node.inverse) node.inverse.blockParams = params.slice(-1).map(map);
    }
  });

  return ast;
};

TransformWithAsToBlockparams.prototype.validate = function TransformWithAsToBlockparams_validate(node) {
  return node.type === 'BlockStatement' &&
    node.sexpr.path.original === 'with' &&
    node.sexpr.params.length === 3 &&
    node.sexpr.params[1].type === 'PathExpression' &&
    node.sexpr.params[1].original === 'as';
};

module.exports = TransformWithAsToBlockparams;
