import { BinarySearch } from './BinarySearch.js'
import { NodeArray } from './NodeArray.js'
import { Arrows } from './Arrows.js'
import { TextBox } from './TextBox.js';

let search, nodeArray, arrows, textBox, sceneContainer

const app = new PIXI.Application({
    width: 512, height: 512, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

PIXI.Loader.shared
    .add("resources/Numbers.json")
    .add("resources/Nodes.json")
    .add("resources/Arrow.json")
    .add("resources/arrow.png")
    .add("resources/Button.png")
    .add("resources/NodeContainer.png")
    .load(setup)

function setup() {
    // TODO move inputs somewhere else
    const arr = [2, 4, 6, 7, 12, 15]
    const target = 7
    search = new BinarySearch(arr, target)
    sceneContainer = new PIXI.Container()

    setupButton()
    setupNodes(arr)
    setupTextBox(target)

    sceneContainer.pivot.set(
        Math.floor(sceneContainer.width / 2),
        Math.floor(sceneContainer.height / 2)
    )

    setupArrows()

    app.stage.addChild(sceneContainer)
    sceneContainer.position.set(Math.floor(app.screen.width / 2), 100)
    sceneContainer.scale.set(2)
}

function setupTextBox(target) {
    textBox = new TextBox(`Starting Binary Search.\nTarget is ${target}.`)
    textBox.container.position.set(30, 250)
    app.stage.addChild(textBox.container)
}

function setupNodes(arr) {
    nodeArray = new NodeArray(arr)
    for (let node of nodeArray.nodes) {
        sceneContainer.addChild(node)
        console.log(sceneContainer.getLocalBounds())
        console.log(sceneContainer.x)
    }
}

function setupButton() {
    const button = createUpdateButton()

    name.pisition
    button.position.set(Math.floor(app.screen.width / 2), 450)
    app.stage.addChild(button)


}

function setupArrows() {
    arrows = new Arrows(50, 10)
    for (let arrow in arrows.sprites) {
        sceneContainer.addChild(arrows.sprites[arrow])
    }

}

function createUpdateButton() {
    const buttonContainer = new PIXI.Container()
    const buttonSprite = new PIXI.Sprite(
        PIXI.Loader.shared.resources["resources/Button.png"].texture
    )
    const name = new PIXI.Text("Next->", {
        fontFamily: 'VT323',
        fontSize: 30,
        fill: 'black',
        align: 'left',
    })

    buttonSprite.interactive = true;
    buttonSprite.messageMode = true;
    buttonSprite.scale.set(2)
    buttonSprite.on('pointerdown', updateAnimation)

    name.resolution = 8
    name.anchor.set(0.5)
    name.position.set(
        Math.floor(buttonSprite.width / 2),
        Math.floor(buttonSprite.height / 2)
    )



    buttonContainer.addChild(buttonSprite)
    buttonContainer.addChild(name)

    buttonContainer.pivot.set(
        Math.floor(buttonContainer.width / 2),
        Math.floor(buttonContainer.height / 2)
    )
    return buttonContainer
}

function updateAnimation() {
    if (search.messageNeedsUpdate()) {
        textBox.updateText(search.getMessage())
    } else if (search.pointersNeedUpdate()) {
        arrows.setHiX(nodeArray.getNodeXPostion(search.hi))
        arrows.setMidX(nodeArray.getNodeXPostion(search.mid))
        arrows.setLoX(nodeArray.getNodeXPostion(search.lo))
        nodeArray.updateTexturesFromPointers(search.lo, search.hi, search.result)
        search.updatePointers()
    } else if (!search.done) {
        search.step()
        updateAnimation()
    } else {
        nodeArray.updateTexturesFromPointers(search.lo, search.hi, search.result)
    }
}

