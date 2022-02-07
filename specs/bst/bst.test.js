/*

Binary Search Tree!

Name your class Tree. 

I'd suggest making another class called Node. You don't have to; you can make them all plain JS objects

Here you'll make a BST. Your Tree class will have keep track of a root which will be the first item added
to your tree. From there, if the item is less than the value of that node, it will go into its left subtree
and if greater it will go to the right subtree.

value - integer     - value being contained in the node
left  - Node/object - the left node which itself may be another tree
right - Node/object - the right node which itself may be another tree

*/

class Tree {
  // helper to create trees
  static create(nums) {
    const tree = new Tree()
    nums.forEach((num) => tree.add(num))
    return tree
  }
  toObject() {
    return this
  }
  // code goes here
}

// you might consider using a Node class too
// class Node {
//   // code maybe goes here
// }

// unit tests
// do not modify the below code
describe('Binary Search Tree', function () {
  it('creates a correct tree', () => {
    const tree = Tree.create([3, 7, 4, 6, 5, 1, 10, 2, 9, 8])
    const objs = tree.toObject()

    expect(objs.value).toEqual(3)

    expect(objs.left.value).toEqual(1)
    expect(objs.left.left).toBeNull()

    expect(objs.left.right.value).toEqual(2)
    expect(objs.left.right.left).toBeNull()
    expect(objs.left.right.right).toBeNull()

    expect(objs.right.value).toEqual(7)

    expect(objs.right.left.value).toEqual(4)
    expect(objs.right.left.left).toBeNull()

    expect(objs.right.left.right.value).toEqual(6)
    expect(objs.right.left.right.left.value).toEqual(5)
    expect(objs.right.left.right.left.right).toBeNull()
    expect(objs.right.left.right.left.left).toBeNull()

    expect(objs.right.right.value).toEqual(10)
    expect(objs.right.right.right).toBeNull()

    expect(objs.right.right.left.value).toEqual(9)
    expect(objs.right.right.left.right).toBeNull()

    expect(objs.right.right.left.left.value).toEqual(8)
    expect(objs.right.right.left.left.right).toBeNull()
    expect(objs.right.right.left.left.left).toBeNull()
  })

  it('should find the node if it exists in the tree', () => {
    const tree = Tree.create([3, 7, 4, 6, 5, 1, 10, 2, 9, 8])
    expect(tree.find(11)).toBe(-1)

    const seven = tree.find(7).toObject()
    expect(seven.left.value).toEqual(4)
    expect(seven.left.left).toBeNull()

    expect(seven.left.right.value).toEqual(6)
    expect(seven.left.right.left.value).toEqual(5)
    expect(seven.left.right.left.right).toBeNull()
    expect(seven.left.right.left.left).toBeNull()

    expect(seven.right.value).toEqual(10)
    expect(seven.right.right).toBeNull()

    expect(seven.right.left.value).toEqual(9)
    expect(seven.right.left.right).toBeNull()

    expect(seven.right.left.left.value).toEqual(8)
    expect(seven.right.left.left.right).toBeNull()
    expect(seven.right.left.left.left).toBeNull()
  })

  it('should return -1 an element cannot be found in a tree', () => {
    const tree = Tree.create([3, 7, 4, 6, 5, 1, 10, 2, 9, 8])
    expect(tree.find(11)).toBe(-1)
  })

  it('should find the min and max values in the tree', () => {
    const tree = Tree.create([3, 7, 4, 6, 5, 1, 10, 2, 9, 8])
    expect(tree.findMin().value).toBe(1)
    expect(tree.findMax().value).toBe(10)
  })

  it('should find the successor for a given node', () => {
    const tree = Tree.create([3, 7, 4, 6, 5, 1, 10, 2, 9, 8])
    expect(tree.find(10).successor()).toBe(-1)

    expect(tree.find(5).successor().value).toBe(6)
    expect(tree.find(2).successor().value).toBe(3)
    expect(tree.find(4).successor().value).toBe(5)
  })

  it('should find the predecessor for a given node', () => {
    const tree = Tree.create([3, 7, 4, 6, 5, 1, 10, 2, 9, 8])
    expect(tree.find(1).predecessor()).toBe(-1)
    expect(tree.find(10).predecessor().value).toBe(9)
    expect(tree.find(5).predecessor().value).toBe(4)
    expect(tree.find(2).predecessor().value).toBe(1)
    expect(tree.find(4).predecessor().value).toBe(3)
  })

  it('creates correct trees', () => {
    const tree = Tree.create([10, 5, 15, 8, 6, 3, 7, 17, 12])
    const objs = tree.toObject()
    // render(objs, nums);

    expect(objs.value).toEqual(10)

    expect(objs.left.value).toEqual(5)
    expect(objs.left.left.value).toEqual(3)

    expect(objs.left.right.value).toEqual(8)
    expect(objs.left.right.left.value).toEqual(6)
    expect(objs.left.right.left.right.value).toEqual(7)

    expect(objs.right.value).toEqual(15)
    expect(objs.right.left.value).toEqual(12)
    expect(objs.right.right.value).toEqual(17)
    expect(objs.right.right.right).toBeNull()
    expect(objs.right.right.left).toBeNull()
  })

  it('deletes values from the tree', function () {
    const nums = [10, 5, 15, 8, 6, 3, 7, 17, 12]
    const tree = new Tree()
    nums.map((num) => tree.add(num))
    const objs = tree.toObject()

    const resultNums = [10, 6, 15, 3, 8, 7, 12, 17]
    const resultTree = new Tree()
    resultNums.map((num) => resultTree.add(num))
    const resultObjs = resultTree.toObject()
    tree.delete(5)
    // console.log("output", output);
    expect(objs).toEqual(resultObjs)
  })

  it('deletes nested values from the tree', function () {
    const nums = [24, 12, 18, 6, 3, 21, 15, 13, 48]
    const tree = new Tree()
    nums.map((num) => tree.add(num))
    const objs = tree.toObject()

    const resultNums = [24, 13, 6, 3, 18, 15, 21, 48]
    const resultTree = new Tree()
    resultNums.map((num) => resultTree.add(num))
    const resultObjs = resultTree.toObject()
    tree.delete(12)
    // console.log("output", output);
    expect(objs).toEqual(resultObjs)
  })
})
