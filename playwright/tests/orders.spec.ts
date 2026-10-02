import { test, expect } from '@playwright/test';


// AAA - Arrange, Act, Assert

test('Search order by order id', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
 
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await expect(page.getByTestId('search-order-id')).toBeVisible();
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-WBTIMM');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  await expect(page.getByText('VLO-WBTIMM')).toBeVisible({timeout: 10_000});
  await expect(page.getByTestId('order-result-VLO-WBTIMM')).toContainText('VLO-WBTIMM');

  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-WBTIMM')).toContainText('APROVADO');
});