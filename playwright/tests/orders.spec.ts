import { test, expect } from '@playwright/test';

test('Search order by order id', async ({ page }) => {

  await page.goto('http://localhost:5173/');

  await expect(page.getByTestId('header-nav')).toContainText('Consultar Pedido');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  await expect(page.getByTestId('search-order-id')).toBeVisible();
  await page.getByTestId('search-order-id').click();
  await page.getByTestId('search-order-id').fill('VLO-WBTIMM');
  await page.getByTestId('search-order-button').click();

  await expect(page.getByTestId('order-result-id')).toBeVisible();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-WBTIMM');
  
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});