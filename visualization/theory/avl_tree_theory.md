# AVL Tree

AVL Tree is a self balancing Binary Search Tree.

It was introduced by Adelson Velsky and Landis in 1962.

The tree automatically balances itself after insertion and deletion operations.

Balance Factor = Height(left subtree) - Height(right subtree)

Possible values:
-1, 0, 1

If balance factor becomes greater than 1 or less than -1 rotations are performed.

Rotations used in AVL Tree

LL Rotation
RR Rotation
LR Rotation
RL Rotation

Time Complexity

Search: O(log n)
Insertion: O(log n)
Deletion: O(log n)