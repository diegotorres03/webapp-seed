function Graph() {

  const nodes = new Map()
  const relations = new Map()

  return Object.freeze({
    nodes,
    relations,

    addNode,
    find
  })

  function find(id) {
    return nodes.get(id)
  }
  function addNode(node){
    nodes.set(node.id, node)
  }



}


// db.find
//   .node('label')
//   .where('data.name')
//   .equals('diego')
//   .and('data.parent')
//   .in('horacio', 'alberto')
//   .return('data.name').as('name')
//   .return('data.parent').as('parent')
