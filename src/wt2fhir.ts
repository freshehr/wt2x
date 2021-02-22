
import wt2ast from './wt2ast'
import visit from 'unist-util-visit'
import { Composition, RmElement } from '.'
import { snake2Camel } from './utils'

const processComposition = (element: Composition, lang: string = "en"): any => {
    const url = `http://example.org/fhir/StructureDefinition/${element.id}`
    let structureDefinition = {
        resourceType: "StructureDefinition",
        id: snake2Camel(element.id),
        url,
        name: snake2Camel(element.id),
        fhirVersion: "4.0.1",
        kind: "logical",
        abstract: false,
        type: url,
        baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
        description: element?.localizedDescription?.[lang],
        status: "draft"
    }
    return structureDefinition
}


const processRmElement = (element: RmElement, lang:string='en') : {logicalElement: any, artefacts: any[]}  => {
    const defaults = {
        id: element.id,
        path: element.id,
        short: element.name,
        definition: element?.localizedDescription?.[lang],
        min: element.min,
        max: element.max === -1 ? "*" : element.max,
    }
    let logicalElement
    switch (element.rmType) {
        case "COMPOSITION":
            logicalElement = {
                ...defaults,
                type: [
                    {
                        code: "Element"
                    }
                ]
            }
            break
        case "DV_CODED_TEXT":
            logicalElement = {
                ...defaults,
                type: [
                    {
                        code: "CodeableConcept",
                        profile: [
                          "http://hl7.org/fhir/StructureDefinition/CodeableConcept"
                        ]
                      }
                ]
            }
            break
        default:
            logicalElement = {
                ...defaults,
                type: [
                    {
                        code: "BackboneElement"
                    }
                ]
            }
            
        }
    return {
        logicalElement,
        artefacts: []
    }
    
}
const wt2fhir = (webtemplate, lang: string="en")=>{
    const originalAst = wt2ast(webtemplate)
    // Copying to prevent side effects in the original webtemplate object since we are editing in place.
    let ast = {...originalAst}
    let elements = []
    let structureDefinition
    let allArtefacts = []
    visit(ast, (node: RmElement, index, parent)=>{
        if (node.rmType === 'COMPOSITION') {
            structureDefinition = processComposition(node, lang)
        }
        node.id = node.id.replace('.', '')
        node.id = parent ? `${parent.id}.${node.id}` : node.id
        const {logicalElement, artefacts} = processRmElement(node)
        allArtefacts = [...allArtefacts, ...artefacts]
        elements = [...elements, logicalElement]
    })
    structureDefinition = {...structureDefinition, differential: {
        element: elements
    }}
    return structureDefinition

}


export default wt2fhir