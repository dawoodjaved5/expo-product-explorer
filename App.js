import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from './components/ProductCard';
import { categories, products } from './data/products';

function ProductExplorer() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const searchableText = `${product.name} ${product.brand} ${product.description}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const toggleFavorite = useCallback((productId) => {
    setFavoriteIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(productId)) {
        nextIds.delete(productId);
      } else {
        nextIds.add(productId);
      }

      return nextIds;
    });
  }, []);

  const renderProduct = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        isFavorite={favoriteIds.has(item.id)}
        onToggleFavorite={toggleFavorite}
      />
    ),
    [favoriteIds, toggleFavorite]
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>PRODUCT EXPLORER</Text>
          <Text style={styles.title}>Find your next favorite</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.count}>{favoriteIds.size}</Text>
          <Text style={styles.countLabel}>saved</Text>
        </View>
      </View>

      <View style={styles.studentCard} testID="student-identity">
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MD</Text>
        </View>
        <View>
          <Text style={styles.studentName}>Muhammad Dawood Javed</Text>
          <Text style={styles.rollNumber}>Roll No. 23i-3038</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          accessibilityLabel="Search products"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setQuery}
          placeholder="Search products or brands"
          placeholderTextColor="#7C879C"
          style={styles.searchInput}
          testID="product-search"
          value={query}
        />
        {query ? (
          <Pressable
            accessibilityLabel="Clear search"
            hitSlop={10}
            onPress={() => setQuery('')}
            testID="clear-search"
          >
            <Text style={styles.clearButton}>×</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        contentContainerStyle={styles.categories}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => {
          const selected = category === selectedCategory;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[styles.categoryChip, selected && styles.categoryChipSelected]}
              testID={`category-${category.toLowerCase()}`}
            >
              <Text
                style={[
                  styles.categoryLabel,
                  selected && styles.categoryLabelSelected,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.resultRow}>
        <Text style={styles.resultTitle}>Curated products</Text>
        <Text style={styles.resultCount}>{visibleProducts.length} results</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.productList}
        data={visibleProducts}
        extraData={favoriteIds}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>⌕</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>Try another search or category.</Text>
          </View>
        }
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductExplorer />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0B1220',
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 18,
    paddingTop: 8,
  },
  eyebrow: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 3,
  },
  countBadge: {
    alignItems: 'center',
    backgroundColor: '#172033',
    borderColor: '#26334A',
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 58,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  count: {
    color: '#67E8F9',
    fontSize: 18,
    fontWeight: '800',
  },
  countLabel: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: -2,
  },
  studentCard: {
    alignItems: 'center',
    backgroundColor: '#111B2E',
    borderColor: '#23314B',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 12,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#22D3EE',
    borderRadius: 14,
    height: 43,
    justifyContent: 'center',
    marginRight: 12,
    width: 43,
  },
  avatarText: {
    color: '#082F49',
    fontSize: 14,
    fontWeight: '900',
  },
  studentName: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  rollNumber: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#172033',
    borderColor: '#26334A',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: 15,
  },
  searchIcon: {
    color: '#67E8F9',
    fontSize: 24,
    marginRight: 9,
    marginTop: -3,
  },
  searchInput: {
    color: '#F8FAFC',
    flex: 1,
    fontSize: 15,
  },
  clearButton: {
    color: '#94A3B8',
    fontSize: 25,
    lineHeight: 27,
  },
  categories: {
    gap: 8,
    paddingBottom: 17,
    paddingTop: 13,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#111B2E',
    borderColor: '#26334A',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#22D3EE',
    borderColor: '#22D3EE',
  },
  categoryLabel: {
    color: '#A8B3C7',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryLabelSelected: {
    color: '#082F49',
  },
  resultRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
  },
  resultCount: {
    color: '#7C879C',
    fontSize: 12,
  },
  productList: {
    gap: 12,
    paddingBottom: 28,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 54,
  },
  emptyEmoji: {
    color: '#22D3EE',
    fontSize: 42,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
  },
  emptyText: {
    color: '#7C879C',
    fontSize: 13,
    marginTop: 4,
  },
});
