function throttle(callback, time, immediate = true) {
    let timer = null
    return function () {
        let that = this
        if (timer) {
            this.$message.warning('小伙伴请慢一点~')
            return
        }
        if (immediate) {
            callback.apply(that, arguments)
            timer = setTimeout(() => {
                timer = null
            }, time)
        }else{
            timer = setTimeout(() => {
                callback.apply(that, arguments)
                timer = null
            }, time)
        }

    }
}

export default throttle
