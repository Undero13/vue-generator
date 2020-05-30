import { shallowMount } from '@vue/test-utils';
import {{ name }} from '{{name}}.component.vue'

test('it can be mount', () => {
  const wrapper = shallowMount({{name}});

  expect(wrapper).toBeInstanceOf(Object);
});
