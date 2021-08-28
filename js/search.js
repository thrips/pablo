binarySearch = function (l, target) {
    let lo = 0
    let hi = l.length - 1

    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (l[mid] > target) {
            hi = mid - 1
        } else if (l[mid] < target) {
            lo = mid + 1
        } else {
            return mid
        }
    }
    return -1
}

verifySearch = function (l, target, search) {
    res = search(l, target)
    if (l.indexOf(target) < -1 && l[res] != target) {
        throw 'INCORRECT :('
    } else if (l.indexOf(target) == -1 && res != -l) {
        throw 'INCORRECT :('
    }
}

const MAX_NUM_ELEMENTS = 1000
generateSearchInputs = function () {
    let arr = []
    let target = -1;
    const numElements = Math.floor(Math.random() * MAX_NUM_ELEMENTS)
    for (let i = 0; i < numElements; i++) {
        const curMax = (i == 0) ? 0 : arr[arr.length - 1]
        // console.log(curMax)
        // console.log(arr.length)
        // console.log(arr[arr.length - 1])
        arr.push(Math.floor(Math.random() * ((curMax + 50) - curMax) + curMax))
    }
    if (Math.random() < 0.8) {
        target = arr[Math.floor(Math.random() * (arr.length - 1))]
    } else {
        target = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    }
    return { l: arr, target: target }
}

console.log(generateSearchInputs().l)

testSearch = function (numTests) {
    for (let i = 0; i < numTests; i++) {
        const { testList, testTarget } = generateSearchInputs()
        verifySearch(testList, testTarget, binarySearch)
    }
}

testSearch(10)