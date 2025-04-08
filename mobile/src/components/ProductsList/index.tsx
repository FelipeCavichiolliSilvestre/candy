import { GetProductsResponseDTO, ProductDTO, ProductsApi } from "../../api";
import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
  Surface,
  Text,
} from "react-native-paper";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

export type ProductsListProps = {
  products: ProductDTO[];
  onEndReached: () => void;
  isLoadingMore: boolean;
};

export default function ProductsList({
  products,
  onEndReached,
  isLoadingMore,
}: ProductsListProps) {
  return (
    <Surface mode="flat" style={styles.surface}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={onEndReached}
        ListFooterComponent={() => {
          if (!isLoadingMore) {
            return null;
          }

          return (
            <View>
              <ActivityIndicator />
            </View>
          );
        }}
        ListEmptyComponent={() => <Text>AA</Text>}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    height: "100%",
    paddingHorizontal: 16,
  },
});
