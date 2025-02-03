/**
 * Push code from DEV to PROD
 */
function pushToProd() {

  const DEV_SCRIPT_ID = 'xxx'
  const PRD_SCRIPT_ID = 'yyy'

  const devContent = getScriptContent(DEV_SCRIPT_ID);

  if (devContent) {
    updateScriptContent(PRD_SCRIPT_ID, devContent);
    Logger.log('Le script a été mis à jour sur la PROD avec succès.');
  } else {
    Logger.log('Erreur lors de la récupération du contenu du script DEV.');
  }
}

/**
 * Récupère le contenu d'un projet Apps Script.
 * @param {string} scriptId - L'ID du projet Apps Script.
 * @return {Array} - Un tableau des fichiers du projet.
 */
function getScriptContent(scriptId) {
  const url = `https://script.googleapis.com/v1/projects/${scriptId}/content`;
  const options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
    },
  };

  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  return result.files || null;
}

/**
 * Met à jour le contenu d'un projet Apps Script.
 * @param {string} scriptId - L'ID du projet Apps Script.
 * @param {Array} files - Un tableau des fichiers à mettre à jour.
 */
function updateScriptContent(scriptId, files) {
  const url = `https://script.googleapis.com/v1/projects/${scriptId}/content`;
  const payload = JSON.stringify({ files });
  const options = {
    method: 'put',
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
    },
    contentType: 'application/json',
    payload: payload,
  };

  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() === 200) {
    Logger.log('Mise à jour réussie.');
  } else {
    Logger.log('Erreur lors de la mise à jour : ' + response.getContentText());
  }
}
