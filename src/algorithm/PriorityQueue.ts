import { CompareToFun } from "./dijkstra";
import { Node } from "./dijkstra";
export class PriorityQueue {
  constructor(
    public compareTo: CompareToFun,
    public queue: Node[],
    public set: Set<Node>
  ) {}
  size() {
    return this.queue.length;
  }
  isEmpty() {
    return this.queue.length > 0 ? false : true;
  }
  contains(node: Node) {
    return this.set.has(node);
  }
  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue Is Empty ....");
    }
    return this.queue[0];
  }
  get() {
    return this.remove(this.peek());
  }
  remove(node: Node) {
    this.set.delete(node);
    let index = 0;
    for (index = 0; index < this.size(); index++) {
      if (this.queue[index] === node) {
        break;
      }
    }
    let parent = index,
      child = 2 * parent + 1,
      tmp = this.queue[index];
    while (child < this.size()) {
      if (
        child + 1 < this.size() &&
        this.compareTo(this.queue[child], this.queue[child + 1]) >= 1
      ) {
        this.queue[parent] = this.queue[child + 1];
        parent = child + 1;
        child = 2 * parent + 1;
      } else {
        this.queue[parent] = this.queue[child];
        parent = child;
        child = 2 * parent + 1;
      }
    }
    this.queue.splice(parent, 1);
    return tmp;
  }
  add(node: Node) {
    this.set.add(node);
    this.queue.push(node);
    let child = this.size() - 1,
      parent = Math.floor((child - 1) / 2);
    let tmp: Node;
    while (
      child > 0 &&
      this.compareTo(this.queue[parent], this.queue[child]) >= 1
    ) {
      tmp = this.queue[parent];
      this.queue[parent] = this.queue[child];
      this.queue[child] = tmp;
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  }
}
