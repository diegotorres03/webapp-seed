function Graph() {
  this.nodes = [];
  this.edges = [];
  this.numberOfEdges = 0;
}

Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
  this.edges[node] = [];
};
Graph.prototype.removeNode = function(node) {
  var index = this.nodes.indexOf(node);
  if(~index) {
    this.nodes.splice(index, 1);
  }
  while(this.edges[node].length) {
    var adjacentNode = this.edges[node].pop();
    this.removeEdge(adjacentNode, node);
  }
};
Graph.prototype.addEdge = function(node1, node2) {
  this.edges[node1].push(node2);
  this.edges[node2].push(node1);
  this.numberOfEdges++;
};
Graph.prototype.removeEdge = function(node1, node2) {
  var index1 = this.edges[node1] ? this.edges[node1].indexOf(node2) : -1;
  var index2 = this.edges[node2] ? this.edges[node2].indexOf(node1) : -1;
  if(~index1) {
    this.edges[node1].splice(index1, 1);
    this.numberOfEdges--;
  }
  if(~index2) {
    this.edges[node2].splice(index2, 1);
  }
};
Graph.prototype.size = function() {
  return this.nodes.length;
};
Graph.prototype.relations = function() {
  return this.numberOfEdges;
};
Graph.prototype.traverseDFS = function(node, fn) {
  if(!~this.nodes.indexOf(node)) {
    return console.log('Node not found');
  }
  var visited = [];
  this._traverseDFS(node, visited, fn);
};
Graph.prototype._traverseDFS = function(node, visited, fn) {
  visited[node] = true;
  if(this.edges[node] !== undefined) {
    fn(node);
  }
  for(var i = 0; i < this.edges[node].length; i++) {
    if(!visited[this.edges[node][i]]) {
      this._traverseDFS(this.edges[node][i], visited, fn);
    }
  }
};
Graph.prototype.traverseBFS = function(node, fn) {
  if(!~this.nodes.indexOf(node)) {
    return console.log('Node not found');
  }
  var queue = [];
  queue.push(node);
  var visited = [];
  visited[node] = true;

  while(queue.length) {
    node = queue.shift();
    fn(node);
    for(var i = 0; i < this.edges[node].length; i++) {
      if(!visited[this.edges[node][i]]) {
        visited[this.edges[node][i]] = true;
        queue.push(this.edges[node][i]);
      }
    }
  }
};
Graph.prototype.pathFromTo = function(nodeSource, nodeDestination) {
  if(!~this.nodes.indexOf(nodeSource)) {
    return console.log('Node not found');
  }
  var queue = [];
  queue.push(nodeSource);
  var visited = [];
  visited[nodeSource] = true;
  var paths = [];

  while(queue.length) {
    var node = queue.shift();
    for(var i = 0; i < this.edges[node].length; i++) {
      if(!visited[this.edges[node][i]]) {
        visited[this.edges[node][i]] = true;
        queue.push(this.edges[node][i]);
        // save paths between nodes
        paths[this.edges[node][i]] = node;
      }
    }
  }
  if(!visited[nodeDestination]) {
    return undefined;
  }

  var path = [];
  for(var j = nodeDestination; j != nodeSource; j = paths[j]) {
    path.push(j);
  }
  path.push(j);
  return path.reverse().join('-');
};
Graph.prototype.print = function() {
  console.log(this.nodes.map(function(node) {
    return (node + ' -> ' + this.edges[node].join(', ')).trim();
  }, this).join(' | '));
};