function throttle(callback,time){
    let timer = null
    return function (){
        let that = this
        if(timer) return
        timer = setTimeout(()=>{
            callback.apply(that,Object.values(arguments))
            timer = null
        },time)
    }
}
export default throttle
