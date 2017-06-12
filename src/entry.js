import './styles/main.scss';

if (process.env.NODE_ENV === 'production') {
  require('./scripts/index.prod');
} else {
  require('./scripts/index.dev');
}
