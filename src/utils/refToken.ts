const activeToken = () => {

    const value = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" 
    let token =""
    for(let i=0; i<=20; i++){
        token+=value.charAt(Math.floor(Math.random()*value.length))
    }
    return token
}
// activeToken()

module.exports = { activeToken }