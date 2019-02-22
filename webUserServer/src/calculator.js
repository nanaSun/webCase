module.exports={
    add(){
        let args=Array.prototype.slice.call(arguments)
        return args.reduce((p,c)=>{
            return p+c
        })
    },
    minus(){
        let args=Array.prototype.slice.call(arguments)
        return args.reduce((p,c)=>{
            return p-c
        })
    },
    plus(){
        let args=Array.prototype.slice.call(arguments)
        return args.reduce((p,c)=>{
            return p*c
        })
    },
    divide(){
        let args=Array.prototype.slice.call(arguments)
        return args.reduce((p,c)=>{
            if(c!==0){
                return p/c
            }else{
                throw new Error()
            }
        })
    }
}