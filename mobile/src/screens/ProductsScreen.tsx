import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  DataTable,
  IconButton,
  Surface,
  Text,
} from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import ProductsList from "../components/ProductsList";
import { GetProductsResponseDTO, ProductDTO, ProductsApi } from "../api";
import { useSelector } from "react-redux";
import { selectJwt } from "../features/auth/auth-slice";

type ProductsScreenState = {
  hasNextPage: boolean;
  isLoading: boolean;
  products: ProductDTO[];
  page: number;
};

export default function ProductsScreen() {
  const [productsData, setProductsData] = useState<ProductsScreenState>({
    page: -1,
    hasNextPage: true,
    isLoading: true,
    products: [],
  });
  const accessToken = useSelector(selectJwt);

  async function fetchMoreProducts() {
    if (!accessToken) {
      return;
    }

    setProductsData({ ...productsData, isLoading: true });

    const response = await new ProductsApi({ accessToken }).listProducts(
      productsData.page + 1,
    );
    const responseData = response.data;

    setProductsData({
      products: [...productsData.products, ...responseData.products],
      page: productsData.page + 1,
      isLoading: false,
      hasNextPage: responseData.hasNextPage,
    });
  }

  useEffect(() => {
    fetchMoreProducts();
  }, [accessToken]);

  return (
    <Surface mode="flat" style={styles.surface}>
      <ProductsList
        products={productsData.products}
        onEndReached={fetchMoreProducts}
        isLoadingMore={productsData.isLoading}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    height: "100%",
  },
});
