import React from "react";

type Props = {
	text: string;
	handleFilter: (text: string) => void;
};

const FilterButton: React.FC<Props> = ({ text, handleFilter }) => {
	return (
		<button
			type="button"
			className="btn btn-filter"
			onClick={() => handleFilter(text)}
		>
			{text}
		</button>
	);
};
export default FilterButton;
