import React, { useState } from "react";
import { View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { ProductDTO } from "../../api";

export type ProductCardProps = {
  product: ProductDTO;
};
export default function ProductCard({ product }: ProductCardProps) {
  const [counter, setCounter] = useState(0);

  return (
    <Card mode="elevated" style={{ marginVertical: 8 }}>
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <View>
          <Text variant="bodyLarge">{product.name}</Text>
          <Text variant="bodyMedium">{product.description}</Text>
        </View>

        <Text>R$ {product.price.toFixed(2)}</Text>
      </Card.Content>

      <Card.Actions>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "50%",
          }}>
          {counter === 0 ? (
            <Button
              mode="contained-tonal"
              icon="cart"
              style={{ width: "100%" }}
              onPress={() => setCounter(c => c + 1)}>
              Adicionar
            </Button>
          ) : (
            <>
              <IconButton
                icon={"minus"}
                mode="contained"
                size={24.5}
                style={{ margin: 0 }}
                onPress={() => setCounter(c => c - 1)}
              />
              <Text style={{ fontSize: 18 }}>{counter}</Text>
              <IconButton
                icon="plus"
                mode="contained"
                size={24.5}
                style={{ margin: 0 }}
                onPress={() => setCounter(c => c + 1)}
              />
            </>
          )}
        </View>
      </Card.Actions>
    </Card>
  );
}
