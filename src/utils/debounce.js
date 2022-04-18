function debounce(callback,time){
    let timer = null
    return function (){
        let that = this
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            callback.apply(that,Object.values(arguments))
        },time)
    }
}
export default debounce
