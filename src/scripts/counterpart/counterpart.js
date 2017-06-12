// @flow
/*
 * This file is part of the Watson Chatbot Test App.
 */

import t from 'counterpart';

import nb from '../../translations/nb.yml';
import en from '../../translations/en.yml';

t.registerTranslations('nb', nb);
t.registerTranslations('en', en);

const locale = 'nb';

t.setLocale(locale);

export default t;
