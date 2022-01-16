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
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
  add(val) {
    if (!this.value) {
      this.value = val;
    } else if (val <= this.value) {
      if (!this.left) {
        this.left = new Tree(val);
      } else {
        this.left.add(val);
      }
    } else {
      if (!this.right) {
        this.right = new Tree(val);
      } else {
        this.right.add(val);
      }
    }
  }

  delete(val) {
    const target = this.find(val);
    if (target) {
      const leastRightChild = this.findLeastRightChild(target);
      if (!leastRightChild) {
        return;
      }
      target.value = leastRightChild.value;
      target.right.left = leastRightChild.right;
    }
  }

  findLeastRightChild(tree) {
    let elt = tree.right;
    if (!elt) {
      return;
    }
    while (elt.left) {
      elt = elt.left;
    }
    return elt;
  }

  find = (value) => {
    if (this.value === value) {
      return this;
    }
    if (this.value > value && this.left) {
      return this.left.find(value);
    } else if (this.value <= value && this.right) {
      return this.right.find(value);
    }
  };

  // test(search, value) {
  //   return search === value;
  // }

  toObject = () => {
    return this;
  };
}

// you might consider using a Node class too
// class Node {
//   // code maybe goes here
// }

// unit tests
// do not modify the below code
describe("Binary Search Tree", function () {
  it("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();
    // render(objs, nums);

    expect(objs.value).toEqual(3);

    expect(objs.left.value).toEqual(1);
    expect(objs.left.left).toBeNull();

    expect(objs.left.right.value).toEqual(2);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(4);
    expect(objs.right.left.left).toBeNull();

    expect(objs.right.left.right.value).toEqual(6);
    expect(objs.right.left.right.left.value).toEqual(5);
    expect(objs.right.left.right.left.right).toBeNull();
    expect(objs.right.left.right.left.left).toBeNull();

    expect(objs.right.right.value).toEqual(10);
    expect(objs.right.right.right).toBeNull();

    expect(objs.right.right.left.value).toEqual(9);
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.left.left.value).toEqual(8);
    expect(objs.right.right.left.left.right).toBeNull();
    expect(objs.right.right.left.left.left).toBeNull();
  });

  it("creates correct trees", () => {
    const nums = [10, 5, 15, 8, 6, 3, 7, 17, 12];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();
    // render(objs, nums);

    expect(objs.value).toEqual(10);

    expect(objs.left.value).toEqual(5);
    expect(objs.left.left.value).toEqual(3);

    expect(objs.left.right.value).toEqual(8);
    expect(objs.left.right.left.value).toEqual(6);
    expect(objs.left.right.left.right.value).toEqual(7);

    expect(objs.right.value).toEqual(15);
    expect(objs.right.left.value).toEqual(12);
    expect(objs.right.right.value).toEqual(17);
    expect(objs.right.right.right).toBeNull();
    expect(objs.right.right.left).toBeNull();
  });

  it("deletes values from the tree", function () {
    const nums = [10, 5, 15, 8, 6, 3, 7, 17, 12];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    const resultNums = [10, 6, 15, 3, 8, 7, 12, 17];
    const resultTree = new Tree();
    resultNums.map((num) => resultTree.add(num));
    const resultObjs = resultTree.toObject();
    tree.delete(5);
    const output = JSON.stringify(objs, null, 4);
    const expected = JSON.stringify(resultObjs);
    // console.log("output", output);
    expect(output).toEqual(expected);
  });

  // TODO add cases for leaf node deletion or a target without a right
  // - appear to be handled in the code
});
