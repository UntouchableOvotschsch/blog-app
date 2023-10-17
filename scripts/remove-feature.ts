import { JsxAttribute, JsxSelfClosingElement, Node, Project, SyntaxKind } from 'ts-morph';

const project = new Project();
// project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage/index.tsx');

const toggleFeatureFunction = 'toggleFeature'
const toggleFeatureComponent = 'ToggleFeatureComponent'

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
    let isToggleFunctionCheck = false;
    node.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.Identifier) && node.getText() === toggleFeatureFunction) {
            isToggleFunctionCheck = true;
        }
    });
    return isToggleFunctionCheck;
};


const isToggleComponent = (node: Node) => {
    let isToggleComponentCheck = false;
    node.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.Identifier) && node.getText() === toggleFeatureComponent) {
            isToggleComponentCheck = true;
        }
    });
    return isToggleComponentCheck;
};

const getComponentWithoutBrackets = (jsxElement: JsxSelfClosingElement) => jsxElement.getText()
    .split('').filter(el => el !== '(' || el !== '(').join('')


const removeFeatureForFunction = (node: Node) => {
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


const getAttributeByName = (attributes: JsxAttribute[], name: string) => attributes.find(node => node.getNameNode()
    .getText() === name)

const removeFeatureForComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeByName(attributes, 'on')
    const offAttribute = getAttributeByName(attributes, 'off')
    const nameAttribute = getAttributeByName(attributes, 'name')
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getLiteralValue()

    if(nameAttribute !== featureName) return;


    if(featureMode === 'on') {
        const jsxElement = onAttribute?.getFirstDescendantByKind(SyntaxKind.JsxSelfClosingElement);
        if(jsxElement) {
            node.replaceWithText(getComponentWithoutBrackets(jsxElement))
        }
    }

    if(featureMode === 'off') {
        const jsxElement = offAttribute?.getFirstDescendantByKind(SyntaxKind.JsxSelfClosingElement);
        if(jsxElement) {
            node.replaceWithText(getComponentWithoutBrackets(jsxElement))
        }
    }


}

files.forEach((sourceFile) => {
    // eslint-disable-next-line consistent-return
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return removeFeatureForFunction(node)
        }

        if(node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
            return removeFeatureForComponent(node)
        }
    });
});

project.save();
