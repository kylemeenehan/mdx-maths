import {visit} from 'unist-util-visit'
import type {Node, Literal, Parent} from 'unist'
export function attacher() {
    return (tree: Node, file: any) => {
        visit(tree, 'root', (node) => {
            console.log(node);
        })
    }
}