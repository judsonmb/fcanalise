const pathUtils = require('path')
const fs = require('fs')

//create a directory to store photos (if it does not exist)
const dataDir = pathUtils.resolve(_dirname, '..', 'data')
const analyzesFilesDir = pathUtils.join(dataDir, 'analyzes-files')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
if (!fs.existsSync(analyzesFilesDir)) fs.mkdirSync(analyzesFilesDir)

function saveAnalysisEntry(folderName, analyzeId) {
    //will be implemented after
}

//we need these versions of functions
//based on promises after
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const rename = promisify(fs.rename)

exports.api.analysisFilesSave = async (req, res, files) => {
    const report = files.report[0]
    const dir = analysisFilesDir + '/' + Date.now()
    const path = dir + '/' + report.originalFilename
    await mkdir(dir)
    await rename(report.path, path)
    saveAnalysisEntry('analysis-files', req.params.analysisId)
}