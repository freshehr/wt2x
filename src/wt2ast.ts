import { RmElement, WebTemplate } from "."

const processTree = (element) :RmElement => {
    if (element.children){
        return {
            ...element,
            type: element.rmType,
            children: element.children.map(child=>processTree(child))
        }
    } else {
        return {
            ...element,
            type: element.rmType
        }
    }
}

const wt2ast = (webtemplate): RmElement =>{
    return processTree(webtemplate.tree)
}

export default wt2ast