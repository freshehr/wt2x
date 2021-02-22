import {Node} from 'unist'

/**
 * Represents a webtemplate
 */
export interface WebTemplate {
    templateId: string,
    version: string,
    defaultLanguage: string,
    languages: string [],
    tree: RmElement
}

/**
 * Abstract Base to Inherit from
 */
interface Base extends Node {
    id: string,
    name: string,
    min: number,
    max: number,
    aqlPath: string,
    localizedName?: string,
    nodeID?: string,
    inContext?: boolean,
    localizedNames?:{
        [key: string]: string
    }
    localizedDescription?: {
        [key: string]: string
    },
    annotations?: {
        [key: string]: string
    }
    children?: RmElement[]
}

interface Group extends Base {
    
}

interface Leaf extends Base {
    
}

interface Composition extends Group {
    rmType: 'COMPOSITION',
}


interface DvCodedText extends Leaf {
    rmType: 'DV_CODED_TEXT',
    inputs: CodedTextInput
}

interface DvText extends Leaf {
    rmType: 'DV_CODED_TEXT',
    inputs: TextInput

}

interface DvDateTime extends Leaf {
    rmType: 'DV_DATE_TIME'
    inputs: DateTimeInput
}

interface DvQuantity extends Leaf {
    rmType: 'DV_QUANTITY'
}
// TODO: Add other leaf types

interface OtherNode extends Base {
    rmType: 'OBSERVATION' | 'EVALUATION' | ''
}

type NamedNodes = 
Composition |
DvText|
DvCodedText|
DvQuantity|
DvDateTime

export type RmElement = NamedNodes | OtherNode


// Input Types
export type TextInput = [{
    type: "TEXT"
}]

interface CodedTextLocal {
    suffix: string,
    type: 'CODED_TEXT',
    list: {
        value: string,
        label: string,
        localizedLabels: {
            [key: string]: string
        },
        localizedDescriptions: {
            [key: string]: string
        }[]
    },
    validation?: any
}

interface CodedTextExternal {
    suffix: string,
    type: 'TEXT',
    terminology: string
}

export type CodedTextInput = [CodedTextExternal, CodedTextExternal] | [CodedTextLocal]

export type DateTimeInput = [{
    type: "DATETIME"
}]
