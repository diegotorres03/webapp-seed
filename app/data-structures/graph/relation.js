function Relation(node1, node2, label = '', properties = {}) {
  const nodes = [node1, node2]
  const id = Number(new Date().getTime() + Number(Math.random()))

  return {
    id,
    label,
    properties,
    nodes
  }

}

console.log(Relation())
console.log(new Relation())