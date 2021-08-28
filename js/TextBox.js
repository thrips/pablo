export class TextBox {
    constructor(initialText) {
        this.container = new PIXI.Container()
        const box = new PIXI.Sprite(PIXI.Loader.shared.resources["resources/Button.png"].texture)
        box.scale.set(7, 5)

        this.textSprite = new PIXI.Text(initialText, {
            fontFamily: 'VT323',
            fontSize: 40,
            fill: 'black',
            align: 'center',
            leading: 5,
        });
        this.textSprite.resolution = 2
        this.textSprite.anchor.set(0.5, 0.5)
        this.textSprite.position.set(box.width / 2, box.height / 2)

        this.container.addChild(box)
        this.container.addChild(this.textSprite)
    }

    updateText(newText) {
        this.textSprite.text = newText
    }
}