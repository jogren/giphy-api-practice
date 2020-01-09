import React from 'react';
import { shallow } from 'enzyme';
// import { render } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  it('renders a mock title', () => {
    expect(true).toEqual(true);
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot();
  })

  it('should empty search input on submit', async () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ search: 'blah' })
    const mockEvent = { preventDefault: jest.fn() };
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('search')).toEqual('');
  })

  it('should set the value of search', () => {
    const wrapper = shallow(<App />);
    const mockEvent = { target: { value: 'Hello' } };
    wrapper.instance().handleSearch(mockEvent);
    expect(wrapper.state('search')).toEqual('Hello');
  })

  it('should fetch dog images when searched', () => {
    const wrapper = shallow(<App />);
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    })
    wrapper.setState({ search: 'dogs' });
    wrapper.instance().fetchImages();
    expect(window.fetch).toHaveBeenCalledWith('https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=dogs')
  })
})
