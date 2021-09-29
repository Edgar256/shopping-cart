import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rawProducts from "../data/products.json";

// Images
import Logo from "../images/logo.png";
import Recipes from "../images/recipes.svg";
import Dot from "../images/dot.png";
import Settings from "../images/settings.svg";
import Place from "../images/shop.svg";
import Arrow from "../images/arrow.svg";
import Cart from "../images/cart.svg";
import Lady from "../images/lady.jpg";
import ProductCard from "../components/ProductCard";
import CartCard from "../components/CartCard";
import FilterButton from "../components/FilterButton";

export type CartItemType = {
	productId: { value: string };
	amount: number;
	name: string;
	upcCode: string;
	price: number;
	description: string;
	imageUrl: string;
	stepSize: number;
	unitType: string;
	subtitle: string;
	brand: string;
	storeSource: string;
	category: string;
	subcategory: string;
	inventoryOnHand: number;
	isEssential: boolean;
	deliverableNextDay: boolean;
	perHomeMaximum: number;
	enabled: boolean;
	inventoryHeld: number;
	weeklyConsumptionQuantity: number;
	subsubcategory: string;
	defaultTrackedItemSectionType: number;
	internalUnitQuantity: number;
	internalUnitMeasure: number;
	productUrl: string;
	itemType: string;
	perishabilityDays: number;
	isExplicitCaseQuantityRequired: boolean;
};

export const getLastString = (text: string) => {
	return text.substr(text.length - 13);
};

export default function Shop() {
	const [productsList, setProductsList] = useState([] as CartItemType[]);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);
	const [resultsCounter, setResultsCounter] = useState(0);
	const [cartCounter, setCartCounter] = useState(0);
	const [totalPriceCounter, setTotalPriceCounter] = useState(0);

	let products: CartItemType[] = [];
	rawProducts.map((product) => {
		return products.push({ ...product, amount: 0 });
	});

	useEffect(() => {
		setProductsList(products);
		setResultsCounter(products.length);
	}, []);

	const handleAddToCart = (clickedProduct: CartItemType) => {
		let prev = [...cartItems];
		let isProductInCart = prev.find(
			(product) => product.productId.value === clickedProduct.productId.value
		);
		if (isProductInCart) {
			isProductInCart.amount++;
		} else {
			prev = [...prev, { ...clickedProduct, amount: 1 }];
		}
		handleCartCounter(prev);
		handleTotalPriceCounter(prev);
		setCartItems(prev);
	};

	const handleRemoveFromCart = (id: string) => {
		let prev = [...cartItems];
		let isProductInCart = prev.find(
			(product) => product.productId.value === id
		);

		if (isProductInCart) {
			if (isProductInCart.amount < 2) {
				const index = prev.indexOf(isProductInCart);
				prev.splice(index, 1);
			} else {
				isProductInCart.amount--;
			}
			handleCartCounter(prev);
			handleTotalPriceCounter(prev);
			setCartItems(prev);
		}
	};

	const isInCart = (id: string) => {
		const isPresentInCart = cartItems.find(
			(product) => product.productId.value === id
		);
		if (isPresentInCart) {
			return true;
		} else {
			return false;
		}
	};

	const handleCartCounter = (items: CartItemType[]) => {
		const total = items.reduce((acc, curr) => acc + curr.amount, 0);
		return setCartCounter(total);
	};

	const handleTotalPriceCounter = (items: CartItemType[]) => {
		const total = items.reduce(
			(acc, curr) => acc + curr.amount * curr.price,
			0
		);
		return setTotalPriceCounter(total);
	};
	const renderProducts = (): JSX.Element[] => {
		return productsList.map((product, key) => {
			return (
				<ProductCard
					key={product.productId.value}
					product={product}
					handleAddToCart={handleAddToCart}
					isInCart={isInCart}
				/>
			);
		});
	};

	const renderCartItems = () => {
		if (cartItems.length < 1) {
			return <div className="w-100 text-center">Your Cart is Empty</div>;
		}
		return cartItems.map((product) => {
			return (
				<CartCard
					key={product.productId.value}
					product={product}
					handleAddToCart={handleAddToCart}
					handleRemoveFromCart={handleRemoveFromCart}
				/>
			);
		});
	};

	const renderTotalPrice = () => {
		if (cartItems.length < 1) {
			return <div className="w-100 text-center"></div>;
		}
		return (
			<div className="total-price">
				<h2>TOTAL </h2>
				<h2>${totalPriceCounter}</h2>
			</div>
		);
	};

	const handleFilter = (category: string) => {
		let results: any = [];
		if (category === "All") {
			setProductsList(products);
			setResultsCounter(products.length);
			return null;
		}
		products.map((product) => {
			if (product.category === category) {
				results.push(product);
			}
			return null;
		});
		setProductsList(results);
		setResultsCounter(results.length);
		return null;
	};

	return (
		<div className="w-100">
			<div className="container">
				<div className="body-container">
					<nav className="top-nav">
						<img src={Logo} alt="" className="nav-img" />
						<div className="nav-icons-container">
							<span>
								<button className="btn btn-danger">Get 20% Off</button>
							</span>
							<Link to="/recipes" className="nav-icon">
								<div className="d-flex w-100">
									<img src={Recipes} alt="" className="nav-icon-img" />
								</div>
								<div className="l-h-0">
									<small>Recipes</small>
								</div>
							</Link>
							<Link to="/recipes" className="nav-icon">
								<div className="d-flex w-100">
									<img src={Place} alt="" className="nav-icon-img" />
								</div>
								<div className="l-h-0">
									<small>Shop</small>
								</div>
							</Link>
							<Link to="/recipes" className="nav-icon">
								<div className="d-flex w-100 position-relative">
									<img src={Lady} alt="" className="nav-icon-img rounded" />
									<img
										src={Dot}
										alt=""
										className="dot"
										width="10"
										height="10"
									/>
								</div>
								<div className="l-h-0">
									<small>Profile</small>
								</div>
							</Link>
							<Link to="/recipes" className="nav-icon">
								<div className="d-flex w-100">
									<img src={Settings} alt="" className="nav-icon-img" />
								</div>
								<div className="l-h-0">
									<small>Settings</small>
								</div>
							</Link>
						</div>
					</nav>
					<main>
						<div>Shop by Category</div>
						<div className="filters">
							<FilterButton text="Alcohol" handleFilter={handleFilter} />
							<FilterButton text="Bakery" handleFilter={handleFilter} />
							<FilterButton text="Dairy & Eggs" handleFilter={handleFilter} />
							<FilterButton text="Drinks" handleFilter={handleFilter} />
							<FilterButton text="Frozen" handleFilter={handleFilter} />
							<FilterButton text="Home & Health" handleFilter={handleFilter} />
							<FilterButton
								text="Meat, Fish & Protein"
								handleFilter={handleFilter}
							/>
							<FilterButton text="Pantry" handleFilter={handleFilter} />
							<FilterButton text="Prepared" handleFilter={handleFilter} />
							<FilterButton text="Pet Products" handleFilter={handleFilter} />
							<FilterButton text="Prepared" handleFilter={handleFilter} />
							<FilterButton text="Produce" handleFilter={handleFilter} />
							<FilterButton text="Snacks" handleFilter={handleFilter} />
							<FilterButton text="All" handleFilter={handleFilter} />
						</div>
						<div className="text-muted">
							<small>
								<i>Showing {resultsCounter} results</i>
							</small>
						</div>
						<div className="products-container">{renderProducts()}</div>
					</main>
				</div>
				<div className="cart-container">
					<div className="cart-header">
						<span>
							<img
								src={Arrow}
								alt=""
								className="mx-auto"
								width="25"
								height="25"
							/>
						</span>
						<span>Your Cart</span>
						<span className="position-relative">
							<div className="cart-counter">{cartCounter}</div>
							<img
								src={Cart}
								alt=""
								className="mx-auto"
								width="25"
								height="25"
							/>
							<div className="w-100 text-center text-secondary">
								<small>Cart</small>
							</div>
						</span>
					</div>
					{renderCartItems()}
					{renderTotalPrice()}
				</div>
			</div>
		</div>
	);
}
