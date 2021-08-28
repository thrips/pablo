export class Arrows {

    constructor(yDefault, yOffset) {
        this.arrowSheet = PIXI.Loader.shared.resources["resources/Arrow.json"].spritesheet
        this.yDefault = yDefault
        this.yOffset = yOffset
        this.sprites = {
            Lo: this.createArrow('Lo'),
            Mid: this.createArrow('Mid'),
            Hi: this.createArrow('Hi'),
        }
    }

    createArrow(arrowName) {
        const arrowContainer = new PIXI.Container()
        const arrowSprite = new PIXI.Sprite(this.arrowSheet.textures[`${arrowName}Neutral.png`])
        const name = new PIXI.Text(arrowName.toUpperCase(), {
            fontFamily: 'VT323',
            fontSize: 12,
            fill: 'black',
            align: 'left',
        });

        name.resolution = 8
        name.anchor.set(0.5)
        name.position.set(arrowSprite.width / 2, Math.floor(7 * arrowSprite.height / 8))

        arrowContainer.addChild(arrowSprite)
        arrowContainer.addChild(name)
        arrowContainer.pivot.set(
            Math.floor(arrowContainer.width / 2),
            Math.floor(arrowContainer.height / 2)
        )
        arrowContainer.y = this.yDefault
        return arrowContainer
    }

    setHiX(x) {
        this.setX(this.sprites.Hi, x)
    }

    setLoX(x) {
        this.setX(this.sprites.Lo, x)
    }

    setMidX(x) {
        this.setX(this.sprites.Mid, x)
    }

    setX(arrow, x) {
        if (arrow.x != x) {
            arrow.x = x
            this.updateY(arrow)
        }

    }

    updateY(arrow) {
        arrow.y = this.yDefault
        for (let curArrow in this.sprites) {
            console.log(curArrow.x, arrow.x)
            if (this.sprites[curArrow] != arrow && this.sprites[curArrow].x == arrow.x) {
                arrow.y += this.yOffset
                this.moveToTop(arrow)
            }
        }
    }

    moveToTop(sprite) {
        const parent = sprite.parent
        parent.removeChild(sprite)
        parent.addChild(sprite)
    }
}