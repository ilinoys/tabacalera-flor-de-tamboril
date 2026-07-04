"use client";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricing from "./ProductPricing";
import ProductInventory from "./ProductInventory";
import ProductImageUpload from "./ProductImageUpload";

export default function ProductForm() {
  return (
    <div className="space-y-8">

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <ProductBasicInfo />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
          <ProductPricing />
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
          <ProductInventory />
        </div>

      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <ProductImageUpload />
      </div>

    </div>
  );
}