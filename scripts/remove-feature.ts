import { Node, Project, SyntaxKind } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const featureName = process.argv[2];
const featureMode = process.argv[3];

if (!featureName) {
    throw new Error('Specify feature name');
}

if (!featureMode || (featureMode !== 'on' && featureMode !== 'off')) {
    throw new Error('Specify feature mode');
}

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
    let isToggleFunction = false;
    node.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.Identifier) && node.getText() === 'toggleFeature') {
            isToggleFunction = true;
        }
    });
    return isToggleFunction;
};

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const parameters = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
            if (!parameters) return;

            const nameParam = parameters
                .getProperty('name')
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1);

            if (nameParam !== featureName) return;

            if (featureMode === 'on') {
                const onParam =
                    parameters
                        .getProperty('on')
                        ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
                        ?.getBody()
                        .getText() ?? '';
                node.replaceWithText(onParam);
                return;
            }
            if (featureMode === 'off') {
                const offParam =
                    parameters
                        .getProperty('off')
                        ?.getFirstDescendantByKind(SyntaxKind.ArrowFunction)
                        ?.getBody()
                        ?.getText() ?? '';
                node.replaceWithText(offParam);
            }
        }
    });
});

project.save();
