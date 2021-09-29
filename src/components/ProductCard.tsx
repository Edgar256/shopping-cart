import React from "react";
import { CartItemType, getLastString } from "../pages/Shop";

type Props = {
	product: CartItemType;
	handleAddToCart: (clickedItem: CartItemType) => void;
	isInCart: (id: string) => boolean;
};

const ProductCard: React.FC<Props> = ({
	product,
	handleAddToCart,
	isInCart,
}) => {
	return (
		<div className="product" key={product.productId.value}>
			<div className="product-img">
				{getLastString(product.imageUrl) !== "Not_Available" ? (
					<img src={product.imageUrl} alt="" />
				) : (
					<img src={`https://via.placeholder.com/150`} alt="" />
				)}
			</div>
			<div className="text-center">
				<p>{product.name}</p>
			</div>
			<div className="w-100 justify-content-center text-center">
				{product.subtitle !== "" ? (
					<div className="subtitle">{product.subtitle}</div>
				) : (
					<div></div>
				)}
			</div>
			<div className="text-center">
				<p>$ {product.price}</p>
			</div>
			{isInCart(product.productId.value) ? (
				<button type="button" className="btn btn-incart w-100">
					<span>Added To Cart</span>
				</button>
			) : (
				<button
					type="button"
					className="btn btn-cart w-100"
					onClick={() => handleAddToCart(product)}
				>
					<span className="plus">+</span>
					<span>Add to Cart</span>
				</button>
			)}
		</div>
	);
};
export default ProductCard;
