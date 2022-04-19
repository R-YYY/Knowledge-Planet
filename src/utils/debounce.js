function debounce(callback, time, immediate = true) {
    let timer = null
    return function () {
        let that = this
        if (timer) clearTimeout(timer)
        if (immediate) {
            let sign = !timer
            timer = setTimeout(() => {
                timer = null
            }, time)
            if (sign) callback.apply(that, arguments)
        } else {
            timer = setTimeout(() => {
                callback.apply(that, arguments)
            }, time)
        }
    }
}

export default debounce
