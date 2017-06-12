/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
module.exports = (input, response) => {
  let responseText = null;

  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }

  if (response.intents && response.intents[0]) {
    const intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = `I understood your intent was ${intent.intent}`;
    } else if (intent.confidence >= 0.5) {
      responseText = `I think your intent was ${intent.intent}`;
    } else {
      responseText = 'I did not understand your intent';
    }
  }

  return responseText;
};
