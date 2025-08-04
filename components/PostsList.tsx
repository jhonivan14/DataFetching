import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DataContext } from "../context/DataContext";
import { Post } from "../types/types"; // rename to Product if you prefer

export default function PostsList() {
  const { posts } = useContext(DataContext);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchText, posts]);

  const renderProduct = ({ item, index }: { item: Post; index: number }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{index + 1}. {item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>₱{item.price}</Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text>
      <Text style={styles.category}>📦 {item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products (Fetched from API)</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: 'blue' },
  card: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  desc: { fontSize: 13, color: "#555", marginVertical: 4 },
  price: { fontSize: 14, color: "#28a745", fontWeight: "bold" },
  rating: { fontSize: 13, color: "#ff9900" },
  searchInput: {
  backgroundColor: "#fff",
  padding: 10,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#ccc",
  marginBottom: 12,
},

category: {
  marginTop: 4,
  fontSize: 12,
  color: "#666",
  fontStyle: "italic",
},
});
