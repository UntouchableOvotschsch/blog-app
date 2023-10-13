const { readdir, writeFile, mkdirSync } = require('fs');
const { join: joinPath, relative, resolve } = require('path');
const { promisify } = require('util');

const { copySync } = require('fs-extra');

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

const lokiDir = joinPath(__dirname, '..', '.loki');
const actualDir = joinPath(lokiDir, 'current');
const expectedDir = joinPath(lokiDir, 'reference');
const diffDir = joinPath(lokiDir, 'difference');

const reportPath = joinPath(__dirname, '..', 'reports');

mkdirSync(`${reportPath}/uiReportSources`, { recursive: true });

const uiReportDir = joinPath(reportPath, 'uiReportSources/');

async function moveDirectory(oldPath, newPathKey) {
    await copySync(oldPath, `${uiReportDir}/${newPathKey}`, { overwrite: true });
}

moveDirectory(actualDir, 'current');
moveDirectory(expectedDir, 'reference');
moveDirectory(diffDir, 'difference');

const newActualDir = joinPath(uiReportDir, 'current');
const newExpectedDir = joinPath(uiReportDir, 'reference');
const newDiffDir = joinPath(uiReportDir, 'difference');

(async function main() {
    const diffs = await asyncReaddir(diffDir);

    await writeFileAsync(
        joinPath(uiReportDir, 'report.json'),
        JSON.stringify({
            newItems: [],
            deletedItems: [],
            passedItems: [],
            failedItems: diffs,
            expectedItems: diffs,
            actualItems: diffs,
            diffItems: diffs,
            actualDir: relative(reportPath, newActualDir),
            expectedDir: relative(reportPath, newExpectedDir),
            diffDir: relative(reportPath, newDiffDir),
        }),
    );
})();
