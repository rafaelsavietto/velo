import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('Search order by order id', async ({ page }) => {
  // Test Data
  const order = 'VLO-WBTIMM'
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await expect(page.getByTestId('search-order-id')).toBeVisible();
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // In case there´s no data-testid ou ID, then the solutions to find the exact Pedido text are presented below. However, the best solution would be
  // to add a data-testid yourself or ask the developer to do it.
  // Solution#1 -> Using an XPath locator
  // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-WBTIMM"]');
  // await expect(orderCode).toBeVisible();

//   Solution #2 -> Using a regex to find the exact word Pedido
//      const containerPedido = page
//     .getByRole('paragraph')
//     .filter({ hasText: /^Pedido$/ }) // Acento ^ significa início da string e $ significa fim da string
//     .locator('..'); // Sobe para o elemento pai (a div que agrupa ambos)

// Solution #3 -> Using Playwright's own "exact" and using .last to find the innermost matching div
    const containerPedido = page
    .locator('div')
    .filter({ has: page.getByText('Pedido', { exact: true }) })
    .last(); // innermost matching div

  await expect(containerPedido).toContainText(order, { timeout: 10_000 });

  await expect(page.getByText('APROVADO')).toBeVisible();
});
