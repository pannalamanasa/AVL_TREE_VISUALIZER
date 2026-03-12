class Node{
    constructor(value){
        this.value=value
        this.left=null
        this.right=null
        this.height=1
    }
}

class AVLTree{

    height(node){
        if(node==null) return 0
        return node.height
    }

    getBalance(node){
        if(node==null) return 0
        return this.height(node.left)-this.height(node.right)
    }

    rightRotate(y){

        let x=y.left
        let T2=x.right

        x.right=y
        y.left=T2

        y.height=Math.max(this.height(y.left),this.height(y.right))+1
        x.height=Math.max(this.height(x.left),this.height(x.right))+1

        return x
    }

    leftRotate(x){

        let y=x.right
        let T2=y.left

        y.left=x
        x.right=T2

        x.height=Math.max(this.height(x.left),this.height(x.right))+1
        y.height=Math.max(this.height(y.left),this.height(y.right))+1

        return y
    }

    insert(node,value){

        if(node==null)
            return new Node(value)

        if(value<node.value)
            node.left=this.insert(node.left,value)

        else if(value>node.value)
            node.right=this.insert(node.right,value)

        else
            return node

        node.height=1+Math.max(this.height(node.left),this.height(node.right))

        let balance=this.getBalance(node)

        if(balance>1 && value<node.left.value)
            return this.rightRotate(node)

        if(balance<-1 && value>node.right.value)
            return this.leftRotate(node)

        if(balance>1 && value>node.left.value){
            node.left=this.leftRotate(node.left)
            return this.rightRotate(node)
        }

        if(balance<-1 && value<node.right.value){
            node.right=this.rightRotate(node.right)
            return this.leftRotate(node)
        }

        return node
    }
}

let tree=new AVLTree()
let root=null

function insertValue(){

    let value=parseInt(document.getElementById("value").value)

    if(isNaN(value)) return

    root=tree.insert(root,value)

    drawTree()
}

function drawTree(){

    let container=document.getElementById("tree")
    container.innerHTML=""

    if(root==null) return

    let width=800
    let levelGap=80

    let svg=document.createElementNS("http://www.w3.org/2000/svg","svg")
    svg.setAttribute("width",width)
    svg.setAttribute("height",500)

    container.appendChild(svg)

    function drawNode(node,x,y,gap){

        if(node==null) return

        let circle=document.createElementNS("http://www.w3.org/2000/svg","circle")
        circle.setAttribute("cx",x)
        circle.setAttribute("cy",y)
        circle.setAttribute("r",20)
        circle.setAttribute("fill","#4CAF50")

        svg.appendChild(circle)

        let text=document.createElementNS("http://www.w3.org/2000/svg","text")
        text.setAttribute("x",x)
        text.setAttribute("y",y+5)
        text.setAttribute("text-anchor","middle")
        text.setAttribute("fill","white")
        text.textContent=node.value

        svg.appendChild(text)

        if(node.left){

            let line=document.createElementNS("http://www.w3.org/2000/svg","line")
            line.setAttribute("x1",x)
            line.setAttribute("y1",y)
            line.setAttribute("x2",x-gap)
            line.setAttribute("y2",y+levelGap)
            line.setAttribute("stroke","black")

            svg.appendChild(line)

            drawNode(node.left,x-gap,y+levelGap,gap/2)
        }

        if(node.right){

            let line=document.createElementNS("http://www.w3.org/2000/svg","line")
            line.setAttribute("x1",x)
            line.setAttribute("y1",y)
            line.setAttribute("x2",x+gap)
            line.setAttribute("y2",y+levelGap)
            line.setAttribute("stroke","black")

            svg.appendChild(line)

            drawNode(node.right,x+gap,y+levelGap,gap/2)
        }
    }

    drawNode(root,width/2,40,200)
}