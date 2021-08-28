export class BinarySearch {
    constructor(arr, t) {
        this.target = t
        this.array = arr
        this.lo = 0;
        this.hi = this.array.length - 1
        this.mid = -1

        this.prevLo = -1
        this.prevHi = -1
        this.prevMid = -1

        this.state = this.checkForCompletion.name
        this.done = false
        this.result = -1
        this.message = "Setting LO to zero and \n HI to last element."
        this.prevMessage = ""
    }

    checkForCompletion() {
        if (this.lo > this.hi || this.done) {
            this.done = true
            if (this.result == -1) {
                this.message = `TARGET was not found!`
            }
        } else {
            this.message = `LO is less than HI.\nContinuing.`
        }
    }

    calculateNewMid() {
        this.mid = Math.floor((this.lo + this.hi) / 2)
        this.message = `Calculating new MID:\n(LO + HI) / 2 = ${this.mid}`
    }

    updateLoHi() {
        if (this.array[this.mid] > this.target) {
            this.message =
                `MID is MORE than TARGET.\nMoving HI pointer DOWN.`
            this.hi = this.mid - 1
        } else if (this.array[this.mid] < this.target) {
            this.message =
                `MID is LESS than TARGET.\nMoving LO pointer UP.`
            this.lo = this.mid + 1
        } else {
            this.done = true
            this.result = this.mid
            this.message = `Found TARGET at Index ${this.mid}!`
        }
    }

    messageNeedsUpdate() {
        return (this.message != this.prevMessage)
    }

    pointersNeedUpdate() {
        return !(this.hi == this.prevHi && this.lo == this.prevLo && this.mid == this.prevMid)
    }

    updatePointers() {
        this.prevHi = this.hi
        this.prevLo = this.lo
        this.prevMid = this.mid
    }

    getMessage() {
        this.prevMessage = this.message
        return this.message
    }

    step() {
        if (this.done == true) {
            return false
        } else {
            if (this.state == this.checkForCompletion.name) {
                this.checkForCompletion()
                this.state = this.calculateNewMid.name
            } else if (this.state == this.calculateNewMid.name) {
                this.calculateNewMid()
                this.state = this.updateLoHi.name
            } else if (this.state == this.updateLoHi.name) {
                this.updateLoHi()
                this.state = this.checkForCompletion.name
            }
            return true
        }
    }
}