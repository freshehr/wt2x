export const snake2Camel = (str:string) : string =>{
    const replaced = str.replace(/([-_]\w)/g, g => g[1].toUpperCase())
    const capitalized = replaced.charAt(0).toUpperCase() + replaced.slice(1)
    return capitalized
}