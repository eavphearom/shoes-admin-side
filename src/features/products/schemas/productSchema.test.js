import assert from "node:assert/strict";
import test from "node:test";
import { productSchema } from "./productSchema.js";
import { formValues, listProduct } from "../productFormModel.js";

function product() {
  return {
    id: 42, name: "Runner", code: "RUN-1", category: "Shoes", brand: "Nike", status: "Active", description: "",
    variants: [{
      id: 71, clientId: "variant-71", code: "RUN-BLK", color: "Black", cost: "75", price: "120", is_default: true,
      images: [{ id: 91, url: "/existing-shoe.png", is_primary: true }],
      stocks: [{ id: 101, size: "US 7", stock: "12", lowStock: "3" }],
    }],
  };
}

test("unchanged edit preserves all record IDs and existing image metadata", () => {
  const result = productSchema.parse(formValues(product()));
  assert.equal(result.id, 42);
  assert.equal(result.variants[0].id, 71);
  assert.equal(result.variants[0].stocks[0].id, 101);
  assert.deepEqual(result.variants[0].images, product().variants[0].images);
  assert.equal(result.variants[0].stocks[0].stock, 12);
});

test("create starts empty with exactly one default variant", () => {
  const initial = formValues();
  assert.equal(initial.name, "");
  assert.equal(initial.variants.length, 1);
  assert.equal(initial.variants[0].is_default, true);
  assert.equal(productSchema.safeParse(initial).success, false);
});

test("stock boundaries, duplicate sizes, and default count are validated", () => {
  for (const bad of [-1, 1.5, "", "not a number"]) {
    const value = product();
    value.variants[0].stocks[0].stock = bad;
    assert.equal(productSchema.safeParse(value).success, false);
    value.variants[0].stocks[0].stock = 0;
    value.variants[0].stocks[0].lowStock = bad;
    assert.equal(productSchema.safeParse(value).success, false);
  }
  const zero = product();
  zero.variants[0].stocks[0].stock = 0;
  zero.variants[0].stocks[0].lowStock = 0;
  assert.equal(productSchema.safeParse(zero).success, true);
  const duplicates = product();
  duplicates.variants[0].stocks.push({ ...duplicates.variants[0].stocks[0], id: 102 });
  assert.equal(productSchema.safeParse(duplicates).success, false);
  const missingDefault = product();
  missingDefault.variants[0].is_default = false;
  assert.equal(productSchema.safeParse(missingDefault).success, false);
});

test("different colors may share sizes, but not codes or default flags", () => {
  const value = product();
  value.variants.push({ ...value.variants[0], id: 72, code: "RUN-RED", color: "Red", is_default: false });
  assert.equal(productSchema.safeParse(value).success, true);
  assert.equal(listProduct(productSchema.parse(value)).stock, 24);
  value.variants[1].is_default = true;
  assert.equal(productSchema.safeParse(value).success, false);
  value.variants[1].is_default = false;
  value.variants[1].code = value.variants[0].code;
  assert.equal(productSchema.safeParse(value).success, false);
});

test("primary image must be unique and a required price cannot be blank", () => {
  const value = product();
  value.variants[0].images.push({ id: 92, url: "/other.png", is_primary: true });
  assert.equal(productSchema.safeParse(value).success, false);
  value.variants[0].images[1].is_primary = false;
  assert.equal(productSchema.safeParse(value).success, true);
  value.variants[0].price = "";
  assert.equal(productSchema.safeParse(value).success, false);
});
