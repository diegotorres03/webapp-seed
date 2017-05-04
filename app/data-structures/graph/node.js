/* global Relation */
function Node(label = '') {

  const relations = {
    from: {},
    to: {},
    between: {}
    // from: new Map(),
    // to: new Map()
  }

  const properties = {}
  const id = Number(new Date().getTime() + Number(Math.random()))
  
  let newRelationLabel = ''
  let newRelationProperties = {}

  const instance = Object.freeze({
    id,
    label,
    properties,
    relations,
    to,
    from,
    between,
    rel
  })
  
  return instance

  function rel(label = '', properties = {}) {
    newRelationLabel = label
    newRelationProperties = properties
    return instance
  }

  function to(node) {
    const relation = Relation(this, node, newRelationLabel, newRelationProperties)
    this.relations.to[relation.id] = relation
    newRelationLabel = ''
    newRelationProperties = {}
    return node
  }

  function from(node) {
    const relation = Relation(this, node, newRelationLabel, newRelationProperties)
    this.relations.from[relation.id] = relation
    newRelationLabel = ''
    newRelationProperties = {}
    return node
  }

  function between(node) {
    const relation = Relation(this, node, newRelationLabel, newRelationProperties)
    this.relations.between[relation.id] = relation
    newRelationLabel = ''
    newRelationProperties = {}
    return node
    // this.relations.to.set(relation.id, relation)
    // this.relations.from.set(relation.id, relation)
  }

}

console.log(Node())
console.log(new Node())