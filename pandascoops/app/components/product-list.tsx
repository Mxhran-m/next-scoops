"use client";

import { HeartIcon, ShoppingCartIcon } from "lucide-react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

import { cn } from "@/lib/utils";

export type ProductItem = {
  image: string;
  imgAlt: string;
  name: string;
  price: number;
  salePrice?: number;
  badges: string[];
};

type ProductProps = {
  products: ProductItem[];
};

const ProductList = ({ products }: ProductProps) => {
  return (
    <section className="bg-muted py-8 sm:py-16 lg:py-24 bg-gray-950">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8">
        <div className="space-y-4">
          <p className="text-sm  tracking-[0.4em] uppercase text-white/60 font-medium">PANDA SCOOPS</p>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
           Our Products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Card
              key={index}
              className={cn("border-none bg-gray-800/30 shadow-none", product.salePrice && "relative")}
            >
              {product.salePrice && (
                <Badge className="bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive absolute top-6 left-6 rounded-sm px-3 py-1 uppercase focus-visible:outline-none">
                  Sale
                </Badge>
              )}

              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <a href="#">
                  <img src={product.image} alt={product.imgAlt} className="mx-auto size-100 rounded-md" />
                </a>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2 text-center">
                    <a href="#">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                    </a>
                    <div className="flex items-center justify-center gap-2">
                      {product.badges.map((badge, idx) => (
                        <Badge
                          key={idx}
                          className="rounded-sm bg-green-600/10 text-blue-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:focus-visible:ring-green-400/40"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    {!product.salePrice && (
                      <span className="text-2xl font-semibold">
                        ₹{product.price.toFixed(2)}
                      </span>
                    )}
                    {product.salePrice && (
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl font-semibold">
                          ₹{product.salePrice.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground font-medium line-through">
                          ₹{product.price.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
