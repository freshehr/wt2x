# wt2x - WebTemplate to X
A simple command line utility to transform openEHR webtemplates to various other formats.

## Installation
You can directly use this utility using `npx`
```
npx wt2x
```

If you prefer installing it locally
```
npm install -g wt2x
wt2x
```

# Usage
Convert Webtemplate to FHIR Logical Model
```
npx wt2x fhir ./webtemplate.json ./fhirLogicalModel.json
```