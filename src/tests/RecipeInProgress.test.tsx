import { screen, waitFor } from '@testing-library/dom';
import { RenderResult, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi } from 'vitest';
import App from '../App';
import { mealsResponse } from './mock/mealsById.mock';
import { renderWithRouter } from './renderWithRouter';

let render: RenderResult;
const recipeInProgressPath = '/meals/52772/in-progress';
const favoriteBtnId = 'favorite-btn';
const whiteHeartIconPath = '/src/images/whiteHeartIcon.svg';

beforeEach(async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (mealsResponse),
  });
  await act(() => {
    render = renderWithRouter(<App />, { initialEntries: [recipeInProgressPath] });
  });
  Object.assign(window.navigator, {
    clipboard: {
      writeText: vi.fn().mockImplementation(() => Promise.resolve()),
    },
  });
});

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('Testes tela de receitas em progresso', async () => {
  test('Deve mostrar o texto \'Link copied!\' ao clicar no botão \'share\'', async () => {
    const shareBtn = screen.getByTestId('share-btn');
    await userEvent.click(shareBtn);

    await act(() => waitFor(() => expect(screen.getByText('Link copied!')).toBeInTheDocument()));
  });

  test('Deve marcar uma receita como favorita', async () => {
    const favoriteBtnParent = screen.getByTestId(favoriteBtnId).parentElement as Element;
    expect(favoriteBtnParent.children.item(0)?.getAttribute('src')).toEqual(whiteHeartIconPath);
    await userEvent.click(favoriteBtnParent);
    expect(favoriteBtnParent.children.item(0)?.getAttribute('src')).toEqual('/src/images/blackHeartIcon.svg');
  });

  test('Deve manter as receitas favoritas salvas', async () => {
    const favoriteBtnParent = screen.getByTestId(favoriteBtnId).parentElement as Element;
    expect(favoriteBtnParent.children.item(0)?.getAttribute('src')).toEqual(whiteHeartIconPath);
    await userEvent.click(favoriteBtnParent);

    render.unmount();
    await act(() => renderWithRouter(<App />, { initialEntries: [recipeInProgressPath] }));

    const favoriteBtn = screen.getByTestId(favoriteBtnId);
    expect(favoriteBtn.getAttribute('src')).toEqual('/src/images/blackHeartIcon.svg');
  });

  test('Deve remover as receitas favoritas', async () => {
    const favoriteBtnParent = screen.getByTestId(favoriteBtnId).parentElement as Element;
    expect(favoriteBtnParent.children.item(0)?.getAttribute('src')).toEqual(whiteHeartIconPath);
    await userEvent.click(favoriteBtnParent);
    await userEvent.click(favoriteBtnParent);

    render.unmount();
    await act(() => renderWithRouter(<App />, { initialEntries: [recipeInProgressPath] }));

    const favoriteBtn = screen.getByTestId(favoriteBtnId);
    expect(favoriteBtn.getAttribute('src')).toEqual(whiteHeartIconPath);
  });

  test('Deve riscar os igredientes checados', async () => {
    let listitems = screen.getAllByRole('listitem');
    await userEvent.click(listitems[0].children[0]);
    listitems = screen.getAllByRole('listitem');
    expect((listitems[0].children[0] as HTMLElement).style.textDecoration).toEqual('line-through solid rgb(0, 0, 0)');
  });

  test('Deve manter os igredientes checados riscados após atualizar a página', async () => {
    let listitems = screen.getAllByRole('listitem');
    await userEvent.click(listitems[0].children[0]);

    render.unmount();
    await act(() => renderWithRouter(<App />, { initialEntries: [recipeInProgressPath] }));

    listitems = screen.getAllByRole('listitem');
    expect((listitems[0].children[0] as HTMLElement).style.textDecoration).toEqual('line-through solid rgb(0, 0, 0)');
  });

  test('Deve redirecionar para a página \'/done-recipes\' quando o botão \'Finish recipe\' for clicado', async () => {
    const listitems = screen.getAllByRole('listitem');

    for (let i = 0; i < listitems.length; i++) {
      const listitem = listitems[i];
      userEvent.click(listitem.children[0]);
    }

    const finishRecipeBbtn = screen.getByTestId('finish-recipe-btn');

    await userEvent.click(finishRecipeBbtn);

    expect(JSON.parse(localStorage.getItem('doneRecipes') || '[]').length).toEqual(1);
  });
});
