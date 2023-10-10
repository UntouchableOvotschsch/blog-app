import path from 'path';

import { Project } from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const sharedUIPath = path.resolve(__dirname, '..', 'src', 'shared', 'ui');
const sharedUIDirectory = project.getDirectory(sharedUIPath);
const componentDirs = sharedUIDirectory?.getDirectories();

const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets'];

function isAbsolute(value: string) {
    return layers.some((layer) => value.startsWith(layer));
}

function isRelative(value: string) {
    return value.startsWith('./') || value.startsWith('../');
}

componentDirs?.forEach((directory) => {
    const indexTsFilePath = `${directory.getPath()}/index.ts`;
    const indexTsxFilePath = `${directory.getPath()}/index.tsx`;
    const isIndexTsFileExists = directory.getSourceFile(indexTsFilePath);
    const isIndexTsxFileExists = directory.getSourceFile(indexTsxFilePath);
    if (!isIndexTsFileExists && !isIndexTsxFileExists) {
        const sourceFile = directory.getSourceFile(`${directory.getPath()}/${directory.getBaseName()}.tsx`);
        const newIndexSourceFile = sourceFile?.copy(indexTsxFilePath);
        newIndexSourceFile?.save();
        sourceFile?.delete();
    }
});

files.forEach((file) => {
    const imports = file.getImportDeclarations();
    imports.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const removeAlias = value.replace('@/', '');

        const segments = removeAlias.split('/');
        const isSharedLayer = segments[0] === 'shared';
        const isUISlice = segments[1] === 'ui';

        if (isAbsolute(removeAlias) && isSharedLayer && isUISlice) {
            const result = removeAlias.split('/').slice(0, 3).join('/');
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
        // if (isRelative(value)) {
        //     const result = value.split('/').slice(0, -1);
        //     importDeclaration.setModuleSpecifier(`@/${result}`);
        // }
    });
});

project.save();
