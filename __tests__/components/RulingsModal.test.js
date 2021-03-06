import React from 'react';
import fetchMock from 'fetch-mock';
import RulingsModal from '../../components/RulingsModal';
import { Button } from 'semantic-ui-react';
import { mount } from 'enzyme';
import WizardsIcon from '../../components/WizardsIcon';
import ScryfallIcon from '../../components/ScryfallIcon';

describe('RulingsModal', () => {
  afterEach(() => {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
  });

  const mockCard = {
    image_uris: {
      large: 'image uri',
    },
    name: 'Derevi, Empyrial Tactician',
  };
  const mockCardWithFaces = {
    card_faces: [
      {
        image_uris: {
          large: 'image uri face 1',
        },
      },
      {
        image_uris: {
          large: 'image uri face 2',
        },
      },
    ],
    name: 'Derevi, Empyrial Tactician',
  };

  const mockRulings = [
    {
      source: 'scryfall',
      published_at: '2015-01-19',
      comment:
        'Derevi, Empyrial Tactician is banned as a commander in Duel Commander format, but it may be part of your deck.',
    },
    {
      source: 'wotc',
      published_at: '2013-10-17',
      comment:
        'You can activate Derevi’s last ability only when it is in the command zone.',
    },
    {
      source: 'wotc',
      published_at: '2013-10-17',
      comment:
        'When you activate Derevi’s last ability, you’re not casting Derevi as a spell. The ability can’t be countered by something that counters only spells. The ability isn’t subject to the additional cost of casting commanders from the command zone.',
    },
  ];

  test('renders a trigger button', () => {
    const wrapper = mount(
      <RulingsModal card={mockCard} rulings={mockRulings} />
    );

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).prop('title')).toEqual('Rulings');
  });

  test('renders a disabled trigger button if no rulings', () => {
    const wrapper = mount(<RulingsModal card={mockCard} rulings={[]} />);

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).prop('title')).toEqual('Rulings');
    expect(wrapper.find(Button).prop('disabled')).toEqual(true);
  });

  test('renders formatted rulings', () => {
    const wizardsIcon = mount(<WizardsIcon />);
    const scryfallIcon = mount(<ScryfallIcon />);
    const wrapper = mount(
      <RulingsModal card={mockCard} rulings={mockRulings} />
    );
    wrapper.find(Button).simulate('click');

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    const comments = modal.querySelectorAll('.comment');
    expect(comments).toHaveLength(3);

    expect(comments[0].querySelector('.avatar').innerHTML).toEqual(
      scryfallIcon.html()
    );
    expect(comments[0].querySelector('.author').innerHTML).toEqual('Scryfall');
    expect(comments[0].querySelector('.metadata').innerHTML).toEqual(
      '2015-01-19'
    );
    expect(comments[0].querySelector('.text').innerHTML).toEqual(
      'Derevi, Empyrial Tactician is banned as a commander in Duel Commander format, but it may be part of your deck.'
    );

    expect(comments[1].querySelector('.avatar').innerHTML).toEqual(
      wizardsIcon.html()
    );
    expect(comments[1].querySelector('.author').innerHTML).toEqual('Wizards');
    expect(comments[1].querySelector('.metadata').innerHTML).toEqual(
      '2013-10-17'
    );
    expect(comments[1].querySelector('.text').innerHTML).toEqual(
      'You can activate Derevi’s last ability only when it is in the command zone.'
    );

    expect(comments[2].querySelector('.avatar').innerHTML).toEqual(
      wizardsIcon.html()
    );
    expect(comments[2].querySelector('.author').innerHTML).toEqual('Wizards');
    expect(comments[2].querySelector('.metadata').innerHTML).toEqual(
      '2013-10-17'
    );
    expect(comments[2].querySelector('.text').innerHTML).toEqual(
      'When you activate Derevi’s last ability, you’re not casting Derevi as a spell. The ability can’t be countered by something that counters only spells. The ability isn’t subject to the additional cost of casting commanders from the command zone.'
    );
  });

  // These tests are difficult because semantic ui portal rendering is not supported here.
  test('renders the card image', () => {
    const wrapper = mount(
      <RulingsModal card={mockCard} rulings={mockRulings} />
    );
    wrapper.find(Button).simulate('click');

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    expect(modal.querySelectorAll('.spin.front')).toHaveLength(1);
  });

  test('renders both card faces', () => {
    const wrapper = mount(
      <RulingsModal card={mockCardWithFaces} rulings={mockRulings} />
    );
    wrapper.find(Button).simulate('click');

    const modal = document.querySelector('.modal');
    expect(modal).toBeDefined();
    expect(modal.querySelectorAll('.spin.front')).toHaveLength(2);
  });
});
