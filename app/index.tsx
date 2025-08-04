import ProductsList from "@/components/PostsList"; // OPTIONAL: rename this to ProductsList
import { DataContext, DataProvider } from "@/context/DataContext";
import React, { useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AppContent: React.FC = () => {
  const { setPosts } = useContext(DataContext); // You may want to rename this to `setProducts`

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const json = await response.json();
      const data = json.products; // important: access `.products`
      setPosts(data.slice(0, 5)); // Limit to first 5 items if needed
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReload = () => {
    fetchProducts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProductsList />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.customButton} onPress={handleReload}>
          <Text style={styles.buttonText}>Reload Products</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40 },
  buttonWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  customButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});
