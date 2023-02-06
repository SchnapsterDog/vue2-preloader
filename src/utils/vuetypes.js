import VueTypes from 'vue-types';

VueTypes.sensibleDefaults = {
  bool: false,
  func: () => {},
  string: '',
  number: 0,
  array: () => [],
  object: () => ({}),
  integer: 0
};

export default VueTypes;
