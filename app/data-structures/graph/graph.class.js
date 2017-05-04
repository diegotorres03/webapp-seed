'use strict'

class Graph {

  constructor() {

    this.vertices = [];

    this.edges = [];

    this.numberOfEdges = 0;

  }



  addVertex(vertex) {

    this.vertices.push(vertex);

    this.edges[vertex] = [];

  }



  removeVertex(vertex) {

    const index = this.vertices.indexOf(vertex);

    if (~index) {

      this.vertices.splice(index, 1);

    }

    while (this.edges[vertex].length) {

      const adjacentVertex = this.edges[vertex].pop();

      this.removeEdge(adjacentVertex, vertex);

    }

  }



  addEdge(vertex1, vertex2) {

    this.edges[vertex1].push(vertex2);

    this.edges[vertex2].push(vertex1);

    this.numberOfEdges++;

  }



  removeEdge(vertex1, vertex2) {

    const index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;

    const index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;

    if (~index1) {

      this.edges[vertex1].splice(index1, 1);

      this.numberOfEdges--;

    }

    if (~index2) {

      this.edges[vertex2].splice(index2, 1);

    }

  }



  size() {

    return this.vertices.length;

  }



  relations() {

    return this.numberOfEdges;

  }



  traverseDFS(vertex, fn) {

    if (!~this.vertices.indexOf(vertex)) {

      return console.log('Vertex not found');

    }

    const visited = [];

    this._traverseDFS(vertex, visited, fn);

  }



  _traverseDFS(vertex, visited, fn) {

    visited[vertex] = true;

    if (this.edges[vertex] !== undefined) {

      fn(vertex);

    }

    for (let i = 0; i < this.edges[vertex].length; i++) {

      if (!visited[this.edges[vertex][i]]) {

        this._traverseDFS(this.edges[vertex][i], visited, fn);

      }

    }

  }



  traverseBFS(vertex, fn) {

    if (!~this.vertices.indexOf(vertex)) {

      return console.log('Vertex not found');

    }

    const queue = [];

    queue.push(vertex);

    const visited = [];

    visited[vertex] = true;



    while (queue.length) {

      vertex = queue.shift();

      fn(vertex);

      for (let i = 0; i < this.edges[vertex].length; i++) {

        if (!visited[this.edges[vertex][i]]) {

          visited[this.edges[vertex][i]] = true;

          queue.push(this.edges[vertex][i]);

        }

      }

    }

  }



  pathFromTo(vertexSource, vertexDestination) {

    if (!~this.vertices.indexOf(vertexSource)) {

      return console.log('Vertex not found');

    }

    const queue = [];

    queue.push(vertexSource);

    const visited = [];

    visited[vertexSource] = true;

    const paths = [];



    while (queue.length) {

      const vertex = queue.shift();

      for (let i = 0; i < this.edges[vertex].length; i++) {

        if (!visited[this.edges[vertex][i]]) {

          visited[this.edges[vertex][i]] = true;

          queue.push(this.edges[vertex][i]);

          // save paths between vertices

          paths[this.edges[vertex][i]] = vertex;

        }

      }

    }

    if (!visited[vertexDestination]) {

      return undefined;

    }



    const path = [];

    for (var j = vertexDestination; j != vertexSource; j = paths[j]) {

      path.push(j);

    }

    path.push(j);

    return path.reverse().join('-');

  }



  print() {

    console.log(this.vertices.map(function (vertex) {

      return (`${vertex} -> ${this.edges[vertex].join(', ')}`).trim();

    }, this).join(' | '));

  }

}