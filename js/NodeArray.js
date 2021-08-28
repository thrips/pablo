
export class NodeArray {
    textures = {
        HAPPY: "happy",
        SAD: "sad",
        NEUTRAL: "neutral",
    }

    constructor(arr) {
        this.arr = arr
        this.numberSheet = PIXI.Loader.shared
            .resources["resources/Numbers.json"].spritesheet
        this.nodeSheet = PIXI.Loader.shared
            .resources["resources/Nodes.json"].spritesheet
        this.nodes = this.createNodes(arr)

    }

    createNodes(arr) {
        const new_nodes = []
        for (let i = 0; i < arr.length; i++) {
            const node = this.createNode(arr[i])
            node.x = i * node.width
            new_nodes.push(node)
        }
        return new_nodes
    }

    createNode(n) {
        const nodeContainer = new PIXI.Container()
        const nodeSprite = new PIXI.Sprite(
            this.nodeSheet.textures["neutral.png"]
        )
        const tensSprite = this.getNumberSprite(Math.floor(n / 10))
        const onesSprite = this.getNumberSprite(n % 10)

        tensSprite.position.set(9, 7)
        onesSprite.position.set(17, 7)
        nodeContainer.addChild(nodeSprite)
        nodeContainer.addChild(tensSprite)
        nodeContainer.addChild(onesSprite)

        return nodeContainer
    }

    getNumberSprite(n) {
        return new PIXI.Sprite(
            this.numberSheet.textures[`Numbers${n}.png`]
        )
    }

    updateNodeTexture(i, texture) {
        this.nodes[i].getChildAt(0).texture =
            this.nodeSheet.textures[`${texture}.png`]
    }

    updateTexturesFromPointers(lo, hi, res) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (i == res) {
                this.updateNodeTexture(i, this.textures.HAPPY)
            } else if (i < lo || i > hi || res != -1) {
                this.updateNodeTexture(i, this.textures.SAD)
            }
        }
    }

    getNodeXPostion(i) {
        if (i >= 0 && i < this.nodes.length) {
            return this.nodes[i].x + Math.floor(this.nodes[i].width / 2)
        } else {
            return -1
        }
    }
}