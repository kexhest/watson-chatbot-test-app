'use strict';

const config = require('../config');
const conversation = require('../config/conversation');
const toneAnalyzer = require('../config/tone-analyzer');

const index = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

const show = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

const update = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

const create = (req, res) => {
  // return res.status(501).json({
  //   error: {
  //     message: 'Nothing to see here.. yet.',
  //   },
  // });

  const { message: { context, text } } = req.body;

  const payload = {
    workspace_id: config.get('CONVERSATION_WORKSPACE_ID'),
    context: context,
    input: {
      text,
    },
  };

  toneAnalyzer.tone(
    Object.assign({}, payload.input, { tones: 'emotion' }),
    (err, response) => {
      if (err) {
        return res.status(err.code || 500).json(err);
      }

      const { tones } = response.document_tone.tone_categories[0];

      conversation.message(payload, (err, response) => {
        if (err) {
          return res.status(err.code || 500).json(err);
        }

        // console.log(response);

        return res.status(201).json({
          data: {
            id: Date.now(),
            sender: 'bot',
            text: response.output.text[0],
          },
          tones: Object.keys(tones).map(key => tones[key]),
          context: response.context,
        });
      });
    }
  );
};

const destroy = (req, res) =>
  res.status(501).json({
    error: {
      message: 'Nothing to see here.. yet.',
    },
  });

module.exports = {
  index,
  show,
  update,
  create,
  destroy,
};
