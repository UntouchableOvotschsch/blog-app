import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const layers = [
    'app',
    'entities',
    'features',
    'pages',
    'shared',
    'widgets',
];

function isAbsolute(value: string) {
    return layers.some((layer) => value.startsWith(layer));
}
files.forEach((sourceFile) => {
    const imports = sourceFile.getImportDeclarations();
    imports.forEach((importValue) => {
        const value = importValue.getModuleSpecifierValue();
        if (isAbsolute(value)) {
            importValue.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();
