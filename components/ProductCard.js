import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const controlledCiFailure = ;

function ProductCard({ product, isFavorite, onToggleFavorite }) {
  return (
    <View style={styles.card} testID={`product-${product.id}`}>
      <View style={[styles.iconTile, { backgroundColor: product.tint }]}>
        <Text style={styles.icon}>{product.icon}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <Text numberOfLines={1} style={styles.meta}>
          {product.brand} · ★ {product.rating}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      <Pressable
        accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${product.name} ${
          isFavorite ? 'from' : 'to'
        } favorites`}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isFavorite }}
        hitSlop={10}
        onPress={() => onToggleFavorite(product.id)}
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        testID={`favorite-${product.id}`}
      >
        <Text style={[styles.heart, isFavorite && styles.heartActive]}>
          {isFavorite ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#111B2E',
    borderColor: '#23314B',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 112,
    padding: 13,
  },
  iconTile: {
    alignItems: 'center',
    borderRadius: 17,
    height: 82,
    justifyContent: 'center',
    marginRight: 13,
    width: 82,
  },
  icon: {
    fontSize: 38,
  },
  details: {
    flex: 1,
  },
  category: {
    color: '#22D3EE',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  name: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 3,
  },
  meta: {
    color: '#8490A5',
    fontSize: 11,
    marginTop: 3,
  },
  price: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: '#172033',
    borderColor: '#2B3850',
    borderRadius: 15,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    marginLeft: 8,
    width: 42,
  },
  favoriteButtonActive: {
    backgroundColor: '#3A1729',
    borderColor: '#FB7185',
  },
  heart: {
    color: '#A8B3C7',
    fontSize: 23,
  },
  heartActive: {
    color: '#FB7185',
  },
});
