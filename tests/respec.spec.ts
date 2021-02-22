import wt2fhir from '../src/wt2fhir'
import webtemplate from './ReSPECT-3.v0.json'

describe('Specific templates', ()=>{
    it('should work with the ReSPECT template', ()=>{
        expect(()=>wt2fhir(webtemplate)).not.toThrow()
        const logicalModel = wt2fhir(webtemplate)
        expect(logicalModel).toBeDefined()
    })
})